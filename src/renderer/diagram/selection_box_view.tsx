import React from 'react';
import SelectionBox from 'model/selection/selection_box';
import './selection_box_style.css';

type SelectionViewProps = {
  selectionBox: SelectionBox;
};
type SelectionViewState = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class SelectionBoxView extends React.Component<
  SelectionViewProps,
  SelectionViewState
> {
  render() {
    const { selectionBox } = this.props;
    const size = selectionBox.GetSize();
    const position = selectionBox.GetTopLeft();
    return (
      <div
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: size.x,
          height: size.y,
        }}
        className="selectionBox"
      />
    );
  }
}
