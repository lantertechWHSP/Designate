import React, { ReactNode, useState } from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { Box, Container, SimpleGrid, Flex, Text, Modal, ModalOverlay, ModalContent, Heading, Button } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';
import { Icon, Icons } from "~/components/elements/icon";

export async function getStaticProps({ preview }) : Promise<any> {
    const slug = 'about/management';
    const site = await doQuery(queries.site);
    const page = await doQuery(queries.page, { slug }, preview).then(
        ({ page }) => page
    );

    const layout = getLayoutData(site, page, preview);
    const blocks = await getBlocks(page);
    const people = await doQuery(queries.people, {}, preview).then(
        ({ people }) => people || []
    );

    return { props: { layout, blocks, people } };
}

const ProfileCard = ({ image, name, onClick }) : ReactNode => {
    return <Box>
        <Image image={image} ratio={[1 / 1]} onClick={onClick}/>
        <Text>
            {name}
        </Text>
    </Box>;
};

const Profiles = ({ people }) : ReactNode => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activePerson, setActivePerson] = useState(null);

    const onProfileClick = (index) : void => {
        setActivePerson(people[index]);
        setModalOpen(true);
    };

    return <Box>
        <Container>
            <SimpleGrid columns={[1, 2, 4]} spacing={8}>
                {
                    (Array.isArray(people) && people.length > 0) && people.map((person, index:number) => {
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
                                <Box px={4}>
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
                                                activePerson?.companyPosition && <Heading as="h3" variant="h3" fontWeight={400} color="grey">
                                                    {activePerson.companyPosition}
                                                </Heading>
                                            }
                                        </Box>
                                    }
                                    {
                                        activePerson?.description && <Box color="white" style={{ whiteSpace: 'pre-wrap' }}>
                                            {activePerson.description}
                                        </Box>
                                    }
                                </Box>
                                <Button pos="absolute" top={8} right={8} onClick={() => setModalOpen(false)}>
                                    <Icon icon={Icons.Cross} />
                                </Button>
                            </Flex>
                        </Container>
                    </Box>
                </ModalContent>
            </Modal>
        </Container>
    </Box>;
};

const ManagementPage : NextPage = ({layout, blocks, people}:any)  : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
            <Profiles people={people} />
        </Layout>
    );
};

export default ManagementPage;
