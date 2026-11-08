# Convet backend HTTP contract (selected modules)

Source: `backend-convetaruba` (NestJS + Prisma). Single commit `6829a1b`. Derived from reading code, not from running it.

## Global conventions

- No global route prefix (`/branches`, not `/api/branches`). Port `PORT` or 3000. **No `app.enableCors()` in `main.ts`**, so browser calls from another origin will fail unless a proxy is used.
- Global `ValidationPipe({ whitelist, forbidNonWhitelisted, transform })`: **unknown body/query keys return 400**. Send exactly the DTO keys.
- Auth: `Authorization: Bearer <accessToken>` (JWT from `POST /auth/login`, `expiresIn: '1h'`). `JwtAuthGuard` checks the signature, `role ∈ {CUSTOMER,STAFF,ADMIN}`, and that `tokenVersion` matches the DB (a password change invalidates tokens). Failures return 401 with one of: `Missing access token` / `Invalid or expired access token` / `Invalid access token` / `Access token is no longer valid`.
- Roles come either from `@Roles()` + `RolesGuard` (403 `You do not have permission to perform this action`) or from inline controller checks (403 with a module-specific message). Both are listed per endpoint.
- Errors use Nest's default shape: `{ statusCode: number, message: string | string[], error: string }`. Validation errors put a `string[]` in `message`.
- Serialization: `DateTime` comes back as an ISO string (`"2026-11-08T14:00:00.000Z"`). Prisma `Decimal` comes back as a **string** (`"45.00"`). Nullable columns come back as `null`, never omitted.
- Path params marked `UUID` use `ParseUUIDPipe`, so a non-UUID returns 400 `Validation failed (uuid is expected)`.
- Lists are **bare arrays** unless marked paginated. Paginated shape (reviews, medical-records/pet):
  `{ data: T[], meta: { total: number, page: number, limit: number, totalPages: number } }`

## Enums (verbatim from Prisma)

| Enum | Values |
|---|---|
| Role | `CUSTOMER` `STAFF` `ADMIN` |
| PetSpecies | `DOG` `CAT` `BIRD` `RABBIT` `OTHER` |
| PetSex | `MALE` `FEMALE` `UNKNOWN` |
| StaffPosition | `VETERINARIAN` `ASSISTANT` `RECEPTIONIST` `OTHER` |
| AppointmentStatus | `PENDING` `CONFIRMED` `IN_PROGRESS` `COMPLETED` `CANCELLED` `REJECTED` `EXPIRED` |
| AppointmentHistoryAction | `CREATED` `CONFIRMED` `REJECTED` `RESCHEDULED` `STARTED` `COMPLETED` `CANCELLED` `EXPIRED` `VETERINARIAN_CHANGED` `END_TIME_CHANGED` |
| AppointmentBlockReason | `BREAK` `VACATION` `MEETING` `PERMISSION` `OTHER` |
| WeekDay | `MONDAY` … `SUNDAY` |
| ReviewStatus | `PENDING` `APPROVED` `HIDDEN` |
| NotificationType | `APPOINTMENT_CREATED` `APPOINTMENT_CONFIRMED` `APPOINTMENT_REJECTED` `APPOINTMENT_RESCHEDULED` `APPOINTMENT_CANCELLED` `APPOINTMENT_REMINDER` `APPOINTMENT_COMPLETED` `SYSTEM` |

## Full model shapes (used when a service returns a whole row or uses `include`)

`?` = nullable (`T | null`). All `id*` values are UUID strings.

