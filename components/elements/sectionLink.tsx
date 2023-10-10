import { Link, IDatoLink } from "~/components/elements/link";
import { Flex, Text } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';

interface ISectionLink extends IDatoLink {
}

export const SectionLink:any = ({ ...props }:ISectionLink) => {
    return <Link {...props}>
        <Flex align="center"
            display="inline-flex"
            borderBottom="1px solid"
            borderColor="skyBlue"
            py="3px">
            <Text as="span" mr={2}>
                {props.children}
            </Text>
            <Icon icon={Icons.ChevronRight} />
        </Flex>
    </Link>;
};
