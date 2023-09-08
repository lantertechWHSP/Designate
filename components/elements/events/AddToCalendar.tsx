import { ReactNode } from 'react';
import { google, outlook, office365, yahoo, ics, CalendarEvent } from 'calendar-link';
import { Portal, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

interface IAddToCalendarProps {
    isOpen?:boolean;
    onClose?:() => any;
    event?:CalendarEvent;
}

const AddToCalendar:any = ({ event }:IAddToCalendarProps) : ReactNode => {
    if (!event) {
        return null;
    }

    return (
        <Menu placement="bottom-end">
            {() => (
                <>
                    <MenuButton as={Button}
                        variant="menuButton"
                        textAlign="center">
                        Add To Calendar
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