import { assert } from 'console';
import Node from './node';

export default class Connection {
  id: number = -1;

  node1: Node;

  node2: Node;

  constructor(node1: Node, node2: Node) {
    assert(node1 !== node2, 'Cannot connect to self');
    assert(node1 !== undefined, 'Node1 undefined');
    assert(node2 !== undefined, 'Node2 undefined');

    this.node1 = node1;
    this.node2 = node2;
  }

  GetNodes(): Node[] {
    return [this.node1, this.node2];
  }

  Connects(node1: Node, node2: Node) {
    return (
      (node1 === this.node1 && node2 === this.node2) ||
      (node2 === this.node1 && node1 === this.node2)
    );
  }

  IsConnected(node: Node) {
    return node === this.node1 || node === this.node2;
  }
}