- **Branch**: `idBranch, name, slug, address, city, department, phone?, email?, isActive:bool, createdAt, updatedAt, timeZone` (timeZone defaults to `"America/Aruba"`)
- **BranchFields** (the explicit `select` used by every `/branches` endpoint): Branch **without `timeZone`**
- **ServiceCategory**: `idCategory, name, slug, description?, isActive, createdAt, updatedAt`
- **Service**: `idService, name, slug, description?, shortDescription?, isPublished:bool, isActive:bool, createdAt, updatedAt, categoryId`
- **BranchService**: `idBranchService, branchId, serviceId, isActive, createdAt, updatedAt`
- **BranchServicePrice**: `idBranchServicePrice, branchServiceId, amount: Decimal-string, validFrom, validUntil?, createdAt`
- **Staff**: `idStaff, userId, staffNumber, position: StaffPosition, specialty?, isActive, createdAt, updatedAt`
- **StaffBranch**: `idStaffBranch, staffId, branchId, startDate, endDate?, isActive, createdAt, updatedAt`
- **Pet**: `idPet, ownerId, name, species: PetSpecies, breed?, color?, dateOfBirth?, sex: PetSex, isActive, createdAt, updatedAt`
- **Appointment**: `idAppointment, customerId, createdByUserId, petId, branchId, branchServiceId, veterinarianId, startsAt, endsAt?, status: AppointmentStatus, priceAtBooking: Decimal-string, confirmationExpiresAt, confirmedAt?, cancelledAt?, cancellationReason?, notes?, createdAt, updatedAt, completedAt?`
- **MedicalRecord**: `idMedicalRecord, appointmentId, petId, veterinarianId, observations?, diagnosis?, treatment?, recommendations?, createdAt, updatedAt`
- **Review**: `idReview, appointmentId, rating:int, comment?, status: ReviewStatus, createdAt, updatedAt`

---

## Auth

### `GET /auth/me`
- Guard: JwtAuthGuard (any role).
- Response: `{ idUser, firstName, lastName, email, mobileNumber, role: Role, createdAt, updatedAt, whatsappReminders: bool }`
- 404 `User not found`. The response does **not** include `staff`/`idStaff`; a STAFF user cannot get their own `idStaff` from this endpoint.

(Context: `POST /auth/login` takes body `{ email: IsEmail, password: non-empty string }` and returns `{ accessToken, expiresIn: "1h", user: { idUser, firstName, lastName, email, role } }`. 401 `Invalid email or password`.)

---

## Appointments (3 endpoints)

Controller `@Controller('appointments')`, JwtAuthGuard on the class, inline role checks.

### `GET /appointments/availability`
- Roles: **any authenticated user** (no role check).
- Query (all required):
  | field | type | validators |
  |---|---|---|
  | branchId | string | IsUUID |
  | veterinarianId | string | IsUUID (this is a **Staff.idStaff**, not a userId) |
  | date | string | IsDateString + regex `^\d{4}-\d{2}-\d{2}$` + must be a real calendar date |
- Response:
  ```
  { branchId, veterinarianId, date: "YYYY-MM-DD", timeZone: string,
    availableSlots: [ { startsAt: ISO-UTC string, localTime: "HH:mm" } ] }
  ```
- Errors: 404 `Active branch not found`; 404 `Active veterinarian not found` (staff missing, inactive, or `position !== VETERINARIAN`); 404 `Veterinarian is not assigned to this branch on the requested date`; 400 `Branch has an invalid time zone configuration`.
- Slot computation:
  - Fixed slot length **20 min** (`SLOT_DURATION_MINUTES`).
  - Inputs: the vet's active `StaffSchedule` rows for (vet, branch, weekday of `date` in the branch timezone). Each row's `startsAt`/`endsAt` is an `"HH:mm"` string. Slots step every 20 min from the schedule start while `slot + 20 <= scheduleEnd`.
  - Slots are dropped when they are in the past (`<= now`) or overlap an existing appointment of that vet with status PENDING/CONFIRMED/IN_PROGRESS (using `startsAt..endsAt`) or an `AppointmentBlock` of that vet (any branch).
  - Expired PENDING requests for that vet are flipped to EXPIRED as a side effect.
  - No schedule rows → `availableSlots: []` (still 200).
  - **There are no HTTP endpoints for StaffSchedule or AppointmentBlock.** Schedules can only come from direct DB inserts or a seed, and no seed exists in `prisma/`.

### `POST /appointments`
- Roles: **CUSTOMER only** (inline). Others get 403 `Only customers can create appointments through this endpoint`. `customerId` and `createdByUserId` are both the caller.
- Body:
  | field | type | req | validators |
  |---|---|---|---|
  | petId | string | yes | IsUUID; must be an active pet owned by the caller |
  | branchId | string | yes | IsUUID; active branch |
  | branchServiceId | string | yes | IsUUID; **BranchService.idBranchService** (not serviceId); must belong to branchId, be active, have an active+published service, and have a current price |
  | veterinarianId | string | yes | IsUUID; Staff.idStaff, active, position VETERINARIAN, assigned to the branch at `startsAt` |
  | startsAt | string | yes | IsDateString; **must end with `Z` or `±HH:MM`**; in the future; must line up with a 20-min slot in the vet's schedule (use `availableSlots[].startsAt` verbatim) |
  | notes | string | no | max 1000, must contain a non-whitespace char; trimmed, stored as null if empty |
