import { NextResponse } from 'next/server';

const ACCESS_TOKEN_COOKIE = 'convet_access_token';
const ACCESS_TOKEN_MAX_AGE = 60 * 60;

type LoginRequest = {
    email: string;
    password: string;
};

type BackendLoginResponse = {
    accessToken: string;
    expiresIn: string;
    user: {
        idUser: string;
        firstName: string;
        lastName: string;
        email: string;
        role: 'CUSTOMER' | 'STAFF' | 'ADMIN';
    };
};

export async function POST(request: Request) {
    let credentials: LoginRequest;

    try {
        const body: unknown = await request.json();

        if (
            typeof body !== 'object' ||
            body === null ||
            !('email' in body) ||
            !('password' in body) ||
            typeof body.email !== 'string' ||
            typeof body.password !== 'string' ||
            !body.email.trim() ||
            !body.password
        ) {
            return NextResponse.json(
                { message: 'Invalid login request' },
                { status: 400 },
            );
        }

        credentials = {
            email: body.email.trim(),
            password: body.password,
        };
    } catch {
        return NextResponse.json(
            { message: 'Invalid request body' },
            { status: 400 },
        );
    }

    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
        return NextResponse.json(
            { message: 'Authentication service is not configured' },
            { status: 500 },
        );
    }

    let backendResponse: Response;

    try {
        backendResponse = await fetch(`${backendUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            cache: 'no-store',
        });
    } catch {
        return NextResponse.json(
            { message: 'Authentication service is unavailable' },
            { status: 503 },
        );
    }

    if (!backendResponse.ok) {
        const status = backendResponse.status === 401
            ? 401
            : backendResponse.status === 400
                ? 400
                : 502;

        return NextResponse.json(
            {
                message: status === 401
                    ? 'Invalid email or password'
                    : 'Unable to authenticate',
            },
            { status },
        );
    }

    let data: BackendLoginResponse;

    try {
        data = await backendResponse.json();
    } catch {
        return NextResponse.json(
            { message: 'Invalid authentication response' },
            { status: 502 },
        );
    }

    if (
        typeof data.accessToken !== 'string' ||
        !data.accessToken ||
        !data.user ||
        typeof data.user.idUser !== 'string' ||
        typeof data.user.firstName !== 'string' ||
        typeof data.user.lastName !== 'string' ||
        typeof data.user.email !== 'string' ||
        !['CUSTOMER', 'STAFF', 'ADMIN'].includes(data.user.role)
    ) {
        return NextResponse.json(
            { message: 'Invalid authentication response' },
            { status: 502 },
        );
    }

    const response = NextResponse.json({
        user: data.user,
    });

    response.cookies.set({
        name: ACCESS_TOKEN_COOKIE,
        value: data.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    return response;
}