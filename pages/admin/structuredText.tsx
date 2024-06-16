import React from 'react';
import { withSecureHeaders } from 'next-secure-headers';
import StructuredTextEditorPlugin from "~/plugins/structuredText/index";

const StructuredTextEditor:any = () => {
    return <StructuredTextEditorPlugin />;
};

export default withSecureHeaders({
    frameGuard: false,
    contentSecurityPolicy: {
        directives: {
            frameAncestors: 'https://soulpatts.admin.datocms.com/'
        }
    },
})(StructuredTextEditor);
