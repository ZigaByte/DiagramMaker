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
const workflow = new Workflow(graph);

root.render(<App workflow={workflow} />);

window.electron.ipcRenderer.on('menu-undo', () => {
  console.log('Undo');
  workflow.Undo();
});

window.electron.ipcRenderer.on('menu-redo', () => {
  console.log('Redo');
  workflow.Redo();
});
