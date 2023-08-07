import React from 'react';

export default function Layout({ layout, children }:any) : JSX.Element {
    return (
        <>
            <header>
                Header
            </header>
            {children}
            <footer>
                Footer
            </footer>
        </>
    );
}
