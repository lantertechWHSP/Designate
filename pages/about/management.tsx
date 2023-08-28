import React from 'react';
import type { NextPage } from 'next';
import Layout from '~/components/layouts/Layout';
import { ModularContent } from '~/components/ModularContent';
import { doQuery, queries } from '~/dato/api';
import { getLayoutData, getBlocks } from '~/lib/utils';
import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react';
import { Image } from '~/components/elements/image';

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

const ProfileCard = ({ image, name }) => {
    return <Box>
        <Image image={image} ratio={[1 / 1]}/>
        <Text>
            {name}
        </Text>
    </Box>
}

const Profiles = ({ people }) => {
    return <Box>
        <Container>
            <SimpleGrid columns={[1, 2, 4]} spacing={8}>
                {
                    (Array.isArray(people) && people.length > 0) && people.map((person, index:number) => {
                        return (
                            <ProfileCard
                                key={index}
                                {...person}
                            />
                        )
                    })
                }
            </SimpleGrid>
        </Container>
    </Box>
}

const ManagementPage : NextPage = ({layout, blocks, people}:any)  : JSX.Element => {
    return (
        <Layout layout={layout}>
            <ModularContent content={blocks} />
            <Profiles people={people} />
        </Layout>
    );
};

export default ManagementPage;
