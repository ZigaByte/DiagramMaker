import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import Position from 'model/graph/position';
import ICommand from 'model/commands/icommand';
import Workflow from 'model/workflow';
import GraphView from './diagram/graph_view';

type MainProps = unknown;
type MainState = { workflow: Workflow };

// eslint-disable-next-line react/prefer-stateless-function
class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);

    const graph: Graph = new Graph();
    graph.AddNode(new Node(new Position(100, 100), 'Hello'));
    graph.AddNode(new Node(new Position(300, 200), 'Ola'));
    graph.AddNode(new Node(new Position(400, 100), 'Zdravo'));

    const workflow: Workflow = new Workflow(graph);
    this.state = { workflow };
  }

  onCommand = (command: ICommand) => {
    const { workflow } = this.state;
    workflow.Execute(command);
    this.setState({ workflow });
  };

  render() {
    const { workflow } = this.state;

    return (
      <div className="main">
        <GraphView graph={workflow.GetGraph()} onCommand={this.onCommand} />
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
