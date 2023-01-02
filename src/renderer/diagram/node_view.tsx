import ICommand from 'model/commands/icommand';
import SelectionAddNodeCommand from 'model/commands/selection_add_node_command';
import SelectionStartDragCommand from 'model/commands/selection_start_drag_command';
import Node from 'model/graph/node';
import React from 'react';
import './node_style.css';
import NodeEditTextCommand from 'model/commands/node_edit_text_command';
import NodeStopEditTextCommand from 'model/commands/node_stop_edit_text_command';
import NodeTextAreaView from './node_text_area_view';

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
  mouseDown = (event: React.MouseEvent) => {
    const { node, onCommand } = this.props;
    if (node.selected) {
      onCommand(new SelectionStartDragCommand(true));
      event.stopPropagation();
    } else if (!node.selected) {
      onCommand(new SelectionAddNodeCommand(node.id));
      event.stopPropagation();
    }

    if (event.detail === 2) {
      onCommand(new NodeEditTextCommand(node.id, node.text));
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

  render() {
    const { node, onCommand } = this.props;

    let nodeHtml;
    if (node.editing) {
      nodeHtml = <NodeTextAreaView node={node} onCommand={onCommand} />;
    } else {
      const classes = node.selected ? 'node selected' : 'node';
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

    const positionStyle = {
      position: 'absolute',
      left: node.position.x,
      top: node.position.y,
      width: 'fit-content',
      height: 'fit-content',
      transform: 'translate(-50%, -50%)',
    };

    return (
      <div
        style={positionStyle}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        role="none"
      >
        {nodeHtml}
      </div>
    );
  }
}
