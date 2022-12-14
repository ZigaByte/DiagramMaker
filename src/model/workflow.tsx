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
  }

  Undo() {
    let lastCommand = this.commnadHistory.pop();
    let stopsUndo = false;
    while (lastCommand !== undefined && !stopsUndo) {
      stopsUndo = lastCommand.StopsUndo();

      lastCommand.Undo(this.graph);
      this.undoneCommands.push(lastCommand);

      if (!stopsUndo) {
        lastCommand = this.commnadHistory.pop();
      }
    }
  }

  Redo() {
    let lastCommand = this.undoneCommands.pop();
    let stopsUndo = false;
    while (lastCommand !== undefined && !stopsUndo) {
      stopsUndo = lastCommand.StopsRedo();

      lastCommand.Execute(this.graph);
      this.commnadHistory.push(lastCommand);

      if (!stopsUndo) {
        lastCommand = this.undoneCommands.pop();
      }
    }
  }

  GetGraph(): Graph {
    return this.graph;
  }
}
