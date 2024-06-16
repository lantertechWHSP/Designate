import React, {useEffect, useState} from 'react';
import { connect } from 'datocms-plugin-sdk';

const StructuredTextEditorPlugin:any = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const isInIframe:any = () : boolean => {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    };

    useEffect(() => {
        if(!isLoaded) {
            if(isInIframe()) {
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
                                    listStyleType: `'✓'`,
                                }
                            }
                        ];
                    },
                });
            }

            setIsLoaded(true);
        }
    }, [isLoaded]);

    return (
        <></>
    );
};

export default StructuredTextEditorPlugin;