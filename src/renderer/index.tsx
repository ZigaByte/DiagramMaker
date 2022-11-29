import AddConnectionCommand from 'model/commands/add_connection_command';
import RemoveNodeCommand from 'model/commands/remove_node_command';
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
graph.AddNode(new Node(-1, new Position(100, 100), 'Hello'));
graph.AddNode(new Node(-1, new Position(300, 300), 'Aloha'));
graph.AddConnection(new Connection(-1, graph.nodes[0], graph.nodes[1]));
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
  const seletedNodes = graph.selection.GetNodes();
  if (seletedNodes.length === 2) {
    workflow.Execute(
      new AddConnectionCommand(seletedNodes[0], seletedNodes[1])
    );
    root.render(<App workflow={workflow} />);
  }
});

window.electron.ipcRenderer.on('menu-delete', () => {
  const seletedNodes = graph.selection.GetNodes();
  if (seletedNodes.length > 0) {
    seletedNodes.forEach((element) => {
      workflow.Execute(new RemoveNodeCommand(element));
    });
    root.render(<App workflow={workflow} />);
  }
});
