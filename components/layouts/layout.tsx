import React from 'react';

export interface ILayout {
    slug?:string;
    title?:string;
    preview?:boolean;
}

export default function Layout({ layout, children }:any) : JSX.Element {
    return (
        <>
            <header>
                Header
            </header>
            {
                layout.title && <h1>
                    {
                        layout.title
                    }
              </h1>
            }
            {children}
            <footer>
                Footer
            </footer>
        </>
    );
}
