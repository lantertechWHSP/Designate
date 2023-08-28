interface Attrs {
    width: number;
    height: number;
}

export const imageAttrs = ({width, height}:Attrs = { width: 1380, height: null}) : string => {
    return `
        responsiveImage (imgixParams: { auto:format ${width ? `,w: "${width}"` : ''}${height ? `,h: "${height}"` : ''}, fit:crop }) {
            aspectRatio
            height
            sizes
            src
            srcSet
            webpSrcSet
            width
            alt
            title
        }
    `;
};

