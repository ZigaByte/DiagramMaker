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

    const { position } = nodes[1];
    const size = nodes[1].position.sub(nodes[0].position).absolute();

    const style = {
      position: 'absolute',
      left: position.x,
      top: position.y,
      width: size.x,
      height: size.y,
      border: '1px solid black',
    };

    return (
      <div style={style}>
        <h1>Connection</h1>
      </div>
    );
  }
}
