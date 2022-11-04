import Graph from 'model/graph/graph';
import Position from 'model/graph/position';
import React from 'react';
import ICommand from 'model/commands/icommand';
import AddNodeCommand from 'model/commands/add_node_command';
import NodeView from './node_view';

type GraphViewProps = { graph: Graph; onCommand: (c: ICommand) => void };
type GraphViewState = { graph: Graph };

// eslint-disable-next-line react/prefer-stateless-function
class GraphView extends React.Component<GraphViewProps, GraphViewState> {
  constructor(props: GraphViewProps) {
    super(props);
    this.state = { graph: props.graph };
  }

  handleClick = (event: React.MouseEvent) => {
    const commandDown = event.metaKey;
    if (commandDown) {
      const { onCommand } = this.props;
      onCommand(new AddNodeCommand(new Position(event.clientX, event.clientY)));
    }
    // this.setState((previousState) => ({ graph: previousState.graph }));
    event.stopPropagation();
  };

  render() {
    const { graph } = this.state;
    const { onCommand } = this.props;
    return (
      <div
        onClick={this.handleClick}
        onKeyDown={() => {}}
        tabIndex={0}
        role="button"
        style={{
          // backgroundColor: 'green',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        {graph.GetNodes().map((node, i) => (
          <NodeView key={node.id} node={node} onCommand={onCommand} />
        ))}
      </div>
    );
  }
}

export default GraphView;
