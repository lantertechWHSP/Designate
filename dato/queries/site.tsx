export const site = `
  query site {
    site: _site {
     favicon: faviconMetaTags {
        attributes
        content
        tag
      }
    }
  }
`;
