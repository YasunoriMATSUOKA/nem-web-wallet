import { Token } from '../tokens/token.model';

export type Transaction = {
  direction: 'in' | 'out' | 'both' | 'other';
  type: string;
  isConfirmed: boolean;
  isMultisig;
  fromAddress: string;
  toAddress: string | undefined;
  nativeTokenQuantity: number | undefined;
  otherTokens: Token[] | undefined;
  totalFee: Token;
  yourFee: Token;
  blockHeight: number | undefined;
  id: string;
  hash: string;
};
