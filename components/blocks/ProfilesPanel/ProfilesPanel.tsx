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
    SimpleGrid
} from '@chakra-ui/react';
import ProfileCard, { IProfileCard } from '~/components/blocks/ProfilesPanel/ProfileCard';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';
import { isEmptyDocument } from 'datocms-structured-text-utils';
import ContentBlock from "~/components/blocks/Content";
import { AnimateOpacity } from '~/components/elements/animation/AnimateOpacity';
import { AnimateOverflow } from '~/components/elements/animation/AnimateOverflow';

interface IProfilesPanelBlock extends IBlock {
    items:IProfileCard[];
    columnCount?:number;
    showQualifications?:boolean;
}

export const ProfilesPanelBlock:any = ({ items, showQualifications, columnCount = 3, background, paddingTop, paddingBottom }:IProfilesPanelBlock) : ReactNode => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState<IProfileCard>(null);

    const onProfileClick:any = (index:number) : void => {
        setActiveItem(items[index]);
        setModalOpen(true);
    };

    return (Array.isArray(items) && items.length > 0) && <ContentBlock background={background} paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <SimpleGrid columns={[1, 2, columnCount]} spacing={[6, ,8]} mb={[0, -12, -16]}>
            {
                items.map((item:IProfileCard, index:number) => {
                    return <Box key={index} mb={[0, 12, 16]}>
                        <ProfileCard
                            {...item}
                            showQualifications={showQualifications}
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
                                    <AnimateOpacity>
                                        <Image image={activeItem?.person?.image} ratio={[1 / 1]} display={['none', , 'block']} />
                                    </AnimateOpacity>
                                </Column>
                                <Column  width={[ColumnWidth.Full, ,ColumnWidth.TwoThirds]}>
                                    {
                                        (activeItem?.person?.name || !isEmptyDocument(activeItem?.detailedCompanyPosition) || activeItem?.person?.companyPosition) && <Box minHeight="50px" width={['calc(100% - 70px)', ,'100%']}>
                                            {
                                                activeItem?.person?.name && <Heading as="h2" fontWeight={500} fontSize={['21px']} lineHeight={['26px']}>
                                                    <AnimateOverflow>
                                                        {activeItem?.person?.name}
                                                    </AnimateOverflow>
                                                </Heading>
                                            }
                                            {
                                                !isEmptyDocument(activeItem?.detailedCompanyPosition) ? <Heading as="h3" fontSize={['19px']}>
                                                    <AnimateOverflow>
                                                        <StructuredContent content={activeItem?.detailedCompanyPosition} />
                                                    </AnimateOverflow>
                                                </Heading> : (activeItem?.person?.companyPosition && <Heading as="h3" fontSize={['19px']}>
                                                    <AnimateOverflow>
                                                        {activeItem?.person?.companyPosition}
                                                    </AnimateOverflow>
                                                </Heading>)
                                            }
                                            {
                                                (showQualifications && activeItem?.person?.qualifications) && <Box color="charcoalBlur" fontSize="16px" m={0}>
                                                    <AnimateOverflow>
                                                        {activeItem?.person?.qualifications}
                                                    </AnimateOverflow>
                                                </Box>
                                            }
                                        </Box>
                                    }
                                    <Divider borderColor="charcoalBlur" my={4} />
                                    {
                                        <Box display={['block', , 'none']}>
                                            <AnimateOpacity>
                                                <Image image={activeItem?.person?.image} ratio={[1 / 1]} mb={8} />
                                            </AnimateOpacity>
                                        </Box>
                                    }
                                    {
                                        !isEmptyDocument(activeItem?.description) && <Box color="charcoal">
                                            <AnimateOverflow>
                                                <StructuredContent content={activeItem?.description} />
                                            </AnimateOverflow>
                                        </Box>
                                    }
                                </Column>
                            </Row>
                            <Button pos="absolute" top={8} right={['16px', '24px', '32px']}  onClick={() => setModalOpen(false)} borderRadius="50%" border="2px solid" borderColor="oliveBlur" color="charcoal" background="transparent" w="50px" h="50px">
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
