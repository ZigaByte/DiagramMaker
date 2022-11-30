import Graph from 'model/graph/graph';
import Connection from 'model/graph/connection';
import ICommand from './icommand';

export default class RemoveConnectionCommand implements ICommand {
  connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  Execute(graph: Graph): void {
    graph.RemoveConnection(this.connection);
  }

  Undo(graph: Graph): void {
    graph.AddConnection(this.connection);
  }

  Combine = (additive: ICommand): ICommand => {
    return this;
  };

  CanCombine = (additive: ICommand): boolean => {
    return false;
  };

  StopsUndo = (): boolean => {
    return true;
  };
}
