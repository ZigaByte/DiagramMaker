import ICommand from 'model/commands/icommand';
import MoveNodeCommand from 'model/commands/move_node_commnad';
import SelectNodeCommand from 'model/commands/select_node_command';
import Node from 'model/graph/node';
import Connection from 'model/graph/connection';
import Position from 'model/graph/position';
import React from 'react';
import './node_view.css';

type ConnectionViewProps = {
  connection: Connection;
};
// type ConnectionViewState = Any;

// eslint-disable-next-line react/prefer-stateless-function
export default class ConnectionView extends React.Component<ConnectionViewProps> {
  render() {
    const { connection } = this.props;
    const nodes = connection.GetNodes();

    const position1 = nodes[0].position;
    const position2 = nodes[1].position;
    const size = nodes[1].position.sub(nodes[0].position).absolute();

    const style = {
      position: 'absolute',
      left: Math.min(position1.x, position2.x),
      top: Math.min(position1.y, position2.y),
      width: size.x,
      height: size.y,
      borderRadius: '20px',
      borderBottom: '0px solid white',
      borderLeft: '0px solid white',
      borderRight: '0px solid white',
      borderTop: '0px solid white',
    };
    if (position1.x > position2.x) {
      style.borderRight = '3px solid white';
    } else {
      style.borderLeft = '3px solid white';
    }

    if (position1.y > position2.y) {
      style.borderTop = '3px solid white';
    } else {
      style.borderBottom = '3px solid white';
    }

    return <div style={style} />;
  }
}
