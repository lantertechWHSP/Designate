import React, { ReactNode, useState } from 'react';
import { IBlock } from '~/interfaces/util/block';
import StructuredContent from '~/components/StructuredContent';
import { Image } from "~/components/elements/image";
import { Icon, Icons } from "~/components/elements/icon";
import { Box, Text, Container, SimpleGrid, Heading, Modal, ModalOverlay, ModalContent, Button, Divider } from '@chakra-ui/react';
import { IPerson } from '~/interfaces/models/person';
import ProfileCard from '~/components/blocks/ProfilesPanel/ProfileCard';
import { Row, Column, ColumnWidth } from '~/components/elements/grid/grid';

interface IProfilesPanelBlock extends IBlock {
    people:IPerson[];
}

export const ProfilesPanelBlock:any = ({ people }:IProfilesPanelBlock) : ReactNode => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [activePerson, setActivePerson] = useState<IPerson>(null);

    const onProfileClick:any = (index:number) : void => {
        setActivePerson(people[index]);
        setModalOpen(true);
    };

    return <Box py={[6, 8, 12]}>
        <Container>
            <SimpleGrid columns={[1, 2, 4]} spacing={[0, 8, 8]}>
                {
                    (Array.isArray(people) && people.length > 0) && people.map((person:IPerson, index:number) => {
                        return (
                            <ProfileCard
                                key={index}
                                {...person}
                                onClick={() => {
                                    onProfileClick(index);
                                }}
                            />
                        );
                    })
                }
            </SimpleGrid>
            {
                <Modal isOpen={modalOpen} size="full"  onClose={() => setModalOpen(false)}>
                    <ModalOverlay />
                    <ModalContent minWidth="100vw" minHeight="100vh" background="brownGrey">
                        <Box my={8}>
                            <Container>
                                <Row>
                                    <Column width={[ColumnWidth.None, ,ColumnWidth.OneThird]}>
                                        <Image image={activePerson?.image} ratio={[1 / 1]} display={['none', , 'block']} />
                                    </Column>
                                    <Column  width={[ColumnWidth.Full, ,ColumnWidth.TwoThirds]}>
                                        {
                                            (activePerson?.name || activePerson?.companyPosition || activePerson?.qualifications) && <Box minHeight="50px">
                                                {
                                                    activePerson?.name && <Heading as="h2" fontWeight={500} fontSize={['21px']} lineHeight={['26px']}>
                                                        {activePerson.name}
                                                    </Heading>
                                                }
                                                {
                                                    activePerson?.companyPosition && <Heading as="h3" fontSize={['19px']}>
                                                        {activePerson.companyPosition}
                                                    </Heading>
                                                }
                                                {
                                                    activePerson?.qualifications && <Text color="darkBrownBlur" m={0}>
                                                        {activePerson?.qualifications}
                                                    </Text>
                                                }
                                            </Box>
                                        }
                                        <Divider borderColor="darkBrownBlur" my={4} />
                                        {
                                            <Box maxWidth="400px" display={['block', , 'none']}>
                                                <Image image={activePerson?.image} ratio={[1 / 1]} mb={8} />
                                            </Box>
                                        }
                                        {
                                            activePerson?.description && <Box>
                                                <StructuredContent content={activePerson?.description} />
                                            </Box>
                                        }
                                    </Column>
                                </Row>
                                <Button pos="absolute" top={8} right={8} onClick={() => setModalOpen(false)} borderRadius="50%" border="2px solid" borderColor="darkBrownBlur" background="transparent" w="50px" h="50px">
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
