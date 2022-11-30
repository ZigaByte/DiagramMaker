import Graph from '../graph/graph';

export default interface ICommand {
  // TODO: Add IsValid
  Combine(additive: ICommand): ICommand;
  CanCombine(additive: ICommand): boolean;

  Execute(graph: Graph): void;
  Undo(graph: Graph): void;
  StopsUndo(): boolean;
}