- Response: the bare **Appointment** row (no includes). `status: "PENDING"`, `endsAt = startsAt + 20min`, `priceAtBooking` = current price (string), `confirmationExpiresAt = now + 15min`, `confirmedAt/cancelledAt/completedAt/cancellationReason: null`.
- Errors (400 unless noted): `Invalid appointment start date`, `Appointment start time must include a timezone`, `Appointment start time must be in the future`, 404 `Customer not found`, 404 `Active pet not found for this customer`, 404 `Active branch not found`, 404 `Active veterinarian not found`, 404 `Active service not found in this branch`, `The service is not available for appointments`, `The service does not have a current price`, `Veterinarian is not assigned to this branch at the requested time`, `Requested time is not an available appointment slot`, `Veterinarian already has an appointment at this time`, `Veterinarian is unavailable due to a scheduled block`.
- A history row `CREATED` is written. No notification is sent from this code path.

### `POST /appointments/customer/:customerId`
- Roles: STAFF, ADMIN (inline; 403 `Only staff and administrators can create appointments for customers`).
- Path: `customerId` UUID (the target user must have role CUSTOMER, else 404 `Customer not found`).
- Body, rules and response: same as `POST /appointments`. `createdByUserId` = the caller.

### Endpoints that do NOT exist (the logic exists in services but no route is wired)
`AppointmentsService` has `getAppointmentById`, `getCustomerAppointments`, `getBranchAppointments` (DTO `GetBranchAppointmentsDto { date?: YYYY-MM-DD, status?: AppointmentStatus }`), `getAppointmentHistory`, `confirmAppointment` (DTO `{ endsAt: ISO with tz }`), `rejectAppointment` (`{ reason: string ≤500 }`), `cancelAppointment` (`{ reason: string ≤500 }`), `rescheduleAppointment` (`{ startsAt, branchId, veterinarianId }`), `changeVeterinarian` (`{ veterinarianId }`), `startAppointment`, `completeAppointment` (`{ observations?, diagnosis?, treatment?, recommendations? }`, each ≤10000) and `expireAppointments`. **None of these has an HTTP route.** In particular, there is:
- **no list of "my appointments"** and no GET of a single appointment,
- **no cancel endpoint**,
- **no reschedule endpoint**,
- no confirm/reject/start/complete endpoints (so appointments can never leave PENDING via the API; they auto-EXPIRE after 15 min),
- no scheduled job calling `expireAppointments`. Expiry happens lazily, only when availability is queried or a booking is made for the same vet.

### Status machine as implemented in the (unexposed) services
- `PENDING` → `CONFIRMED` (confirm, needs `endsAt`) | `REJECTED` (reject) | `CANCELLED` (cancel) | `EXPIRED` (15 min without confirmation; confirm, reject and cancel on an expired request flip it to EXPIRED and fail).
- `CONFIRMED` → `IN_PROGRESS` (start) | `CANCELLED` (cancel).
- `IN_PROGRESS` → `COMPLETED` (complete; the assigned vet only; creates the MedicalRecord).
- Reschedule and change-vet are allowed only from PENDING (not expired) or CONFIRMED; a customer can act only on their own appointment.
- Reviews require `COMPLETED`, and medical records are only created by `complete`. Since neither is reachable over HTTP, **no review or medical record can be created through the API today**.

---

## Branches (5 endpoints) — all ADMIN only

`@Controller('branches')`, JwtAuthGuard on the class, inline `authorizeAdmin`. Non-ADMIN callers get 403 `Only administrators can manage branches`. **CUSTOMER cannot call `GET /branches`.**

