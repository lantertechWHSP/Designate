import type {ReactNode} from "react";
import Head from 'next/head';

const AdminLayout = ({ children }:any) : ReactNode => {
    return <>
        <Head>
            <title>Soul Patts</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        Carl!!
        {children}
    </>;
};

export default AdminLayout;