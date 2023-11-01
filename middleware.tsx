import { NextRequest, NextResponse } from 'next/server';

export const config:any = {
    matcher: ['/', '/:path*'],
};

export async function middleware(request: NextRequest) : Promise<NextResponse> {
    if(request.nextUrl === '/admin/structuredText') {
        return NextResponse.next();
    }

    // Staging Environment
    if(process.env.SITE_ENVIRONMENT === 'staging' || process.env.SITE_ENVIRONMENT === 'production') {
        const basicAuth:any = request.headers.get('authorization');
        const url:any = request.nextUrl;

        if (basicAuth) {
            const authValue:any = basicAuth.split(' ')[1];
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