| Method + path | Body | Response |
|---|---|---|
| `POST /branches` | CreateBranchDto | BranchFields |
| `GET /branches` | — | BranchFields[] (bare array, `createdAt desc`, includes inactive) |
| `GET /branches/:idBranch` (UUID) | — | BranchFields; 404 `Branch not found` |
| `PATCH /branches/:idBranch` | UpdateBranchDto (all optional) | BranchFields; 400 `At least one field must be provided`; 404; 409 slug |
| `PATCH /branches/:idBranch/status` | `{ isActive: boolean }` (IsBoolean, required) | BranchFields |

CreateBranchDto:
| field | type | req | validators |
|---|---|---|---|
| name | string | yes | non-empty, max 100 |
| slug | string | yes | non-empty, max 120. Normalized server-side (accents stripped, trimmed, lowercased, whitespace→`-`) |
| address | string | yes | non-empty, max 200 |
| city | string | yes | non-empty, max 100 |
| department | string | yes | non-empty, max 100 |
| phone | string | no | IsString |
| email | string | no | IsEmail |

`timeZone` cannot be set or read through the API (it is not in the DTO or the select). 409 `A branch with this slug already exists`.

---

## Services / catalog (4 endpoints)

`@Controller('services')`.

### `GET /services`: PUBLIC (no guard)
- Returns `Service[]` (bare array, `name asc`) filtered to `isActive && isPublished && category.isActive`. Each item is the full Service row plus `category: ServiceCategory`.
- **No price, no branch, no `branchServiceId`** in this response.

### `POST /services`: STAFF, ADMIN (`@Roles` + RolesGuard)
| field | type | req | validators |
|---|---|---|---|
| name | string | yes | length 2–100 |
| slug | string | yes | length 2–120, regex `^[a-z0-9]+(?:-[a-z0-9]+)*$` |
| description | string | no | max 2000 |
| shortDescription | string | no | max 300 |
| categoryId | string | yes | IsUUID; must be an active category (404 `Category not found or inactive`) |
- Response: Service + `category`. 400 `A service with this slug already exists` (note: 400, not 409).
- New services are created with `isPublished: false`, and **no endpoint can set `isPublished`** (it is not in either DTO, and the whitelist rejects it). As a result `GET /services` can only return services published directly in the DB, and assigning a service to a branch fails with `Service must be published...`.

### `PATCH /services/:id`: STAFF, ADMIN
- Body: same fields as create, all optional (same validators). Empty body → 400 `At least one field must be provided`. 404 `Service not found`. Response: Service + `category`.

### `DELETE /services/:id`: STAFF, ADMIN (soft-deactivate)
- Response: `{ idService, name, slug, isActive: false }`. 404 `Active service not found` if it is missing or already inactive.

---

## Services / branch-services (6 endpoints) — all ADMIN only

`@Controller()` with class-level `@UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')`. **CUSTOMER and STAFF cannot call `GET /branches/:branchId/services`.**

| Method + path | Body | Response |
|---|---|---|
| `POST /branches/:branchId/services` | `{ serviceId: UUID }` | BranchService + `service: Service` + `branch: Branch` (full Branch, includes `timeZone`) |
| `GET /branches/:branchId/services` | — | `Array<BranchService & { service: Service & { category: ServiceCategory }, prices: BranchServicePrice[] }>` |
| `GET /services/:serviceId/branches` | — | `Array<BranchService & { branch: Branch, prices: BranchServicePrice[] }>` |
| `PATCH /branches/:branchId/services/:branchServiceId/status` | `{ isActive: boolean }` | BranchService + `service` + `branch` |
| `PATCH /branches/:branchId/services/:branchServiceId/price` | `{ amount: number }` | BranchServicePrice (the new row) |
| `GET /branches/:branchId/services/:branchServiceId/prices` | — | BranchServicePrice[] (`validFrom desc`) |

Notes:
- In both GET list endpoints, `prices` is an array with **0 or 1 element**: the open price, where `validUntil = null`. Read it as `prices[0]?.amount` (a string). The lists include inactive assignments. Branch services are sorted by `service.name asc`, service branches by `branch.name asc`.
- Price body: `amount` (`@Type(Number)`, IsNumber with max 2 decimals, positive, min 0.01, max 9999999999.99). Changing the price closes the current row (`validUntil = now`) and creates a new one. 400 if the price is unchanged or the assignment is inactive.
- Assign errors: 404 `Active branch not found`, 404 `Active service not found`, 400 `Service must be published before being assigned to a branch`, 409 `Service is already assigned to this branch` / `Service has an inactive assignment. Reactivate the existing assignment instead`.
- Status errors: 404 `Branch service assignment not found` (also returned when the assignment belongs to a different branch), 400 when already in the requested state, and 400 `Only active and published services can be activated in a branch`.
- A new assignment has **no price**. Until a price is set, booking it fails with `The service does not have a current price`.

