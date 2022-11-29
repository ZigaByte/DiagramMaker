import Position from 'model/graph/position';
import Graph from 'model/graph/graph';
import ICommand from './icommand';
import IAdditive from './iadditive';

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

  Combine = (additive: ICommand): ICommand => {
    if (additive instanceof DragSelectionCommand) {
      const newCommand = new DragSelectionCommand(
        this.offset.add(additive.offset)
      );
      newCommand.previousPosition = this.previousPosition;
      return newCommand;
    }
    return this;
  };

  CanCombine = (additive: ICommand): boolean => {
    return additive instanceof DragSelectionCommand;
  };
}
