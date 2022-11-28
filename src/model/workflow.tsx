import ICommand from './commands/icommand';
import Graph from './graph/graph';
import Selection from './selection/selection';

export default class Workflow {
  graph: Graph;

  commnadHistory: ICommand[] = [];

  undoneCommands: ICommand[] = [];

  constructor(graph: Graph) {
    this.graph = graph;
  }

  Execute(command: ICommand) {
    command.Execute(this.graph);
    this.commnadHistory.push(command);
    this.undoneCommands = [];
  }

  Undo() {
    const lastCommand = this.commnadHistory.pop();
    if (lastCommand !== undefined) {
      lastCommand.Undo(this.graph);
      this.undoneCommands.push(lastCommand);
    }
  }

  Redo() {
    const lastCommand = this.undoneCommands.pop();
    if (lastCommand !== undefined) {
      lastCommand.Execute(this.graph);
      this.commnadHistory.push(lastCommand);
    }
  }

  GetGraph(): Graph {
    return this.graph;
  }

  GetSelection(): Selection {
    return this.selection;
  }
}
