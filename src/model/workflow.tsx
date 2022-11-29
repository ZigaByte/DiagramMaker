import ICommand from './commands/icommand';
import Graph from './graph/graph';

export default class Workflow {
  graph: Graph;

  commnadHistory: ICommand[] = [];

  undoneCommands: ICommand[] = [];

  constructor(graph: Graph) {
    this.graph = graph;
  }

  Execute(command: ICommand) {
    command.Execute(this.graph);

    if (this.commnadHistory.length > 0) {
      const lastCommand = this.commnadHistory[this.commnadHistory.length - 1];
      if (lastCommand.CanCombine(command)) {
        this.commnadHistory[this.commnadHistory.length - 1] =
          lastCommand.Combine(command);
      } else {
        this.commnadHistory.push(command);
      }
    } else {
      this.commnadHistory.push(command);
    }
    this.undoneCommands = [];

    console.log(this.commnadHistory);
  }

  Undo() {
    const lastCommand = this.commnadHistory.pop();
    if (lastCommand !== undefined) {
      lastCommand.Undo(this.graph);
      this.undoneCommands.push(lastCommand);
    }
    console.log(this.commnadHistory);
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
}
