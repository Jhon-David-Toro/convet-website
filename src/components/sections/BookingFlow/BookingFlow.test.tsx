import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { PetItem } from "@/lib/customer/customer.types";

import { BookingFlow } from "./BookingFlow";
import { EMPTY_SELECTION } from "./BookingFlow.constants";
import {
  barSummaryLine,
  bookingSummary,
  calendarFileHref,
  canContinueFrom,
  confirmedAppointment,
  confirmedTitle,
  freeChangeDeadline,
  petName,
  stepAt,
  stepCopy,
} from "./BookingFlow.utils";
import type { BookingFlowProps } from "./BookingFlow.types";
import { NextAvailableButton } from "./parts/NextAvailableButton";

const WAIT = { timeout: 3000 };

const PETS: PetItem[] = [
  {
    id: "luna",
    name: "Luna",
    subject: "cat",
    summary: "Female cat",
    profileLine: "Cat · 3 years old",
    microchip: "123456789",
    weight: "4.2 kg",
    weightDate: "2026-10-01",
    vet: "Dr. Shirley",
  },
  {
    id: "milo",
    name: "Milo",
    subject: "dog",
    summary: "Male dog",
    profileLine: "Dog · 2 years old",
    microchip: "987654321",
    weight: "8.5 kg",
    weightDate: "2026-10-01",
    vet: "Dr. Shirley",
  },
];

const SELECTION = {
  petId: "luna",
  serviceId: "vaccinations",
  vetId: "shirley",
  date: "2026-10-09",
  time: "9:30 AM",
  notes: "",
  whatsapp: true,
};

/**
 * Renders the booking flow with the customer's registered pets.
 */
function renderBookingFlow(
  props: Omit<BookingFlowProps, "pets"> = {},
) {
  return render(<BookingFlow pets={PETS} {...props} />);
}

/**
 * Presses the "Continue" button of the current step.
 */
async function next() {
  await userEvent.click(
    screen.getAllByRole("button", { name: "Continue" })[0],
  );
}

/**
 * Walks through the booking steps until the review.
 *
 * Selects Luna, vaccination, Dr. Shirley, and Friday October 9,
 * 2026 at 9:30 AM.
 */
async function reachReview() {
  await next();

  await userEvent.click(
    screen.getByRole("radio", { name: /Vaccination/ }),
  );

  await next();

  await userEvent.click(
    screen.getByRole("radio", { name: /Dr\. Shirley/ }),
  );

  await next();

  await userEvent.click(
    screen.getByRole("button", {
      name: "Friday, October 9, 2026",
    }),
  );

  await userEvent.click(
    await screen.findByRole("button", { name: /9:30 AM/ }, WAIT),
  );

  await next();
}

