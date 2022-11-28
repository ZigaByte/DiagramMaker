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

  GetNodes(): Node[] {
    return this.nodes.map(
      (n) =>
        new Node(
          n.id,
          n.position.add(this.selection.GetOffset(n)),
          n.text,
          this.selection.IsSelected(n)
        )
    );
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

  GetAllConnectitons(): Connection[] {
    return this.connections;
  }
}
