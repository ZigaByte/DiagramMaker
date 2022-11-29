import Position from 'model/graph/position';
import Graph from 'model/graph/graph';
import ICommand from './icommand';

export default class DragSelectionCommand implements ICommand, IAdditive {
  offset: Position;

  previousPosition?: Position;

  constructor(offset: Position) {
    this.offset = offset;
    this.previousPosition = undefined;
  }

  Execute(graph: Graph): void {
    if (graph.selection.dragging) {
      this.previousPosition = graph.selection.offset;
      graph.selection.offset = graph.selection.offset.add(this.offset);
    }
  }

  Undo(graph: Graph): void {
    graph.selection.offset = this.previousPosition!;
  }

  Combine = (command: ICommand): ICommand => {
    console.log(this);
    console.log(command);
    if (command instanceof DragSelectionCommand) {
      const newCommand = new DragSelectionCommand(
        this.offset.add(command.offset)
      );
      newCommand.previousPosition = this.previousPosition;
      console.log(newCommand);
      return newCommand;
    }
    return this;
  };

  CanCombine = (command: ICommand): boolean => {
    console.log(command instanceof DragSelectionCommand);
    return command instanceof DragSelectionCommand;
  };
}
