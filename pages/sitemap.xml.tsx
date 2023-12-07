import { doQuery, queries } from '~/dato/api';

function generateSiteMap(paths) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${paths.map((path) => {
            return `
               <url>
                   <loc>${path}</loc>
               </url>
             `;
        })
        .join('')}
    </urlset>
 `;
}

function SitemapXml() {
}

export async function getServerSideProps({ res }) {
    const siteUrl:string = 'https://soulpatts.com.au';
    const paths = [];

    const pages:any = await doQuery(queries.pages).then(({ pages }) => pages);
    const posts:any = await doQuery(queries.posts, { first: 100 }).then(({ posts }) => posts);

    const pagePaths:any = pages
        .map((page) => {
            const slug:string = page.slug === 'home' ? [''] : page.slug;
            return `${siteUrl}/${slug}`;
        });

    const postPaths:any = posts.map((post) => {
        return `${siteUrl}/news/${post.slug}`;
    });

    paths.push(...pagePaths);
    paths.push(...postPaths);

    const sitemap = generateSiteMap(paths);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {}
    };
}

export default SitemapXml;
