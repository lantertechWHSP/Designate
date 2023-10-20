import { Link, IDatoLink } from "~/components/elements/link";
import { Flex, Text } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';

interface ISectionLink extends IDatoLink {
}

export const SectionLink:any = ({ ...props }:ISectionLink) => {
    return <Link {...props} color="darkBrown">
        <SectionLinkInner>
            {props.children}
        </SectionLinkInner>
    </Link>;
};

export const SectionLinkInner:any = ({ children }) => {
    return <Flex align="center"
        display="inline-flex"
        borderBottom="1px solid"
        borderColor="darkBrownBlur"
        fontWeight={700}>
        <Text as="span" mr={2}>
            {children}
        </Text>
        <Icon icon={Icons.ChevronRight} w={12} h={12} />
    </Flex>;
};

export const SectionLinkButton:any = ({ color = 'darkBrown', borderColor = 'darkBrownBlur', ...props }:ISectionLink) => {
    return <Link {...props}
        display="block"
        color={color}
        height={['40px', ,'50px']}
        lineHeight={['40px', ,'50px']}
        borderRadius={['20px', ,'25px']}
        px={4}
        border="1px solid"
        borderColor={borderColor}
        textAlign="center"
        width={['120px', ,'200px']}
        fontWeight={700}>
    </Link>;
};
