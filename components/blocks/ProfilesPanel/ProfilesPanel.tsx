import React, { ReactNode, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import StructuredContent from '~/components/StructuredContent';
import { Image} from '~/components/elements/image';
import { Icon, Icons } from '~/components/elements/icon';
import {
    Box,
    Button,
    Container,
    Divider,
    Heading,
    Modal,
    ModalContent,
    ModalOverlay,
    SimpleGrid,
    Text
} from '@chakra-ui/react';
import ProfileCard, { IProfileCard } from '~/components/blocks/ProfilesPanel/ProfileCard';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import { isEmptyDocument } from 'datocms-structured-text-utils';
import ContentBlock from "~/components/blocks/Content";

interface IProfilesPanelBlock extends IBlock {
    items:IProfileCard[];
}

export const ProfilesPanelBlock:any = ({ items, background, paddingTop, paddingBottom }:IProfilesPanelBlock) : ReactNode => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState<IProfileCard>(null);

    const onProfileClick:any = (index:number) : void => {
        setActiveItem(items[index]);
        setModalOpen(true);
    };

    return (Array.isArray(items) && items.length > 0) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <SimpleGrid columns={[1, 2, 3]} spacing={[6, ,8]}>
            {
                items.map((item:IProfileCard, index:number) => {
                    return <Box key={index}>
                        <ProfileCard
                            {...item}
                            onClick={() => {
                                onProfileClick(index);
                            }}
                        />
                    </Box>;
                })
            }
        </SimpleGrid>
        {
            <Modal isOpen={modalOpen} size="full"  onClose={() => setModalOpen(false)}>
                <ModalOverlay />
                <ModalContent minWidth="100vw" minHeight="100vh" background="oliveGrey">
                    <Box my={8}>
                        <Container>
                            <Row>
                                <Column width={[ColumnWidth.None, ,ColumnWidth.OneThird]}>
                                    <Image image={activeItem?.person?.image} ratio={[1 / 1]} display={['none', , 'block']} />
                                </Column>
                                <Column  width={[ColumnWidth.Full, ,ColumnWidth.TwoThirds]}>
                                    {
                                        (activeItem?.person?.name || !isEmptyDocument(activeItem?.detailedCompanyPosition) || activeItem?.person?.companyPosition) && <Box minHeight="50px">
                                            {
                                                activeItem?.person?.name && <Heading as="h2" fontWeight={500} fontSize={['21px']} lineHeight={['26px']}>
                                                    {activeItem?.person?.name}
                                                </Heading>
                                            }
                                            {
                                                !isEmptyDocument(activeItem?.detailedCompanyPosition) ? <Heading as="h3" fontSize={['19px']}>
                                                    <StructuredContent content={activeItem?.detailedCompanyPosition} />
                                                </Heading> : (activeItem?.person?.companyPosition && <Heading as="h3" fontSize={['19px']}>
                                                    {activeItem?.person?.companyPosition}
                                                </Heading>)
                                            }
                                            {
                                                (activeItem?.person?.qualifications) && <Text color="charcoalBlur" fontSize="16px" m={0}>
                                                    {activeItem?.person?.qualifications}
                                                </Text>
                                            }
                                        </Box>
                                    }
                                    <Divider borderColor="charcoalBlur" my={4} />
                                    {
                                        <Box display={['block', , 'none']}>
                                            <Image image={activeItem?.person?.image} ratio={[1 / 1]} mb={8} />
                                        </Box>
                                    }
                                    {
                                        !isEmptyDocument(activeItem?.description) && <Box color="charcoal">
                                            <StructuredContent content={activeItem?.description} />
                                        </Box>
                                    }
                                </Column>
                            </Row>
                            <Button pos="absolute" top={8} right={8} onClick={() => setModalOpen(false)} borderRadius="50%" border="2px solid" borderColor="oliveBlur" color="charcoal" background="transparent" w="50px" h="50px">
                                <Icon icon={Icons.Cross} w={10} h={10} />
                            </Button>
                        </Container>
                    </Box>
                </ModalContent>
            </Modal>
        }
    </ContentBlock>;
};

export default ProfilesPanelBlock;
