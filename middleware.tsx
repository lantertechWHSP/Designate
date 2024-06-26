import { NextRequest, NextResponse } from 'next/server';

export const config:any = {
    matcher: ['/', '/:path*'],
};

export async function middleware(request: NextRequest) : Promise<NextResponse> {
    // Staging Environment
    if(process.env.SITE_ENVIRONMENT === 'staging' || process.env.SITE_ENVIRONMENT === 'preproduction') {
        const basicAuth:any = request.headers.get('authorization');
        const url:any = request.nextUrl;

        if (basicAuth) {
            const authValue:any = basicAuth.split(' ')[1];
            const [user, pwd] = atob(authValue).split(':');

            if (
                (user === 'designate' && pwd === 'GVvAqUNXjpex0N6RgBYl') ||
                (user === 'soulpatts' && pwd === '6Hcd3aMiTkxTNSX8') ||
                (user === 'iguana2' && pwd === 'JxmK5XDR8K4DGpbt')
            ) {
                return NextResponse.next();
            }
        }
        url.pathname = '/api/auth';

        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

