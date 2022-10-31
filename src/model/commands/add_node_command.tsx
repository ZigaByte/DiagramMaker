class AddNodeCommand implements Command {
  position: Position;

  newNode: Node = null;

  constructor(position: Position) {
    super();
    this.position = position;
  }

  Apply(graph: Graph): void {}
  Undo(graph: Graph): void {}
}
