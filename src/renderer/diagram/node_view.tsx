import SelectionDragCommand from 'model/commands/selection_drag_command';
import ICommand from 'model/commands/icommand';
import SelectionAddNodeCommand from 'model/commands/selection_add_node_command';
import SelectionStartDragCommand from 'model/commands/selection_start_drag_command';
import Node from 'model/graph/node';
import Position from 'model/graph/position';
import React from 'react';
import './node_style.css';
import AddNodeCommand from 'model/commands/add_node_command';
import NodeEditTextCommand from 'model/commands/node_edit_text_command';

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
    const { node, onCommand } = this.props;
    if (!node.selected) {
      onCommand(new SelectionAddNodeCommand(node.id));
    }

    if (event.detail === 2) {
      onCommand(new NodeEditTextCommand(node.id, node.text));
    }
    event.stopPropagation();
  };

  mouseDown = (event: React.MouseEvent) => {
    const { node, onCommand } = this.props;
    if (node.selected) {
      onCommand(new SelectionStartDragCommand(true));
      event.stopPropagation();
    }
  };

  mouseUp = (event: React.MouseEvent) => {
    const { node, onCommand } = this.props;
    if (node.selected) {
      onCommand(new SelectionStartDragCommand(false));
      event.stopPropagation();
    }
  };

  mouseMove = (event: React.MouseEvent) => {
    const { node, onCommand } = this.props;
    if (node.dragging) {
      onCommand(
        new SelectionDragCommand(new Position(event.movementX, event.movementY))
      );
      event.stopPropagation();
    }
  };

  onTextEdit = (event: React.ChangeEvent) => {
    const { node, onCommand } = this.props;
    onCommand(new NodeEditTextCommand(node.id, event.target.value));
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

    let nodeHtml;

    if (node.editing) {
      const classes = `node_edit ${selectedClass}`;
      nodeHtml = (
        <textarea
          onChange={this.onTextEdit}
          className={classes}
          defaultValue={node.text}
        />
      );
    } else {
      const classes = `node ${selectedClass}`;
      nodeHtml = (
        <div className={classes}>
          {node.text.split('\n').map((textPart, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="text">
                {textPart}
              </div>
            );
          })}
        </div>
      );
    }

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
        {nodeHtml}
      </div>
    );
  }
}
