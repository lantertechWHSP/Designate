import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import SiteLayout from '~/components/layouts/SiteLayout';
import AdminLayout from "~/components/layouts/AdminLayout";
import { useRouter } from 'next/router';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) : any {
    const router = useRouter();
    
    let getLayout:any;

    if(Component.getLayout) {
        getLayout = Component.getLayout;
    }
    else if(/^admin/.test(router.route)) {
        getLayout = ((page) => <AdminLayout>{page}</AdminLayout>);
    }
    else {
        getLayout = ((page) => <SiteLayout>{page}</SiteLayout>);
    }

    return getLayout(<Component {...pageProps} />);
}