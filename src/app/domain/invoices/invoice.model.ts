import { Token } from '../tokens/token.model';

export type Invoice = {
  toAddress: string;
  nativeTokenQuantity: number;
  tokens: Token[] | undefined;
  isMessageEncrypted: boolean;
  message: string | undefined;
};
