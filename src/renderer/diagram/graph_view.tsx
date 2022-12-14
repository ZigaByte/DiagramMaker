import Graph from 'model/graph/graph';
import Position from 'model/graph/position';
import React from 'react';
import ICommand from 'model/commands/icommand';
import AddNodeCommand from 'model/commands/add_node_command';
import SelectionDeselectCommand from 'model/commands/selection_deselect_command';
import SelectionDragCommand from 'model/commands/selection_drag_command';
import './graph_style.css';
import GraphStartDragCommand from 'model/commands/graph_start_drag_command copy';
import GraphDragCommand from 'model/commands/graph_drag_command';
import SelectionStartDragCommand from 'model/commands/selection_start_drag_command';
import NodeStopEditTextCommand from 'model/commands/node_stop_edit_text_command';
import Keymap from 'model/keyboard/keymap';
import SelectionBoxStartCommand from 'model/commands/selection_box_start_command';
import SelectionBoxDragCommand from 'model/commands/selection_box_drag_command';
import NodeView from './node_view';
import ConnectionView from './connection_view';
import SelectionBoxView from './selection_box_view';

type GraphViewProps = {
  graph: Graph;
  onCommand: (c: ICommand) => void;
};
type GraphViewState = { graph: Graph; keymap: Keymap };

// eslint-disable-next-line react/prefer-stateless-function
export default class GraphView extends React.Component<
  GraphViewProps,
  GraphViewState
> {
  constructor(props: GraphViewProps) {
    super(props);
    this.state = { graph: props.graph, keymap: new Keymap() };
  }

  mouseMove = (event: React.MouseEvent) => {
    const { graph } = this.state;
    const { onCommand } = this.props;

    const offset = new Position(event.movementX, event.movementY);

    if (graph.selection.dragging) {
      onCommand(new SelectionDragCommand(offset));
      event.stopPropagation();
    } else if (graph.graph_offset.dragging) {
      onCommand(new GraphDragCommand(offset));
      event.stopPropagation();
    } else if (graph.selectionBox.active) {
      onCommand(new SelectionBoxDragCommand(offset));
      event.stopPropagation();
    }
  };

  mouseDown = (event: React.MouseEvent) => {
    const { graph, onCommand } = this.props;
    const { keymap } = this.state;
    const commandDown = event.metaKey || event.ctrlKey;

    if (!graph.selection.dragging && keymap.isDown(' ')) {
      onCommand(new GraphStartDragCommand(true));
      event.stopPropagation();
    } else if (commandDown) {
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
    } else {
      if (!graph.selection.IsEmpty()) {
        onCommand(new SelectionDeselectCommand());
      }

      const startPosition = new Position(
        event.clientX - graph.graph_offset.offset.x,
        event.clientY - graph.graph_offset.offset.y
      );
      onCommand(new SelectionBoxStartCommand(true, startPosition));
      event.stopPropagation();
    }
  };

  mouseUp = (event: React.MouseEvent) => {
    const { graph, onCommand } = this.props;
    if (graph.graph_offset.dragging) {
      onCommand(new GraphStartDragCommand(false));
      event.stopPropagation();
    } else if (graph.selection.dragging) {
      onCommand(new SelectionStartDragCommand(false));
      event.stopPropagation();
    } else if (graph.selectionBox.active) {
      const endPosition = new Position(
        event.clientX - graph.graph_offset.offset.x,
        event.clientY - graph.graph_offset.offset.y
      );
      const validSelection = graph.selectionBox.GetSize().lengthSquared() > 0;
      onCommand(new SelectionBoxStartCommand(false, endPosition));

      if (!validSelection && !graph.selection.IsEmpty()) {
        onCommand(new SelectionDeselectCommand());
      }
      event.stopPropagation();
    }
  };

  keyDown = (event: React.KeyboardEvent) => {
    const { keymap } = this.state;
    keymap.onDown(event.key);
  };

  keyUp = (event: React.KeyboardEvent) => {
    const { keymap } = this.state;
    keymap.onUp(event.key);
  };

  render() {
    const { graph } = this.state;
    const { onCommand } = this.props;

    return (
      <div
        onMouseMove={this.mouseMove}
        onMouseUp={this.mouseUp}
        onMouseDown={this.mouseDown}
        onMouseLeave={this.mouseUp}
        onKeyDown={this.keyDown}
        onKeyUp={this.keyUp}
        role="none"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundPositionX: graph.graph_offset.GetOffset().x,
          backgroundPositionY: graph.graph_offset.GetOffset().y,
        }}
        className="graph"
      >
        {graph.GetDisplayConnections().map((connection, i) => (
          <ConnectionView key={connection.id} connection={connection} />
        ))}
        {graph.GetDisplayNodes().map((node, i) => (
          <NodeView key={node.id} node={node} onCommand={onCommand} />
        ))}
        {graph.selectionBox.active && (
          <SelectionBoxView selectionBox={graph.GetDisplaySelectionBox()} />
        )}
      </div>
    );
  }
}
