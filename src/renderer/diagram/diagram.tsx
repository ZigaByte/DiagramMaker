import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Node from './node';

// eslint-disable-next-line react/prefer-stateless-function
class Diagram extends React.Component {
  render() {
    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Node name="Test" x={100} y={100} />
        <Node name="Test2" x={200} y={400} />
        <Node name="Test3" x={100} y={500} />
      </div>
    );
  }
}

export default Diagram;
