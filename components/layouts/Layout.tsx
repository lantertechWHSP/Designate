import React from 'react';
import Meta from '~/components/layouts/Meta';
import Header from '~/components/layouts/Header';
import Footer from '~/components/layouts/Footer';

const Layout = ({ layout, children }:any) : JSX.Element => {
    console.log(layout);
    return (
        <>
            {
                layout?.metatags && <Meta tags={layout?.metatags} />
            }
            <Header menu={layout?.menu} />
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