describe("BookingFlow", () => {
  it("starts with the pet and keeps Continue off until something is chosen", async () => {
    renderBookingFlow();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Who is the visit for?",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("radio", { name: /Luna/ }),
    ).toBeChecked();

    await next();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "What does Luna need?",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("button", { name: "Continue" })[0],
    ).toBeDisabled();
  });

  it("does not let the customer pick a service that is booked by the team", async () => {
    renderBookingFlow();

    await next();

    expect(
      screen.getByRole("radio", { name: /Treatment follow-up/ }),
    ).toBeDisabled();

    expect(
      screen.getByText("Tip: add both vaccines to one visit"),
    ).toBeInTheDocument();
  });

  it("starts with the service chosen when it comes from a service page", async () => {
    renderBookingFlow({ initialServiceId: "vaccinations" });

    await next();

    expect(
      screen.getByRole("radio", { name: /Vaccination/ }),
    ).toBeChecked();

    expect(
      screen.getAllByRole("button", { name: "Continue" })[0],
    ).toBeEnabled();
  });

  it("shows what is chosen in the summary card and goes back", async () => {
    renderBookingFlow({ initialServiceId: "vaccinations" });

    await next();
    await next();

    expect(screen.getByText("Not selected yet")).toBeInTheDocument();

    await userEvent.click(
      screen.getAllByRole("button", { name: "Back" })[0],
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "What does Luna need?",
      }),
    ).toBeInTheDocument();
  });

  it("shows the times of the day after a short loading state and holds Continue until one is picked", async () => {
    renderBookingFlow({ initialServiceId: "vaccinations" });

    await next();
    await next();

    await userEvent.click(
      screen.getByRole("radio", { name: /Dr\. Shirley/ }),
    );

    await next();

    await userEvent.click(
      screen.getByRole("button", {
        name: "Friday, October 9, 2026",
      }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Finding available times",
    );

    expect(
      await screen.findByRole(
        "heading",
        { name: "Friday, October 9" },
        WAIT,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("button", { name: "Continue" })[0],
    ).toBeDisabled();
  });

  it("jumps to the first free time with the shortcut", async () => {
    renderBookingFlow({ initialServiceId: "vaccinations" });

    await next();
    await next();

    await userEvent.click(
      screen.getByRole("radio", { name: /Dr\. Shirley/ }),
    );

    await next();

    await userEvent.click(
      screen.getByRole("button", { name: /Next available/ }),
    );

    expect(
      await screen.findByRole(
        "button",
        { name: /^9:10 AM/ },
        WAIT,
      ),
    ).toHaveAttribute("aria-pressed", "true");

    expect(
      screen.getAllByRole("button", { name: "Continue" })[0],
    ).toBeEnabled();
  });

  it("reviews the visit and confirms it", async () => {
    renderBookingFlow({ initialServiceId: "vaccinations" });

    await next();
    await next();

    await userEvent.click(
      screen.getByRole("radio", { name: /Dr\. Shirley/ }),
    );

    await next();

    await userEvent.click(
      screen.getByRole("button", {
        name: "Friday, October 9, 2026",
      }),
    );

    await userEvent.click(
      await screen.findByRole("button", { name: /9:30 AM/ }, WAIT),
    );

    await next();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Review & confirm",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("9:30 AM has 2 of 5 places left"),
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getAllByRole("button", {
        name: "Confirm appointment",
      })[0],
    );

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Request confirmed! See you Friday.",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Go to my appointments" }),
    ).toHaveAttribute("href", "/app/appointments");

    expect(
      screen.getByRole("link", { name: "Add to calendar" }),
    ).toHaveAttribute("href", expect.stringContaining("text/calendar"));
  });

  it("offers nearby times when the chosen one was taken", async () => {
    const onConfirm = vi.fn().mockResolvedValue({
      ok: false,
      alternatives: [
        {
          time: "9:40 AM",
          left: 4,
          state: "open",
        },
      ],
    });

    renderBookingFlow({
      initialServiceId: "vaccinations",
      onConfirm,
    });

    await next();
    await next();

    await userEvent.click(
      screen.getByRole("radio", { name: /Dr\. Shirley/ }),
    );

    await next();

    await userEvent.click(
      screen.getByRole("button", {
        name: "Friday, October 9, 2026",
      }),
    );

    await userEvent.click(
      await screen.findByRole("button", { name: /9:30 AM/ }, WAIT),
    );

    await next();

    await userEvent.click(
      screen.getAllByRole("button", {
        name: "Confirm appointment",
      })[0],
    );

    expect(
      await screen.findByText("9:30 AM just filled up"),
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /9:40 AM/ }),
    );

    expect(
      screen.queryByText("9:30 AM just filled up"),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("9:40 AM has 0 of 5 places left"),
    ).toBeInTheDocument();
  });

  it("starts again from the confirmation to book for another pet", async () => {
    renderBookingFlow({ initialServiceId: "vaccinations" });

    await next();
    await next();

    await userEvent.click(
      screen.getByRole("radio", { name: /Dr\. Shirley/ }),
    );

    await next();

    await userEvent.click(
      screen.getByRole("button", {
        name: "Friday, October 9, 2026",
      }),
    );

    await userEvent.click(
      await screen.findByRole("button", { name: /9:30 AM/ }, WAIT),
    );

    await next();

    await userEvent.click(
      screen.getAllByRole("button", {
        name: "Confirm appointment",
      })[0],
    );

    await userEvent.click(
      await screen.findByRole("button", {
        name: "Book for another pet",
      }),
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Who is the visit for?",
      }),
    ).toBeInTheDocument();
  });
});

