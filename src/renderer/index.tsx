import Connection from 'model/graph/connection';
import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import Position from 'model/graph/position';
import Workflow from 'model/workflow';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

const graph = new Graph();
graph.AddNode(new Node(new Position(100, 100), 'Hello'));
graph.AddNode(new Node(new Position(300, 300), 'Aloha'));
graph.AddConnection(new Connection(graph.nodes[0], graph.nodes[1]));
const workflow = new Workflow(graph);

root.render(<App workflow={workflow} />);

window.electron.ipcRenderer.on('menu-undo', () => {
  workflow.Undo();
  root.render(<App workflow={workflow} />);
});

window.electron.ipcRenderer.on('menu-redo', () => {
  workflow.Redo();
  root.render(<App workflow={workflow} />);
});

window.electron.ipcRenderer.on('menu-connect', () => {
  console.log('Connect');
  graph.ConnectSelectedNodes();
  root.render(<App workflow={workflow} />);
});
