import { Invoice } from './invoice.model';

export const undefinedInvoice: Invoice = {
  toAddress: '',
  nativeTokenQuantity: 0,
  tokens: undefined,
  isMessageEncrypted: false,
  message: undefined,
};
