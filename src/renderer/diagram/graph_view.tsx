import Graph from 'model/graph/graph';
import Position from 'model/graph/position';
import React from 'react';
import ICommand from 'model/commands/icommand';
import AddNodeCommand from 'model/commands/add_node_command';
import NodeView from './node_view';
import ConnectionView from './connection_view';
import SelectionDeselectCommand from 'model/commands/selection_deselect_command';
import SelectionDragCommand from 'model/commands/selection_drag_command';
import './graph_style.css';
import GraphStartDragCommand from 'model/commands/graph_start_drag_command copy';
import GraphDragCommand from 'model/commands/graph_drag_command';
import SelectionStartDragCommand from 'model/commands/selection_start_drag_command';
import NodeStopEditTextCommand from 'model/commands/node_stop_edit_text_command';

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
    const commandDown = event.metaKey || event.ctrlKey;
    const { graph, onCommand } = this.props;

    if (commandDown) {
      const worldOffset = graph.graph_offset.offset;
      onCommand(
        new AddNodeCommand(
          new Position(
            event.clientX - worldOffset.x,
            event.clientY - worldOffset.y
          )
        )
      );
      event.stopPropagation();
    } else if (graph.EditingAnyNode()) {
      onCommand(new NodeStopEditTextCommand());
      event.stopPropagation();
    } else if (!graph.selection.IsEmpty()) {
      onCommand(new SelectionDeselectCommand());
      event.stopPropagation();
    }
  };

  mouseMove = (event: React.MouseEvent) => {
    const { graph } = this.state;
    const { onCommand } = this.props;
    if (graph.selection.dragging) {
      onCommand(
        new SelectionDragCommand(new Position(event.movementX, event.movementY))
      );
      event.stopPropagation();
    } else if (graph.graph_offset.dragging) {
      onCommand(
        new GraphDragCommand(new Position(event.movementX, event.movementY))
      );
      event.stopPropagation();
    }
  };

  mouseDown = (event: React.MouseEvent) => {
    // console.log('Graph Down');
    const { graph, onCommand } = this.props;
    if (!graph.selection.dragging) {
      onCommand(new GraphStartDragCommand(true));
      event.stopPropagation();
    }
  };

  mouseUp = (event: React.MouseEvent) => {
    // console.log('Graph Up');
    const { graph, onCommand } = this.props;
    if (graph.graph_offset.dragging) {
      onCommand(new GraphStartDragCommand(false));
      event.stopPropagation();
    } else if (graph.selection.dragging) {
      onCommand(new SelectionStartDragCommand(false));
      event.stopPropagation();
    }
  };

  render() {
    const { graph } = this.state;
    const { onCommand } = this.props;
    return (
      <div
        onClick={this.handleClick}
        onMouseMove={this.mouseMove}
        onMouseUp={this.mouseUp}
        onMouseDown={this.mouseDown}
        onKeyDown={() => {}}
        tabIndex={0}
        role="button"
        style={{
          // backgroundColor: 'green',
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: graph.graph_offset.offset.x,
          top: graph.graph_offset.offset.y,
        }}
        className="graph"
      >
        {graph.GetDisplayConnections().map((connection, i) => (
          <ConnectionView key={connection.id} connection={connection} />
        ))}
        {graph.GetDisplayNodes().map((node, i) => (
          <NodeView key={node.id} node={node} onCommand={onCommand} />
        ))}
      </div>
    );
  }
}

export default GraphView;
