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
              fontWeight={700}>
            <Text as="span" mr={2}>
                {props.children}
            </Text>
            <Icon icon={Icons.ChevronRight} w={12} h={12} />
        </Flex>
    </Link>;
};

export const SectionLinkButton:any = ({ ...props }:ISectionLink) => {
    return <Link {...props}
                 color="darkBrown"
                 height="50px"
                 lineHeight="50px"
                 borderRadius="25px"
                 px={4}
                 border="1px solid"
                 borderColor="darkBrownBlur"
                 textAlign="center"
                 minWidth="200px"
                 fontWeight={700}>
    </Link>;
};
