import ICommand from './commands/icommand';
import Graph from './graph/graph';

export default class Workflow {
  graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  Execute(command: ICommand) {
    command.Execute(this.graph);
  }

  GetGraph(): Graph {
    return this.graph;
  }
}
