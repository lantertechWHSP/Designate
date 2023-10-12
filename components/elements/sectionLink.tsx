import { Link, IDatoLink } from "~/components/elements/link";
import { Flex, Text } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';

interface ISectionLink extends IDatoLink {
}

export const SectionLink:any = ({ ...props }:ISectionLink) => {
    return <Link {...props} color="darkBrown">
        <Flex align="center"
              display="inline-flex"
              borderBottom="1px solid"
              borderColor="darkBrownBlur"
              fontWeight={700}
              py="3px">
            <Text as="span" mr={2}>
                {props.children}
            </Text>
            <Icon icon={Icons.ChevronRight} w={12} h={12} />
        </Flex>
    </Link>;
};
