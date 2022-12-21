import Selection from 'model/selection/selection';
import GraphOffset from 'model/selection/graph_offset';
import SelectionBox from 'model/selection/selection_box';
import Node from './node';
import Connection from './connection';

export default class Graph {
  graph_offset: GraphOffset = new GraphOffset();

  selection: Selection = new Selection();

  selectionBox: SelectionBox = new SelectionBox();

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
    return this.nodes.find((node) => node.id === id);
  }

  GetNodes(): Node[] {
    return this.nodes;
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
    const displayNode = new Node(
      node.id,
      node.position
        .add(this.selection.GetOffset(node))
        .add(this.graph_offset.GetOffset()),
      node.text
    );
    displayNode.selected = this.selection.IsSelected(node);
    displayNode.dragging = displayNode.selected && this.selection.dragging;
    displayNode.editing = node.editing;
    return displayNode;
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

  EditingAnyNode(): boolean {
    return this.nodes.some((node) => node.editing);
  }
}
