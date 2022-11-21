import Node from './node';
import Connection from './connection';

export default class Graph {
  nodes: Node[] = [];

  connections: Connection[] = [];

  lastId: number = 0;

  AddNode(node: Node): void {
    node.id = this.GetNextId();
    this.nodes.push(node);
  }

  RemoveNode(node: Node): void {
    const connections = this.GetConnectitons(node);
    connections.forEach((c) => {
      this.RemoveConnection(c);
    });

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

  AddConnection(connecttion: Connection): void {
    connecttion.id = this.GetNextId();
    this.connections.push(connecttion);
  }

  RemoveConnection(connection: Connection): void {
    this.connections = this.connections.filter((n) => n !== connection);
  }

  GetConnectitons(node: Node): Connection[] {
    return this.connections.filter((c) => c.IsConnected(node));
  }

  GetAllConnectitons(): Connection[] {
    return this.connections;
  }

  ConnectSelectedNodes() {
    const selectedNodes = this.nodes.filter((n) => n.selected);
    if (selectedNodes.length === 2) {
      this.AddConnection(new Connection(selectedNodes[0], selectedNodes[1]));
    } else {
      console.log('Only allow connection of 2 nodes');
    }
  }
}
