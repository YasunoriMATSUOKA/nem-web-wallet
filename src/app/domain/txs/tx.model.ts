import { Token } from '../tokens/token.model';
import { TransferTransaction, SignedTransaction } from 'nem-library';

export type Tx = {
  direction: 'in' | 'out' | 'both' | 'other' | undefined;
  type:
    | 'TRANSFER_WITHOUT_MESSAGE'
    | 'TRANSFER_WITH_PLAIN_MESSAGE'
    | 'OTHER'
    | undefined;
  fromAddress: string | undefined;
  toAddress: string | undefined;
  nativeTokenQuantity: number | undefined;
  otherTokens: Token[] | undefined;
  plainMessage: string | undefined;
  unsignedTxData: TransferTransaction | undefined;
  signedTxData: SignedTransaction | undefined;
};
