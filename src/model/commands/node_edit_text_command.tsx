import Graph from 'model/graph/graph';
import ICommand from './icommand';

export default class NodeEditTextCommand implements ICommand {
  nodeId: number;

  newText: string;

  oldText?: string;

  constructor(nodeId: number, newText: string) {
    this.nodeId = nodeId;
    this.newText = newText;
  }

  Execute(graph: Graph): void {
    const node = graph.GetNode(this.nodeId);
    if (node !== undefined) {
      this.oldText = node.text;
      node.text = this.newText;
      node.editing = true;
    }
  }

  Undo(graph: Graph): void {
    const node = graph.GetNode(this.nodeId);
    if (node !== undefined) {
      node.editing = false;
      if (this.oldText !== undefined) {
        node.text = this.oldText;
      }
    }
  }

  Combine = (command: ICommand): ICommand => {
    if (
      command instanceof NodeEditTextCommand &&
      command.nodeId === this.nodeId
    ) {
      const newCommand = new NodeEditTextCommand(this.nodeId, command.newText);
      newCommand.oldText = this.oldText;
      return newCommand;
    }
    return this;
  };

  CanCombine = (command: ICommand): boolean => {
    return (
      command instanceof NodeEditTextCommand && command.nodeId === this.nodeId
    );
  };

  StopsUndo = (): boolean => {
    return true;
  };

  StopsRedo = (): boolean => {
    return false;
  };
}
