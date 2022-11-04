import React from 'react';
import './node_view.css';

type NodeViewProps = { name: string; x: number; y: number };

// eslint-disable-next-line react/prefer-stateless-function
export default class NodeView extends React.Component<NodeViewProps> {
  handleClick = (event: React.MouseEvent) => {
    console.log('clicked node');
    event.stopPropagation();
    // const commandDown = event.metaKey;
    // if (commandDown) {
    //   const { onCommand } = this.props;
    //   onCommand(new AddNodeCommand(new Position(event.clientX, event.clientY)));
    // }
    // this.setState((previousState) => ({ graph: previousState.graph }));
  };

  render() {
    const { name } = this.props;
    const { x, y } = this.props;
    const position = {
      position: 'absolute',
      top: y,
      left: x,
    };
    return (
      <button
        style={position}
        onClick={this.handleClick}
        onKeyDown={() => {}}
        type="button"
        tabIndex={0}
      >
        <h1 className="node">{name}</h1>
      </button>
    );
  }
}
