import Connection from 'model/graph/connection';
import React from 'react';

type ConnectionViewProps = {
  connection: Connection;
};
type ConnectionViewState = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class ConnectionView extends React.Component<
  ConnectionViewProps,
  ConnectionViewState
> {
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
      borderBottom: '0px solid #888',
      borderLeft: '0px solid #888',
      borderRight: '0px solid #888',
      borderTop: '0px solid #888',
    };
    if (position1.x > position2.x) {
      style.borderRight = '3px solid #888';
    } else {
      style.borderLeft = '3px solid #888';
    }

    if (position1.y > position2.y) {
      style.borderTop = '3px solid #888';
    } else {
      style.borderBottom = '3px solid #888';
    }

    return <div style={style} />;
  }
}
