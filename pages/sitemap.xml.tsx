import { doQuery, queries } from '~/dato/api';
import {IPage} from "~/interfaces/models/page";

function generateSiteMap(paths) : string {
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

function SitemapXml() : any {
}

export async function getServerSideProps({ res }) : Promise<any> {
    const siteUrl:string = 'https://soulpatts.com.au';
    const paths:any[] = [];

    const pages:IPage[] = [];

    let hasAllPages = false;
    let pageBatchIndex = 0;

    while(!hasAllPages) {
        const batchPages = await doQuery(queries.pages, { first: 100, skip: 100 * pageBatchIndex }).then(({ pages }) => pages);

        pages.push(...batchPages);

        if(batchPages.length < 100) {
            hasAllPages = true;
        }
        else {
            pageBatchIndex++;
        }
    }

    const posts = [];
    let hasAllPosts = false;
    let postBatchIndex = 0;

    while(!hasAllPosts) {
        const batchPosts = await doQuery(queries.posts, { first: 100, skip: 100 * postBatchIndex }).then(({ posts }) => posts);

        posts.push(...batchPosts);

        if(batchPosts.length < 100) {
            hasAllPosts = true;
        }
        else {
            postBatchIndex++;
        }
    }

    const pagePaths:any = pages.map((page) => {
        const slug:string = page.slug === 'home' ? [''] : page.slug;
        return `${siteUrl}/${slug}`;
    });

    const postPaths:any = posts.map((post) => {
        return `${siteUrl}/news/${post.slug}`;
    });

    paths.push(...pagePaths);
    paths.push(...postPaths);

    const sitemap:string = generateSiteMap(paths);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {}
    };
}

export default SitemapXml;
