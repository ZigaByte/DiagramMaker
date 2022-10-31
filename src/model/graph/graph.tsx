import Node from './node';

export default class Graph {
  nodes: Node[] = [];

  AddNode(node: Node): void {
    node.id = this.GetNextId();
    this.nodes.push(node);
  }

  RemoveNode(node: Node): void {
    this.nodes = this.nodes.filter((n) => n !== node);
  }

  GetNodes(): Node[] {
    return this.nodes;
  }

  GetNextId(): number {
    // Maybe not the best
    if (this.nodes.length > 0) {
      return this.nodes[this.nodes.length - 1].id + 1;
    }
    return 1;
  }
}
