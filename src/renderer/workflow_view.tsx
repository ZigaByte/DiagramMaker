import React from 'react';
import ICommand from 'model/commands/icommand';
import Workflow from 'model/workflow';
import GraphView from './diagram/graph_view';

type WorkflowProps = { workflow: Workflow };
type WorkflowState = { workflow: Workflow };

// eslint-disable-next-line react/prefer-stateless-function
export default class WorkflowView extends React.Component<
  WorkflowProps,
  WorkflowState
> {
  constructor(props: WorkflowProps) {
    super(props);
    const { workflow } = this.props;
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
