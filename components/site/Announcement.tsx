import React, { ReactNode, useEffect, useState } from 'react';
import { IDatoAnnouncement } from '~/interfaces/layout/announcement';
import { Box, Flex, Container, Button } from '@chakra-ui/react';
import StructuredContent from "~/components/StructuredContent";
import { Icon, Icons } from '~/components/elements/icon';
import { DateTime } from 'luxon';

interface IAnnouncement extends IDatoAnnouncement {
}

const Announcement:any = ({ description, _publishedAt }:IAnnouncement): ReactNode => {

    const [isClosed, setIsClosed] = useState(true);

    const handleClose:any = () : void => {
        localStorage.setItem('soulpatts.announcements.closed', 'true');
        setIsClosed(true);
    };

    useEffect(() => {
        // If it isn’t published yet
        if(!localStorage.getItem('soulpatts.announcements.publishedAt')) {

            // Open the announcement
            localStorage.setItem('soulpatts.announcements.publishedAt', _publishedAt);
            localStorage.setItem('soulpatts.announcements.closed', 'false');
            setIsClosed(false);
        }
        // If there is a publised at set
        else if(localStorage.getItem('soulpatts.announcements.publishedAt')) {
            const date = localStorage.getItem('soulpatts.announcements.publishedAt');

            // If the current published at is greater than the one set on the localStorage
            if(DateTime.fromISO(_publishedAt) > DateTime.fromISO(date)) {

                // Open the announcement
                localStorage.setItem('soulpatts.announcements.publishedAt', _publishedAt);
                localStorage.setItem('soulpatts.announcements.closed', 'false');
                setIsClosed(false);
            }
            else {
                // If the announcement isn’t closed
                if(localStorage.getItem('soulpatts.announcements.closed') !== 'true') {

                    // Open the announcement
                    localStorage.setItem('soulpatts.announcements.closed', 'false');
                    setIsClosed(false);
                }
            }
        }
    }, []);

    return <>
        {
            !isClosed && <Box py={4} background="charcoal" color="white" fontSize="16px" position="relative">
                <Flex align="center" justify="center" pl={['16px', '24px', '32px']} pr={"32px"}>
                    <StructuredContent content={description}></StructuredContent>
                </Flex>
                <Button position="absolute" right="15px" top="15px" w="30px" height="30px" onClick={handleClose}>
                    <Icon icon={Icons.StickyMenuClose} w={16} h={16} />
                </Button>
            </Box>
        }
    </>;

};

export default Announcement;