describe("booking flow utils", () => {
  it("decides when a step can be left", () => {
    expect(canContinueFrom("pet", SELECTION)).toBe(true);

    expect(
      canContinueFrom("datetime", {
        ...SELECTION,
        time: "",
      }),
    ).toBe(false);

    expect(canContinueFrom("confirmed", SELECTION)).toBe(false);
  });

  it("moves between steps without leaving the list", () => {
    expect(stepAt("pet", -1)).toBe("pet");
    expect(stepAt("review", 1)).toBe("confirmed");
    expect(stepAt("confirmed", 1)).toBe("confirmed");
  });

  it("writes titles, summaries and the free change deadline", () => {
    expect(stepCopy("service", "Luna").title).toBe(
      "What does Luna need?",
    );

    expect(barSummaryLine(SELECTION, PETS)).toBe(
      "Vaccination · Luna · Dr. Shirley",
    );

    expect(confirmedTitle("2026-10-09")).toBe(
      "Request confirmed! See you Friday.",
    );

    expect(freeChangeDeadline("2026-10-09", "9:30 AM")).toBe(
      "Thu, Oct 8 at 9:30 AM",
    );
  });

  it("reaches the review with a helper", async () => {
    renderBookingFlow();

    await reachReview();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Review & confirm",
      }),
    ).toBeInTheDocument();
  });
});

describe("BookingFlow choices and notes", () => {
  it("lets the customer pick another pet", async () => {
    renderBookingFlow();

    await userEvent.click(
      screen.getByRole("radio", { name: /Milo/ }),
    );

    await next();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "What does Milo need?",
      }),
    ).toBeInTheDocument();
  });

  it("asks for a service for a pet that is not registered yet", async () => {
    renderBookingFlow();

    await userEvent.click(
      screen.getByRole("radio", { name: /Add a new pet/ }),
    );

    await next();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "What does your pet need?",
      }),
    ).toBeInTheDocument();
  });

  it("takes notes and the WhatsApp choice on the review", async () => {
    renderBookingFlow({ initialServiceId: "vaccinations" });

    await reachReview();

    const notes = screen.getByLabelText(
      /Anything the vet should know/,
    );

    await userEvent.type(notes, "Leptospirosis too");

    expect(notes).toHaveValue("Leptospirosis too");

    const whatsapp = screen.getByRole("checkbox", {
      name: /WhatsApp/,
    });

    await userEvent.click(whatsapp);

    expect(whatsapp).not.toBeChecked();
  });

  it("offers another vet or any vet when the day is full", async () => {
    renderBookingFlow({ initialServiceId: "vaccinations" });

    await next();
    await next();

    await userEvent.click(
      screen.getByRole("radio", { name: /Dr\. Shirley/ }),
    );

    await next();

    await userEvent.click(
      screen.getByRole("button", {
        name: /October 13, 2026/,
      }),
    );

    await userEvent.click(
      await screen.findByRole(
        "button",
        { name: "Any available vet" },
        WAIT,
      ),
    );

    expect(
      screen.getAllByRole("button", { name: "Continue" })[0],
    ).toBeDisabled();

    await userEvent.click(
      screen.getByRole("button", { name: "Change vet" }),
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Choose a vet",
      }),
    ).toBeInTheDocument();
  });
});

describe("booking flow utils edge cases", () => {
  it("names a pet that is new or unknown", () => {
    expect(petName("new", PETS)).toBe("your pet");
    expect(petName("nobody", PETS)).toBe("Pet");
  });

  it("summarizes a booking without pet or vet", () => {
    const summary = bookingSummary(
      {
        ...EMPTY_SELECTION,
        petId: "new",
      },
      PETS,
    );

    expect(summary.pet).toEqual({
      title: "Pet",
      detail: "New pet",
    });

    expect(summary.vet).toEqual({
      title: "Vet",
      detail: "Not selected yet",
    });

    expect(summary.date).toBe("Pick a date");
  });

  it("builds the bar line and the calendar file without a service or a vet", () => {
    const selection = {
      ...EMPTY_SELECTION,
      serviceId: "vaccinations",
    };

    expect(barSummaryLine(selection, PETS)).toBe(
      "Vaccination · your pet",
    );

    expect(
      confirmedAppointment(
        {
          ...EMPTY_SELECTION,
          date: "2026-10-09",
          time: "9:30 AM",
        },
        PETS,
      ).service,
    ).toBe("");

    expect(
      decodeURIComponent(
        calendarFileHref(
          {
            ...EMPTY_SELECTION,
            date: "2026-10-09",
            time: "9:30 AM",
          },
          PETS,
        ),
      ),
    ).toContain("BEGIN:VCALENDAR");
  });
});

describe("booking flow small parts", () => {
  it("shows no shortcut for a vet without free times", () => {
    const { container } = render(
      <NextAvailableButton
        vetId="andreina"
        onPick={() => undefined}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});