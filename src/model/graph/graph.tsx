import Node from './node';

export default class Graph {
  nodes: Node[] = [];

  AddNode(node: Node): void {
    this.nodes.push(node);
  }

  RemoveNode(node: Node): void {
    this.nodes = this.nodes.filter((n) => n !== node);
  }

  GetNodes(): Node[] {
    return this.nodes;
  }
}
