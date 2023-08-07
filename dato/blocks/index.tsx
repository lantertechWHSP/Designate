import { textRecord } from "~/dato/blocks/text";

export const blocks = `
  blocks {
    ... on TextRecord {
      ${textRecord}
    }
  }  
`;
