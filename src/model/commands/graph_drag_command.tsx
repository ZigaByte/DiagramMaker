import Position from 'model/graph/position';
import Graph from 'model/graph/graph';
import ICommand from './icommand';

export default class GraphDragCommand implements ICommand {
  offset: Position;

  constructor(offset: Position) {
    this.offset = offset;
  }

  Execute(graph: Graph): void {
    if (graph.graph_offset.dragging) {
      graph.graph_offset.offset = graph.graph_offset.offset.add(this.offset);
    }
  }

  Undo(graph: Graph): void {
    graph.graph_offset.offset = this.offset;
  }

  Combine = (command: ICommand): ICommand => {
    if (command instanceof GraphDragCommand) {
      const newCommand = new GraphDragCommand(this.offset.add(command.offset));
      return newCommand;
    }
    return this;
  };

  CanCombine = (command: ICommand): boolean => {
    return command instanceof GraphDragCommand;
  };

  StopsUndo = (): boolean => {
    return false;
  };

  StopsRedo = (): boolean => {
    return false;
  };
}
