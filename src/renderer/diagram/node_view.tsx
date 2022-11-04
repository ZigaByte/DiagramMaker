import ICommand from 'model/commands/icommand';
import SelectNodeCommand from 'model/commands/select_node_command';
import Node from 'model/graph/node';
import React from 'react';
import './node_view.css';

type NodeViewProps = { node: Node; onCommand: (c: ICommand) => void };

// eslint-disable-next-line react/prefer-stateless-function
export default class NodeView extends React.Component<NodeViewProps> {
  handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const { node, onCommand } = this.props;
    onCommand(new SelectNodeCommand(node.id, !node.selected));
    // this.setState((previousState) => ({ graph: previousState.graph }));
  };

  render() {
    const { node } = this.props;
    const style = {
      position: 'absolute',
      left: node.position.x,
      top: node.position.y,
    };
    const isSelected = node.selected;

    const selectedClass = isSelected ? 'selected' : '';
    const classes = `node ${selectedClass}`;

    return (
      <div
        style={style}
        onClick={this.handleClick}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        <h1 className={classes}>{node.text}</h1>
      </div>
    );
  }
}
