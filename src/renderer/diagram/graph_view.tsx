import Graph from 'model/graph/graph';
import Position from 'model/graph/position';
import React from 'react';
import ICommand from 'model/commands/icommand';
import AddNodeCommand from 'model/commands/add_node_command';
import NodeView from './node_view';
import ConnectionView from './connection_view';
import DeselectAllCommand from 'model/commands/deselect_all_command';

type GraphViewProps = {
  graph: Graph;
  onCommand: (c: ICommand) => void;
};
type GraphViewState = { graph: Graph };

// eslint-disable-next-line react/prefer-stateless-function
class GraphView extends React.Component<GraphViewProps, GraphViewState> {
  constructor(props: GraphViewProps) {
    super(props);
    this.state = { graph: props.graph };
  }

  handleClick = (event: React.MouseEvent) => {
    const commandDown = event.metaKey;
    const { onCommand } = this.props;

    if (commandDown) {
      onCommand(new AddNodeCommand(new Position(event.clientX, event.clientY)));
    } else {
      onCommand(new DeselectAllCommand());
    }
    // this.setState((previousState) => ({ graph: previousState.graph }));
    event.stopPropagation();
  };

  render() {
    const { graph } = this.state;
    const { selection, onCommand } = this.props;
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
        {graph.GetAllConnectitons().map((connection, i) => (
          <ConnectionView key={connection.id} connection={connection} />
        ))}
        {graph.GetNodes().map((node, i) => (
          <NodeView
            key={node.id}
            node={node}
            selection={selection}
            onCommand={onCommand}
          />
        ))}
      </div>
    );
  }
}

export default GraphView;
