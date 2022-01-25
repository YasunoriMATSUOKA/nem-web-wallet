import { Node } from './node.model';
import { environment } from '../../../environments/environment';

const protocol = environment.isHttps ? 'https' : 'http';
const port = environment.isHttps ? 7891 : 7890;

export const restNodes: Node[] = [
  {
    protocol: protocol,
    domain: 'nem-sakura-16.next-web-technology.com',
    port: port,
  },
  {
    protocol: protocol,
    domain: '00b21efd.xem.stir-hosyu.com',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'super-nem.love',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'nis1.harvestasya.com',
    port: port,
  },
];
