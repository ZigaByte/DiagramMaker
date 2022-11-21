import React from 'react';
import Graph from 'model/graph/graph';
import Position from 'model/graph/position';
import AddNodeCommand from 'model/commands/add_node_command';
import ICommand from 'model/commands/icommand';
import Workflow from 'model/workflow';
import GraphView from './diagram/graph_view';

type WorkflowProps = unknown;
type WorkflowState = { workflow: Workflow };

// eslint-disable-next-line react/prefer-stateless-function
export default class WorkflowView extends React.Component<
  WorkflowProps,
  WorkflowState
> {
  constructor(props: WorkflowProps) {
    super(props);

    const graph: Graph = new Graph();

    const workflow: Workflow = new Workflow(graph);
    workflow.Execute(new AddNodeCommand(new Position(100, 100)));
    workflow.Execute(new AddNodeCommand(new Position(300, 200)));
    workflow.Execute(new AddNodeCommand(new Position(400, 100)));

    this.state = { workflow };
  }

  onCommand = (command: ICommand) => {
    const { workflow } = this.state;
    workflow.Execute(command);
    this.setState({ workflow });
  };

  render() {
    const { workflow } = this.state;

    return (
      <div className="main">
        <GraphView graph={workflow.GetGraph()} onCommand={this.onCommand} />
      </div>
    );
  }
}
