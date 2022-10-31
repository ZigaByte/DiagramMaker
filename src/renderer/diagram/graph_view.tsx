import Graph from 'model/graph/graph';
import Node from 'model/graph/node';
import Position from 'model/graph/position';
import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import NodeView from './node_view';

type GraphViewProps = { graph: Graph };
type GraphViewState = { graph: Graph };

// eslint-disable-next-line react/prefer-stateless-function
class GraphView extends React.Component<GraphViewProps, GraphViewState> {
  constructor(props: GraphViewProps) {
    super(props);
    this.state = { graph: props.graph };
  }

  handleClick = (event: React.MouseEvent) => {
    const commandDown = event.metaKey;
    console.log(commandDown);
    console.log(event);
    if (commandDown) {
      const { graph } = this.props;
      graph.AddNode(
        new Node(new Position(event.clientX, event.clientY), 'Test')
      );
    }
    this.setState((previousState) => ({ graph: previousState.graph }));
  };

  render() {
    console.log(this.state);
    const { graph } = this.state;
    return (
      <div
        onClick={this.handleClick}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
        style={{
          backgroundColor: 'green',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        {graph.GetNodes().map((node, i) => (
          <NodeView
            key={node.id}
            name={node.text}
            x={node.position.x}
            y={node.position.y}
          />
        ))}
      </div>
    );
  }
}

export default GraphView;
