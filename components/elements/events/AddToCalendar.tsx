import {ReactNode, useState} from 'react';
import { google, outlook, office365, yahoo, ics, CalendarEvent } from 'calendar-link';
import { Portal, Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { SectionLinkInner } from '~/components/elements/sectionLink';

interface IAddToCalendar {
    isOpen?:boolean;
    onClose?:() => any;
    event?:CalendarEvent;
    children:any;
}

const AddToCalendar:any = ({ event, children }:IAddToCalendar) : ReactNode => {
    const [isOpen, setIsOpen] = useState(false);

    if (!event) {
        return null;
    }

    return (
        <Menu isLazy isOpen={isOpen} onClose={() => {
            setIsOpen(false);
        }} placement="bottom-end">
            {() => (
                <>
                    <MenuButton as={Button} onClick={() => {
                        setIsOpen(true);
                    }} sx={{
                        fontWeight: 500
                    }}>
                        {children}
                    </MenuButton>
                    <Portal>
                        <MenuList>
                            <CalendarLink href={ics(event)}>Apple</CalendarLink>
                            <CalendarLink href={google(event)}>Google</CalendarLink>
                            <CalendarLink href={outlook(event)}>Outlook</CalendarLink>
                            <CalendarLink href={yahoo(event)}>Yahoo</CalendarLink>
                            <CalendarLink href={office365(event)}>Office 365</CalendarLink>
                        </MenuList>
                    </Portal>
                </>
            )}
        </Menu>
    );
};

export default AddToCalendar;

const CalendarLink:any = ({ ...props }:any) : ReactNode => {
    return <MenuItem as="a" target="_blank" {...props} />;
};
