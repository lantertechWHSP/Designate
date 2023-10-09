import { Link, IDatoLinkProps } from "~/components/elements/link";
import { Flex, Text } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';

interface ISectionLinkProps extends IDatoLinkProps {
}

export const SectionLink:any = ({ ...props }:ISectionLinkProps) => {
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
