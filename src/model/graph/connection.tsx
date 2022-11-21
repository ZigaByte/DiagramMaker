import Node from './node';

export default class Connection {
  node1: Node;

  node2: Node;

  constructor(node1: Node, node2: Node) {
    this.node1 = node1;
    this.node2 = node2;
  }

  GetNodes(): Node[] {
    return [this.node1, this.node2];
  }
}
