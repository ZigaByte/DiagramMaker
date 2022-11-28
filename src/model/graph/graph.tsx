import Selection from 'model/selection/selection';
import Node from './node';
import Connection from './connection';

export default class Graph {
  selection: Selection = new Selection();

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

  GetNode(id: number): Node | undefined {
    // TODO: This should present the current position, combined with the selection offsets.
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

  GetDisplayNode(node: Node): Node {
    return new Node(
      node.id,
      node.position.add(this.selection.GetOffset(node)),
      node.text,
      this.selection.IsSelected(node)
    );
  }

  GetDisplayConnection(connection: Connection): Connection {
    return new Connection(
      connection.id,
      this.GetDisplayNode(connection.node1),
      this.GetDisplayNode(connection.node2)
    );
  }

  GetDisplayConnections(): Connection[] {
    return this.connections.map((c) => this.GetDisplayConnection(c));
  }

  GetDisplayNodes(): Node[] {
    return this.nodes.map((n) => this.GetDisplayNode(n));
  }
}
