import { Link, IDatoLink } from "~/components/elements/link";
import { Flex, Text } from '@chakra-ui/react';
import { Icon, Icons } from '~/components/elements/icon';

interface ISectionLink extends IDatoLink {
    color?:string;
    borderColor?:string;
    borderColorHover?:string;
}

export const UnderlineLink:any = ({ color = 'olive', borderColor = 'oliveBlur2', ...props }:ISectionLink) => {
    return <Link
        {...props}
        color={color}
        display="inline"
        borderBottom="2px solid"
        borderColor={borderColor}
        transition="border-color 0.3s linear"
        _hover={{
            borderColor: color
        }}>
        {props.children}
    </Link>;
};

export const SectionLink:any = ({ ...props }:ISectionLink) => {
    return <Link {...props}>
        <SectionLinkInner>
            {props.children}
        </SectionLinkInner>
    </Link>;
};

export const SectionLinkInner:any = ({ children }) => {
    return <Flex align="center"
        className="sectionLink-inner"
        display="inline-flex"
        borderBottom="2px solid"
        borderColor="oliveBlur2"
        transition="border-color 0.3s linear"
        _hover={{
            borderColor: 'olive'
        }}
        color="olive"
        fontSize={["16px"]}
        fontWeight={700}>
        <Text as="span" mr={2}>
            {children}
        </Text>
        <Icon icon={Icons.ChevronRight} w={12} h={12} />
    </Flex>;
};

export const SectionLinkButton:any = ({ color = 'olive', borderColor = 'oliveBlur2', borderColorHover = 'olive', ...props }:ISectionLink) => {
    return <Link {...props}
        display="block"
        color={color}
        height={['40px', ,'50px']}
        lineHeight={['40px', ,'50px']}
        borderRadius={['20px', ,'25px']}
        px={4}
        border="2px solid"
        borderColor={borderColor}
        textAlign="center"
        width={['120px', ,'180px']}
        transition="border-color 0.3s linear"
        fontSize={["16px"]}
        _hover={{
            borderColor: borderColorHover
        }}
        fontWeight={700}>
    </Link>;
};
