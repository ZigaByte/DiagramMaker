import ICommand from 'model/commands/icommand';
import MoveNodeCommand from 'model/commands/move_node_commnad';
import SelectNodeCommand from 'model/commands/select_node_command';
import Node from 'model/graph/node';
import Position from 'model/graph/position';
import React from 'react';
import './node_view.css';

type NodeViewProps = { node: Node; onCommand: (c: ICommand) => void };
type NodeViewState = {
  dragged: boolean;
  dragStartPosition: Position;
  dragOffset: Position;
};

// eslint-disable-next-line react/prefer-stateless-function
export default class NodeView extends React.Component<
  NodeViewProps,
  NodeViewState
> {
  constructor(props: NodeViewProps) {
    super(props);
    this.state = {
      dragged: false,
      dragStartPosition: new Position(0, 0),
      dragOffset: new Position(0, 0),
    };
  }

  handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const { node, onCommand } = this.props;
    const { dragged } = this.state;
    if (!dragged) {
      onCommand(new SelectNodeCommand(node.id, !node.selected));
    }
  };

  mouseDown = (event: React.MouseEvent) => {
    const { node } = this.props;
    if (node.selected) {
      this.setState((previousState) => ({
        dragged: true,
        dragStartPosition: new Position(event.screenX, event.screenY),
      }));
      event.stopPropagation();
    }
  };

  mouseUp = (event: React.MouseEvent) => {
    const { dragged, dragOffset } = this.state;
    if (dragged) {
      const { node, onCommand } = this.props;
      const newPosition = node.position.add(dragOffset);
      onCommand(new MoveNodeCommand(node, newPosition));

      this.setState((previousState) => ({
        dragged: false,
        dragStartPosition: new Position(0, 0),
        dragOffset: new Position(0, 0),
      }));
      event.stopPropagation();
    }
  };

  mouseMove = (event: React.MouseEvent) => {
    const { dragged, dragStartPosition } = this.state;
    if (dragged) {
      const offset = new Position(event.screenX, event.screenY).sub(
        dragStartPosition
      );
      this.setState((previousState) => ({
        dragOffset: offset,
      }));
      event.stopPropagation();
    }
  };

  render() {
    const { node } = this.props;
    const { dragOffset } = this.state;

    const style = {
      position: 'absolute',
      left: node.position.x + dragOffset.x,
      top: node.position.y + dragOffset.y,
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