---

## Service categories (4 endpoints)

| Method + path | Roles | Body | Response |
|---|---|---|---|
| `GET /service-categories` | PUBLIC | — | ServiceCategory[] (active only, `name asc`) |
| `POST /service-categories` | STAFF, ADMIN | `{ name: 2–80, slug: 2–100 + regex `^[a-z0-9]+(?:-[a-z0-9]+)*$`, description?: ≤1000 }` | ServiceCategory |
| `PATCH /service-categories/:id` | STAFF, ADMIN | same fields, all optional | ServiceCategory; 400 when empty; 404 `Category not found` |
| `DELETE /service-categories/:id` | STAFF, ADMIN | — | `{ idCategory, name, slug, isActive: false }`; 404 `Active category not found`; 400 `Cannot deactivate a category with active services` |

Slug conflict → 400 `A category with this slug already exists`.

---

## Reviews (7 endpoints)

`@Controller('reviews')`, with `JwtAuthGuard + RolesGuard + @Roles` per route.

ReviewQueryDto (used by every GET list): `page` int ≥1, default 1; `limit` int 1–100, default 10; `status?: ReviewStatus`. Query strings are coerced to numbers. `status` is accepted everywhere but only applied by `GET /reviews`.

Shared nested sub-shapes:
- `ApptMine = { idAppointment, startsAt, completedAt?, pet: { idPet, name, species }, branch: { idBranch, name, city }, branchService: { service: { idService, name } } }`

| Method + path | Roles | Input | Response |
|---|---|---|---|
| `POST /reviews` | CUSTOMER | body `{ appointmentId: UUID, rating: int 1–5, comment?: string ≤2000 with a non-whitespace char }` | Review (status `PENDING`, comment trimmed) |
| `GET /reviews/mine` | CUSTOMER | query | paginated `{ idReview, rating, comment?, status, createdAt, updatedAt, appointment: ApptMine }` |
| `GET /reviews/public` | **PUBLIC** | query | paginated `{ idReview, rating, comment?, createdAt, appointment: { pet: { name, species }, branch: { name, city }, branchService: { service: { name } }, customer: { firstName } } }` (APPROVED only, `createdAt desc`) |
| `GET /reviews` | ADMIN | query (+status filter) | paginated `{ idReview, rating, comment?, status, createdAt, updatedAt, appointment: ApptMine & { customer: { idUser, firstName, lastName, email } } }` |
| `GET /reviews/:idReview` | CUSTOMER (own), ADMIN | UUID | `{ idReview, rating, comment?, status, createdAt, updatedAt, appointment: ApptMine & { customerId } }`; 403 if not the owner |
| `PATCH /reviews/:idReview` | CUSTOMER (own) | body `{ rating?: 1–5, comment?: ≤2000 }` | Review. **Any update, even an empty body, resets status to `PENDING`**. No "at least one field" check. |
| `PATCH /reviews/:idReview/moderation` | ADMIN | body `{ status: "APPROVED" \| "HIDDEN" }` (IsIn) | Review |

Create errors: 404 `Appointment not found`, 403 `You are not authorized to review this appointment`, 400 `Only completed appointments can be reviewed`, 409 `This appointment already has a review`. There is no delete endpoint.

---

## Staff / employees (5 endpoints) — all ADMIN only

`@Controller('staff')`, JwtAuthGuard, inline check: 403 `You do not have permission to perform this action`.

`StaffUser = { firstName, lastName, email, mobileNumber, role }`

