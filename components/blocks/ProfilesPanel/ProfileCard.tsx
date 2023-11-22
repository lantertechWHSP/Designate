import { ReactNode } from 'react';
import { Flex, Box, Heading, Text, Image, AspectRatio } from '@chakra-ui/react';
import { SectionLink } from '~/components/elements/sectionLink';
import { IPerson } from '~/interfaces/models/person';
import { IStructuredText } from '~/interfaces/util/structuredText';
import { AnimateOpacity } from '~/components/elements/animation/AnimateOpacity';
import {AnimateOverflow} from "~/components/elements/animation/AnimateOverflow";

export interface IProfileCard {
    person?:IPerson;
    showQualifications?:boolean;
    detailedCompanyPosition?:IStructuredText;
    description?:IStructuredText;
    onClick:() => any;
}

const ProfileCard:any = ({ person, showQualifications = false, onClick }:IProfileCard) : ReactNode => {
    return <Flex direction="column" minHeight="100%">
        <Box mb={4} onClick={onClick} cursor="pointer">
            <AnimateOpacity>
                {
                    person?.image?.url ? <Image src={`${person?.image?.url}?auto=format&fit=crop&w=424&h=310`} /> : <AspectRatio ratio={[424 / 310]} >
                        <Box background="lightGrey" />
                    </AspectRatio>
                }
            </AnimateOpacity>
        </Box>
        {
            person?.name && <Heading as="h3" fontSize={['20px', , ,'21px']} lineHeight={['26px']} fontWeight={500}>
                <AnimateOverflow>
                    {person.name}
                </AnimateOverflow>
            </Heading>
        }
        {
            person?.companyPosition && <Heading as="h4" fontSize={['18px', , ,'19px']} lineHeight={['26px', , ,'28px']} color="steel" fontWeight={400}>
                <AnimateOverflow>
                    {person?.companyPosition}
                </AnimateOverflow>
            </Heading>
        }
        {
            showQualifications && person?.qualifications && <Box fontSize={['16px']} color="oliveBlur">
                <AnimateOverflow>
                    {person.qualifications}
                </AnimateOverflow>
            </Box>
        }
        <Box flex="1" />
        {
            <Box mt={[4, ,6, 8]}>
                <AnimateOverflow>
                    <SectionLink onClick={onClick} href="javacript:void(0)">
                        Read More
                    </SectionLink>
                </AnimateOverflow>
            </Box>
        }
    </Flex>;
};

export default ProfileCard;
