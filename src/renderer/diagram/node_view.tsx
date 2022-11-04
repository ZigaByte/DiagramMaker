import React from 'react';
import './node_view.css';

type NodeViewProps = { name: string; x: number; y: number };

// eslint-disable-next-line react/prefer-stateless-function
export default class NodeView extends React.Component<NodeViewProps> {
  render() {
    const { name } = this.props;
    const { x, y } = this.props;
    const position = {
      position: 'absolute',
      top: y,
      left: x,
    };
    return (
      <div style={position}>
        <h1 className="node">{name}</h1>
      </div>
    );
  }
}
