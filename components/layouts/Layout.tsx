import React from 'react';
import Meta from '~/components/layouts/meta';
import Header from '~/components/layouts/Header';
import Footer from '~/components/layouts/Footer';

const Layout = ({ layout, children }:any) : JSX.Element => {
    return (
        <>
            <Meta tags={layout.metatags} />
            <Header />
            {
                layout.title && <h1>
                    {
                        layout.title
                    }
              </h1>
            }
            {children}
            <Footer />
        </>
    );
}

export default Layout;
