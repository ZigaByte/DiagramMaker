import Graph from '../graph/graph';

export default interface ICommand {
  Execute(graph: Graph): void;
  Undo(graph: Graph): void;
}
