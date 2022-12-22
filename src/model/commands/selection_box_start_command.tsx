import Graph from 'model/graph/graph';
import Position from 'model/graph/position';
import { compileFunction } from 'vm';
import ICommand from './icommand';

export default class SelectionBoxStartCommand implements ICommand {
  start: boolean;

  position: Position;

  selectedNodeIds: number[] = [];

  constructor(start: boolean, position: Position) {
    this.start = start;
    this.position = position;
  }

  Execute(graph: Graph): void {
    if (this.start) {
      graph.selectionBox.startPosition = this.position;
      graph.selectionBox.size = new Position(0, 0);
    } else {
      console.log('Adding2');
      graph.GetNodes().forEach((node) => {
        console.log(
          node,
          !graph.selection.IsSelected(node),
          graph.selectionBox.IsSelected(node)
        );
        if (
          !graph.selection.IsSelected(node) &&
          graph.selectionBox.IsSelected(node)
        ) {
          console.log('Adding');
          graph.selection.Add(node);
          this.selectedNodeIds.push(node.id);
        }
      });
    }
    graph.selectionBox.SetActive(this.start);
  }

  Undo(graph: Graph): void {
    graph.selectionBox.SetActive(!this.start);

    console.log('undoing');
    if (!this.start) {
      this.selectedNodeIds.forEach((nodeId) => {
        const node = graph.GetNode(nodeId);
        if (node !== undefined) {
          console.log('removing');
          graph.selection.Remove(node);
        }
      });
    }
  }

  Combine = (additive: ICommand): ICommand => {
    return this;
  };

  CanCombine = (additive: ICommand): boolean => {
    return false;
  };

  StopsUndo = (): boolean => {
    return this.start;
  };

  StopsRedo = (): boolean => {
    return false;
  };
}
