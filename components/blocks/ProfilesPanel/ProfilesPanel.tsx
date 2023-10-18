import React, { ReactNode, useState } from 'react';
import { Image } from "~/components/elements/image";
import { Icon, Icons } from "~/components/elements/icon";
import { Box, Flex, Container, SimpleGrid, Heading, Modal, ModalOverlay, ModalContent, Button } from '@chakra-ui/react';
import { IPerson } from '~/interfaces/models/person';
import ProfileCard from '~/components/blocks/ProfilesPanel/ProfileCard';

interface IProfilesPanelBlock {
    people:IPerson[];
}

export const ProfilesPanelBlock:any = ({ people }:IProfilesPanelBlock) : ReactNode => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [activePerson, setActivePerson] = useState<IPerson>(null);

    const onProfileClick:any = (index:number) : void => {
        setActivePerson(people[index]);
        setModalOpen(true);
    };

    return <Box py={8}>
        <Container>
            <SimpleGrid columns={[1, 2, 4]} spacing={[6, 8, 12]}>
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
            <Modal isOpen={modalOpen} size="full"  onClose={() => setModalOpen(false)}>
                <ModalOverlay />
                <ModalContent minWidth="100vw" minHeight="100vh" background="steelBlue">
                    <Box my={8}>
                        <Container>
                            <Flex mx={-4}>
                                <Box px={4} display={['none', , , 'block']}>
                                    <Box w={['500px']}>
                                        <Image image={activePerson?.image} ratio={[1 / 1]} />
                                    </Box>
                                </Box>
                                <Box px={4}>
                                    {
                                        (activePerson?.name || activePerson?.companyPosition) && <Box mb={6}>
                                            {
                                                activePerson?.name && <Heading as="h2" variant="h2" fontWeight={400} color="white">
                                                    {activePerson.name}
                                              </Heading>
                                            }
                                            {
                                                activePerson?.companyPosition && <Heading as="h3" variant="h3" fontWeight={400} color="lightGrey">
                                                    {activePerson.companyPosition}
                                              </Heading>
                                            }
                                      </Box>
                                    }
                                    {
                                        <Image image={activePerson?.image} ratio={[1 / 1]} mb={8} display={['block', , , 'none']} />
                                    }
                                    {
                                        activePerson?.description && <Box color="white" style={{ whiteSpace: 'pre-wrap' }}>
                                            {activePerson.description}
                                      </Box>
                                    }
                                </Box>
                                <Button pos="absolute" top={8} right={8} onClick={() => setModalOpen(false)} borderRadius="50%" background="lightGrey" w="44px" h="44px">
                                    <Icon icon={Icons.Cross} w={24} h={24} />
                                </Button>
                            </Flex>
                        </Container>
                    </Box>
                </ModalContent>
            </Modal>
        </Container>
    </Box>;
};

export default ProfilesPanelBlock;
