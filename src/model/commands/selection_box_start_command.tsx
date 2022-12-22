import Graph from 'model/graph/graph';
import Position from 'model/graph/position';
import ICommand from './icommand';

export default class SelectionBoxStartCommand implements ICommand {
  start: boolean;

  position: Position;

  constructor(start: boolean, position: Position) {
    this.start = start;
    this.position = position;
  }

  Execute(graph: Graph): void {
    graph.selectionBox.SetActive(this.start);
    graph.selectionBox.startPosition = this.position;
    graph.selectionBox.size = new Position(0, 0);
  }

  Undo(graph: Graph): void {
    graph.selectionBox.SetActive(!this.start);
  }

  Combine = (additive: ICommand): ICommand => {
    return this;
  };

  CanCombine = (additive: ICommand): boolean => {
    return false;
  };

  StopsUndo = (): boolean => {
    return false;
  };

  StopsRedo = (): boolean => {
    return false;
  };
}
