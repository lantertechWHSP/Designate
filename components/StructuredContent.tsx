import React  from 'react';
import { StructuredText } from 'react-datocms';
import Link  from 'next/link';

const StrucutredContent = ({ content }) : any => {
    return (
        <StructuredText
            data={content}
            renderLinkToRecord={({ record, children, transformedMeta }) => {
                return <Link {...transformedMeta} href={record}>
                    {children}
                </Link>;
            }}
        />
    );
};

export default StrucutredContent;
