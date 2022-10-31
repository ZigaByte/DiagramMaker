import Graph from 'model/graph/graph';
import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import NodeView from './node_view';

type GraphViewProps = { graph: Graph };

// eslint-disable-next-line react/prefer-stateless-function
class GraphView extends React.Component<GraphViewProps> {
  render() {
    const { graph } = this.props;

    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {graph.GetNodes().map((node, i) => (
          <NodeView
            key={node.id}
            name={node.text}
            x={node.position.x}
            y={node.position.y}
          />
        ))}
        {/* <NodeView name="Test" x={100} y={100} />
        <NodeView name="Test2" x={200} y={400} />
        <NodeView name="Test3" x={100} y={500} /> */}
      </div>
    );
  }
}

export default GraphView;
