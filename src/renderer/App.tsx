import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import GraphView from './diagram/graph_view';
import icon from '../../assets/icon.svg';
import './App.css';
import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import Position from 'model/graph/position';

// eslint-disable-next-line react/prefer-stateless-function
class Main extends React.Component {
  render() {
    const graph: Graph = new Graph();
    graph.AddNode(new Node(new Position(100, 100), 'Hello'));
    graph.AddNode(new Node(new Position(300, 200), 'Ola'));
    graph.AddNode(new Node(new Position(400, 100), 'Zdravo'));

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <GraphView graph={graph} />

        {/* <div className="Hello">
        <h1>electron-react-boilerplate</h1>
        <div className="Hello">
          <button type="button">Readss our docs</button>
          <button type="button">Donate</button>
        </div>
      </div> */}
      </div>
    );
  }
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
