import Position from 'model/graph/position';
import Graph from 'model/graph/graph';
import ICommand from './icommand';

export default class DragSelectionCommand implements ICommand {
  offset: Position;

  constructor(offset: Position) {
    this.offset = offset;
  }

  Execute(graph: Graph): void {
    if (graph.selection.dragging) {
      graph.selection.offset = graph.selection.offset.add(this.offset);
    }
  }

  Undo(graph: Graph): void {
    graph.selection.offset = this.offset;
  }

  Combine = (command: ICommand): ICommand => {
    if (command instanceof DragSelectionCommand) {
      const newCommand = new DragSelectionCommand(
        this.offset.add(command.offset)
      );
      return newCommand;
    }
    return this;
  };

  CanCombine = (command: ICommand): boolean => {
    return command instanceof DragSelectionCommand;
  };

  StopsUndo = (): boolean => {
    return false;
  };
}