| Method + path | Body | Response |
|---|---|---|
| `POST /staff` | `{ userId: UUID, staffNumber: non-empty string, position: StaffPosition, specialty?: non-empty string }` | Staff (no user) |
| `GET /staff` | — | `Array<Staff & { user: StaffUser }>` (`createdAt desc`, includes inactive) |
| `GET /staff/:idStaff` | — | `Staff & { user: StaffUser }`; 404 `Staff member not found` |
| `PATCH /staff/:idStaff` | `{ staffNumber?, position?, specialty? }` (same validators) | Staff; 400 when empty; 409 `Staff number is already registered` |
| `PATCH /staff/:idStaff/status` | `{ isActive: boolean }` | `{ idStaff, userId, staffNumber, position, specialty?, isActive, updatedAt }` (no createdAt) |

Create rules: 404 `User not found`; 400 `Customers cannot have a staff record`, so the user must already have role STAFF or ADMIN. No endpoint promotes a user's role. 409 when the user already has a staff record or the staff number is taken.

---

## Staff / branches (4 endpoints) — all ADMIN only

`@Controller()`, JwtAuthGuard, inline: 403 `Only administrators can manage staff branch assignments`. **CUSTOMER cannot call `GET /branches/:branchId/staff`.**

| Method + path | Body | Response |
|---|---|---|
| `POST /staff/:staffId/branches` | `{ branchId: UUID }` | StaffBranch |
| `GET /staff/:staffId/branches` | — | `Array<StaffBranch & { branch: Branch }>` (full Branch incl. timeZone; `startDate desc`; includes ended assignments) |
| `GET /branches/:branchId/staff` | — | `Array<StaffBranch & { staff: { idStaff, userId, staffNumber, position, specialty?, isActive, user: { idUser, firstName, lastName, email, mobileNumber, role } } }>` (`startDate desc`; **includes ended/inactive assignments and all positions**. Filter client-side on `isActive && staff.isActive && staff.position === "VETERINARIAN"` to get bookable vets.) |
| `PATCH /staff/:staffId/branches/:idStaffBranch/end` | `{ endDate?: ISO date string }` (defaults to now) | StaffBranch (`isActive: false`, `endDate` set) |

Assign errors: 404 staff/branch, 400 when the staff member or branch is inactive, 409 `Staff member is already assigned to this branch`. End errors: 404, 400 `already ended`, 400 `End date must be later than the assignment start date`.

---

## Medical records (requested: 2 endpoints)

`@Controller('medical-records')`, JwtAuthGuard, authorization in the service.

### `GET /medical-records/:idMedicalRecord`
- Access: ADMIN any record. CUSTOMER only when `pet.ownerId === caller`. STAFF only when the caller is an **active VETERINARIAN** staff member and is the record's vet; other staff get 403 `Only active veterinarians can access clinical records`. Other cases: 403 `You are not authorized to access this medical record`. 404 `Medical record not found`.
- Response:
  ```
  MedicalRecord & {
    pet: { idPet, name, ownerId },
    veterinarian: Staff & { user: { firstName, lastName } },
    appointment: { idAppointment, startsAt, completedAt?,
                   branch: { idBranch, name },
                   branchService: BranchService & { service: Service } }
  }
  ```

### `PATCH /medical-records/:idMedicalRecord`
- Access: ADMIN, or STAFF who is the record's active vet. **CUSTOMER always 403.**
- Body (all optional, but at least one is required, else 400 `At least one medical record field must be provided`): `observations`, `diagnosis`, `treatment`, `recommendations`. Each is a string, ≤10000 chars, with a non-whitespace char. Values are trimmed. Fields cannot be cleared: `null` is skipped and `""` fails the regex.
- Response: `MedicalRecord & { pet: { idPet, name }, veterinarian: Staff & { user: { firstName, lastName } } }`

(Also present but not requested: `GET /medical-records/pet/:petId?page&limit` returns paginated `{data, meta}` with the same includes as get-by-id minus `pet`, and `appointment.branch` is `{ name }` only. A vet sees only their own records. Records are created only by appointment completion, which has no route.)

---

## Pets (requested: 5 endpoints)

`@Controller('pets')`, JwtAuthGuard, inline checks. All return the full **Pet** row unless noted.

CreatePetDto / UpdatePetDto:
| field | type | create | update | validators |
|---|---|---|---|---|
| name | string | required | optional | 1–100 chars, at least one non-whitespace char |
| species | PetSpecies | required | optional | IsEnum |
| breed | string | optional | optional | max 100 |
| color | string | optional | optional | max 100 |
| dateOfBirth | string | optional | optional | IsDateString (ISO 8601, e.g. `2021-05-03` or a full ISO datetime). On PATCH, `null` clears it. |
| sex | PetSex | optional (DB default `UNKNOWN`) | optional | IsEnum |

