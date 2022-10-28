import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import internal from 'stream';

type MyProps = { name: string; x: number; y: number };

// eslint-disable-next-line react/prefer-stateless-function
class Node extends React.Component<MyProps> {
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

export default Node;
