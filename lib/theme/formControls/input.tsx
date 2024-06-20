import { createMultiStyleConfigHelpers} from '@chakra-ui/react';
import { inputAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle } = createMultiStyleConfigHelpers(inputAnatomy.keys);

export const inputPartsStyle = definePartsStyle;