| Method + path | Roles | Notes / response |
|---|---|---|
| `POST /pets/owner/:ownerId` | STAFF, ADMIN (403 `Only staff and administrators can access another owner’s pets`) | Creates a pet for any existing user; there is no check that the owner is a CUSTOMER. 404 `Pet owner not found`. Returns Pet. |
| `GET /pets/owner/:ownerId` | STAFF, ADMIN | Pet[] for that owner, **including inactive**, `createdAt desc`. 404 `User not found`. |
| `GET /pets/staff/:idPet` | STAFF, ADMIN | Pet (active or inactive). 404 `Pet not found`. |
| `PATCH /pets/:idPet` | **owner only** (any role, but `ownerId === caller` and the pet must be active) | 404 `Pet not found` when not the owner. 400 `At least one pet field must be provided`. Returns Pet. Staff cannot edit another owner's pet: no staff PATCH exists. |
| `PATCH /pets/:idPet/deactivate` | **owner only** (same rule) | No body. Returns `{ idPet, name, isActive: false, updatedAt }`. 404 if not found, not owned or already inactive. |

(Also present: `POST /pets` creates a pet for the caller, `GET /pets` lists the caller's active pets, and `GET /pets/:idPet` returns the caller's active pet.)

---

## Role access summary for a customer booking flow

| Endpoint | CUSTOMER allowed? |
|---|---|
| `GET /services` | yes (public) |
| `GET /service-categories` | yes (public) |
| `GET /branches` | **NO** (ADMIN only) |
| `GET /branches/:id` | **NO** (ADMIN only) |
| `GET /branches/:branchId/services` | **NO** (ADMIN only, RolesGuard) |
| `GET /services/:serviceId/branches` | **NO** (ADMIN only) |
| `GET /branches/:branchId/staff` | **NO** (ADMIN only) |
| `GET /staff`, `GET /staff/:id` | **NO** (ADMIN only) |
| `GET /appointments/availability` | yes |
| `POST /pets`, `GET /pets` | yes |
| `POST /appointments` | yes (CUSTOMER only) |
| list/cancel/reschedule own appointments | **does not exist** |

### What a customer would need to call to book, end to end
1. `POST /users` (register; becomes CUSTOMER) → `POST /auth/login` → keep `accessToken`.
2. `GET /pets`, or `POST /pets` to create one → `petId`.
3. Get a `branchId`: **no customer-accessible endpoint**.
4. Get a `branchServiceId` and price for that branch: **no customer-accessible endpoint**. (`GET /services` returns `idService` only, which is not accepted by booking.)
5. Get a `veterinarianId` (Staff.idStaff) for that branch: **no customer-accessible endpoint**.
6. `GET /appointments/availability?branchId&veterinarianId&date=YYYY-MM-DD` → choose `availableSlots[i].startsAt`.
7. `POST /appointments { petId, branchId, branchServiceId, veterinarianId, startsAt, notes? }` → Appointment (PENDING, expires in 15 min).
8. Afterwards: no endpoint to view, cancel or reschedule it. With no confirm endpoint, it will become EXPIRED.

Steps 3–5 are blocked. Options: hardcode IDs in the frontend, open those GETs to CUSTOMER, or add public endpoints (for example `GET /branches/public`, `GET /branches/:id/services/public` with the current price, `GET /branches/:id/veterinarians`). Separately, availability depends on `StaffSchedule` rows that have no API.

## Other risks spotted
- `AppointmentsModule` (and `NotificationsModule`) import only `PrismaModule`, not `AppJwtModule`, but use `JwtAuthGuard`, which needs `JwtService`. JWT is not global. This **may cause a Nest dependency-resolution error at boot** ("can't resolve dependencies of JwtAuthGuard"). Verify by starting the server.
- The module-level validation uses `forbidNonWhitelisted`, so a zod-parsed object with extra keys sent back to PATCH will 400. Strip response-only fields such as `idPet` and `createdAt` before sending.
- Slug-conflict status codes differ: branches use 409, services and categories use 400.
