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

interface IProfilesPanelBlock extends IBlock {
    items:IProfileCard[];
}

export const ProfilesPanelBlock:any = ({ items }:IProfilesPanelBlock) : ReactNode => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState<IProfileCard>(null);

    const onProfileClick:any = (index:number) : void => {
        setActiveItem(items[index]);
        setModalOpen(true);
    };

    return (Array.isArray(items) && items.length > 0) && <Box py={[6, 8, 12]}>
        <Container>
            <SimpleGrid columns={[1, 2, 3]} spacing={[0, 8, 8]} mb={-8}>
                {
                    items.map((item:IProfileCard, index:number) => {
                        return <Box mb={[0, ,8]} key={index}>
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
                                        <Image image={activeItem?.image} ratio={[1 / 1]} display={['none', , 'block']} />
                                    </Column>
                                    <Column  width={[ColumnWidth.Full, ,ColumnWidth.TwoThirds]}>
                                        {
                                            (activeItem?.person?.name || activeItem?.person?.companyPosition) && <Box minHeight="50px">
                                                {
                                                    activeItem?.person?.name && <Heading as="h2" fontWeight={500} fontSize={['21px']} lineHeight={['26px']}>
                                                        {activeItem?.person?.name}
                                                    </Heading>
                                                }
                                                {/*{*/}
                                                {/*    !isEmptyDocument(activeItem?.companyPosition) && <Heading as="h3" fontSize={['19px']}>*/}
                                                {/*        <StructuredContent content={activeItem.companyPosition} />*/}
                                                {/*    </Heading>*/}
                                                {/*}*/}
                                                {/*{*/}
                                                {/*    activeItem?.qualifications && <Text color="oliveBlur" m={0}>*/}
                                                {/*        {activeItem?.qualifications}*/}
                                                {/*    </Text>*/}
                                                {/*}*/}
                                            </Box>
                                        }
                                        <Divider borderColor="oliveBlur" my={4} />
                                        {
                                            <Box maxWidth="400px" display={['block', , 'none']}>
                                                <Image image={activeItem?.image} ratio={[1 / 1]} mb={8} />
                                            </Box>
                                        }
                                        {
                                            activeItem?.description && <Box>
                                                <StructuredContent content={activeItem?.description} />
                                            </Box>
                                        }
                                    </Column>
                                </Row>
                                <Button pos="absolute" top={8} right={8} onClick={() => setModalOpen(false)} borderRadius="50%" border="2px solid" borderColor="oliveBlur" background="transparent" w="50px" h="50px">
                                    <Icon icon={Icons.Cross} w={16} h={16} />
                                </Button>
                            </Container>
                        </Box>
                    </ModalContent>
                </Modal>
            }
        </Container>
    </Box>;
};

export default ProfilesPanelBlock;
