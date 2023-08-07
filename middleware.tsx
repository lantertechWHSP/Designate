import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ['/'],
};

export async function middleware(request: NextRequest) : Promise<NextResponse> {
    if(process.env.SITE_ENVIRONMENT === 'staging') {
        const basicAuth = request.headers.get('authorization');

        const url = request.nextUrl;
        //
        if (basicAuth) {
            const authValue = basicAuth.split(' ')[1];
            const [user, pwd] = atob(authValue).split(':');

            if ((user === 'designate' && pwd === 'GVvAqUNXjpex0N6RgBYl')) {
                return NextResponse.next();
            }
        }

        url.pathname = '/api/auth';
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}
