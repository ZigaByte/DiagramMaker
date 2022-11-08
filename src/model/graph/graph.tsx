import Node from './node';

export default class Graph {
  nodes: Node[] = [];

  lastId: number = 0;

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

  GetNode(id: number): Node | undefined {
    return this.nodes.find((node) => node.id === id);
  }

  GetNextId(): number {
    this.lastId += 1;
    return this.lastId;
  }
}
