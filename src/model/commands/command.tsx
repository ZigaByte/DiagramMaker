interface Command {
  Apply(graph: Graph): void;
  Undo(graph: Graph): void;
}
