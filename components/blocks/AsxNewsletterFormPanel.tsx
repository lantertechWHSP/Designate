import React, {ReactNode} from 'react';
import { IBlock } from '~/interfaces/util/block';
import ContentBlock from '~/components/blocks/Content';
import { YourIR } from 'yourir-next';
import { Column, Row, ColumnWidth } from '~/components/elements/grid/grid';
import { Box, Heading, Input, Button, Flex } from '@chakra-ui/react';

interface IAsxNewsletterFormPanelBlock extends IBlock {
}

const AsxNewsletterFormPanelBlock:any = ({}:IAsxNewsletterFormPanelBlock) : ReactNode => {
    return <ContentBlock background="darkBrown">
        <Row justify="center" textAlign="center">
            <Column width={[ColumnWidth.Full, , ColumnWidth.TenTwelfths]}>
                <Heading as="h2" fontSize={['36px']} lineHeight={['42px']} fontWeight={500} color="white" mb={8}>
                    Subscribe for the latest ASX notifications straight to your inbox
                </Heading>
            </Column>
        </Row>
        <Row justify="center">
            <Column width={[ColumnWidth.Full, ColumnWidth.Half, ColumnWidth.FourTwelvfths]}>
                <Box as={YourIR}>
                    <form data-yourir="mailList">
                        <Flex direction="column" align="center">
                            <Input background="whiteBlur2"
                                height="50px"
                                border="1px solid"
                                borderColor="white"
                                borderRadius="4px"
                                lineHeight="50px"
                                color="white"
                                _placeholder={{
                                    color: 'whiteBlur'
                                }}
                                px={2}
                                py={0}
                                mb={4}
                                width="100%"
                                type="text" size="50" data-yourir="emailAddress" placeholder="Email Address" />
                            {/*<input type="checkbox" data-yourir="groups.Announcements" /> Get alerted on all market announcements*/}
                            {/*<input type="checkbox" data-yourir="groups.Prices" /> Receive our closing prices daily*/}
                            <div data-yourir="result" />
                            <Button data-yourir="subscribe"
                                mt={4}
                                minWidth={['unset', ,'300px']}
                                borderRadius="4px"
                                height="50px" lineHeight="50px" background="white">Subscribe</Button>
                        </Flex>

                    </form>
                </Box>
            </Column>
        </Row>
    </ContentBlock>;
};

export default AsxNewsletterFormPanelBlock;
