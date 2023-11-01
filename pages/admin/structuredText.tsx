import React, { useEffect, useState } from 'react';
import { withSecureHeaders } from 'next-secure-headers';

import { connect } from 'datocms-plugin-sdk';

const StructuredTextEditor:any = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        if(!isLoaded) {
            connect({
                customMarksForStructuredTextField(_field, _ctx) {
                    return [
                        {
                            id: 'ticked-list-item',
                            label: 'Ticked List',
                            icon: 'list',
                            keyboardShortcut: 'mod+shift+l',
                            appliedStyle: {
                                display: 'list-item',
                                marginLeft: '-18px',
                                paddingLeft: '18px',
                                background: 'white',
                                position: 'relative',
                                listStyleType: '✓',
                            }
                        }
                    ];
                },
            });

            setIsLoaded(true);
        }
    }, [isLoaded]);

    return (
        <></>
    );
};

export default withSecureHeaders({
    frameGuard: false,
    contentSecurityPolicy: {
        directives: {
            frameAncestors: 'https://whsp.admin.datocms.com/'
        }
    }
})(StructuredTextEditor);
