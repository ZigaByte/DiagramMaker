import SelectionDragCommand from 'model/commands/selection_drag_command';
import ICommand from 'model/commands/icommand';
import SelectionAddNodeCommand from 'model/commands/selection_add_node_command';
import SelectionStartDragCommand from 'model/commands/selection_start_drag_command';
import Node from 'model/graph/node';
import Position from 'model/graph/position';
import React from 'react';
import './node_style.css';
import AddNodeCommand from 'model/commands/add_node_command';

type NodeViewProps = {
  node: Node;
  onCommand: (c: ICommand) => void;
};
type NodeViewState = { timer?: NodeJS.Timeout; prevent: boolean };

// eslint-disable-next-line react/prefer-stateless-function
export default class NodeView extends React.Component<
  NodeViewProps,
  NodeViewState
> {
  handleClick = (event: React.MouseEvent) => {
    console.log('Node Click');
    const { node, onCommand } = this.props;
    if (!node.selected) {
      onCommand(new SelectionAddNodeCommand(node.id));
    }

    if (event.detail === 2) {
      onCommand(new AddNodeCommand(new Position(0, 0)));
    }
    event.stopPropagation();
  };

  mouseDown = (event: React.MouseEvent) => {
    // console.log('Node Down');
    const { node, onCommand } = this.props;
    if (node.selected) {
      onCommand(new SelectionStartDragCommand(true));
      event.stopPropagation();
    }
  };

  mouseUp = (event: React.MouseEvent) => {
    // console.log('Node Up');
    const { node, onCommand } = this.props;
    if (node.selected) {
      onCommand(new SelectionStartDragCommand(false));
      event.stopPropagation();
    }
  };

  mouseMove = (event: React.MouseEvent) => {
    // console.log('Node Move ' + event.movementX + ' . ' + event.movementY);
    const { node, onCommand } = this.props;
    if (node.dragging) {
      onCommand(
        new SelectionDragCommand(new Position(event.movementX, event.movementY))
      );
      event.stopPropagation();
    }
  };

  render() {
    const { node } = this.props;

    const style = {
      position: 'absolute',
      left: node.position.x,
      top: node.position.y,
      width: 'fit-content',
      height: 'fit-content',
      transform: 'translate(-50%, -50%)',
    };
    const isSelected = node.selected;

    const selectedClass = isSelected ? 'selected' : '';
    const classes = `node ${selectedClass}`;

    return (
      <div
        style={style}
        onClick={this.handleClick}
        onMouseDown={this.mouseDown}
        onMouseMove={this.mouseMove}
        onMouseUp={this.mouseUp}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        {/* <h1 className={classes}>{node.text}</h1> */}
        <textarea defaultValue="helo"></textarea>
      </div>
    );
  }
}
