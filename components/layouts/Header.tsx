import Link from 'next/link';
import { ReactNode } from 'react';

interface IMenuItem {
    link: {
        title?:string;
        slug?:string;
    }
}

const Header = ({ menu }) : ReactNode => {
    return <header>
        <div>
            Header
        </div>
        <nav>
            <Link href="/">Home</Link> |
            {
                Array.isArray(menu) && menu.length > 0 && menu.map((item:IMenuItem, index:number) => {
                    return <Link key={index} href={item.link.slug}>{item.link.title}</Link>;
                })
            }
        </nav>
    </header>;
};

export default Header;
