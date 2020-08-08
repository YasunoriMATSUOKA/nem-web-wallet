import { Node } from './node.model';
import { environment } from '../../../environments/environment';

const protocol = environment.isHttps ? 'https' : 'http';
const port = environment.isHttps ? 7891 : 7890;

export const restNodes: Node[] = [
  {
    protocol: protocol,
    domain: 'aqualife1.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'aqualife2.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'aqualife3.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'beny.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'mnbhsgwbeta.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'mnbhsgwgamma.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'nemstrunk.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'nemstrunk2.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'mttsukuba.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'pegatennnag.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'shibuya.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'thomas1.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'xemcat.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'snnode.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'nemlovely1.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'nemlovely2.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'nemlovely3.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'nemlovely4.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'nemlovely5.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'nemlovely6.supernode.me',
    port: port,
  },
  {
    protocol: protocol,
    domain: 'nemlovely7.supernode.me',
    port: port,
  },
];
