import { Node } from '../nodes/node.model';
import { restNodes } from './rest-nodes';
import { environment } from '../../../environments/environment';

const port = environment.isHttps ? 7779 : 7778;

export const webSocketNodes: Node[] = restNodes.map((node) => {
  return {
    protocol: node.protocol,
    domain: node.domain,
    port: port,
  };
});
