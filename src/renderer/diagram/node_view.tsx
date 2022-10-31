import React from 'react';

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
        <h1>{name}</h1>
      </div>
    );
  }
}
