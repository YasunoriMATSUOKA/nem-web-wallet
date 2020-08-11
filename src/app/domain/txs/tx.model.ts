import { Token } from '../tokens/token.model';

export type Tx = {
  direction: 'in' | 'out' | 'both' | 'other';
  type: string;
  isConfirmed: boolean;
  isMultisig: boolean;
  fromAddress: string;
  toAddress: string | undefined;
  nativeTokenQuantity: number | undefined;
  otherTokens: Token[] | undefined;
  totalFee: Token | undefined;
  yourFee: Token | undefined;
  blockHeight: number | undefined;
  id: string;
  hash: string;
};
