import Graph from 'model/graph/graph';
import Position from 'model/graph/position';
import ICommand from './icommand';

export default class SelectionBoxDragCommand implements ICommand {
  offset: Position;

  constructor(offset: Position) {
    this.offset = offset;
  }

  Execute(graph: Graph): void {
    if (graph.selectionBox.active) {
      graph.selectionBox.size = graph.selectionBox.size.add(this.offset);
    }
  }

  Undo(graph: Graph): void {
    graph.selection.offset = this.offset;
  }

  Combine = (command: ICommand): ICommand => {
    if (command instanceof SelectionBoxDragCommand) {
      const newCommand = new SelectionBoxDragCommand(
        this.offset.add(command.offset)
      );
      return newCommand;
    }
    return this;
  };

  CanCombine = (command: ICommand): boolean => {
    return command instanceof SelectionBoxDragCommand;
  };

  StopsUndo = (): boolean => {
    return false;
  };

  StopsRedo = (): boolean => {
    return false;
  };
}
