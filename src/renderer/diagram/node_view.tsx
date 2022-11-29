import DragSelectionCommand from 'model/commands/drag_selection_command';
import ICommand from 'model/commands/icommand';
import SelectNodeCommand from 'model/commands/select_node_command';
import SetDraggingCommand from 'model/commands/set_dragging_command';
import Node from 'model/graph/node';
import Position from 'model/graph/position';
import React from 'react';
import './node_style.css';

type NodeViewProps = {
  node: Node;
  onCommand: (c: ICommand) => void;
};
type NodeViewState = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class NodeView extends React.Component<
  NodeViewProps,
  NodeViewState
> {
  handleClick = (event: React.MouseEvent) => {
    // console.log('Node Click');
    event.stopPropagation();
    const { node, onCommand } = this.props;
    if (!node.selected) {
      onCommand(new SelectNodeCommand(node.id));
    }
  };

  mouseDown = (event: React.MouseEvent) => {
    // console.log('Node Down');
    const { node, onCommand } = this.props;
    if (node.selected) {
      onCommand(new SetDraggingCommand(true));
      event.stopPropagation();
    }
  };

  mouseUp = (event: React.MouseEvent) => {
    // console.log('Node Down');
    const { onCommand } = this.props;
    onCommand(new SetDraggingCommand(false));
    event.stopPropagation();
  };

  mouseMove = (event: React.MouseEvent) => {
    // console.log('Node Move ' + event.movementX + ' . ' + event.movementY);
    const { onCommand } = this.props;
    onCommand(
      new DragSelectionCommand(new Position(event.movementX, event.movementY))
    );
    event.stopPropagation();
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
        <h1 className={classes}>{node.text}</h1>
      </div>
    );
  }
}
