import ICommand from 'model/commands/icommand';
import Node from 'model/graph/node';
import React from 'react';
import './node_style.css';
import NodeEditTextCommand from 'model/commands/node_edit_text_command';
import NodeStopEditTextCommand from 'model/commands/node_stop_edit_text_command';

type NodeTextAreaViewProps = {
  node: Node;
  onCommand: (c: ICommand) => void;
};
type NodeTextAreaViewState = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class NodeTextAreaView extends React.Component<
  NodeTextAreaViewProps,
  NodeTextAreaViewState
> {
  textAreaRef: React.RefObject<HTMLInputElement>;

  constructor(props: NodeTextAreaViewProps) {
    super(props);
    this.textAreaRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(this.tryFocus, 50);
  }

  componentDidUpdate() {
    setTimeout(this.tryFocus, 50);
  }

  tryFocus = () => {
    const { node } = this.props;
    if (node.editing) {
      console.log('Trying to focus');
      console.log(this.textAreaRef.current);
      this.textAreaRef.current!.focus();
      console.log(document.activeElement);
    }
  };

  onTextEdit = (event: React.ChangeEvent) => {
    const { node, onCommand } = this.props;
    onCommand(new NodeEditTextCommand(node.id, event.target.value));
    event.stopPropagation();
  };

  onKeyDown = (event: React.KeyboardEvent) => {
    const { node, onCommand } = this.props;
    if (node.editing && event.key === 'Enter') {
      onCommand(new NodeStopEditTextCommand());
    }
  };

  render() {
    console.log('Render');
    const { node } = this.props;

    const classes = node.selected ? 'node_edit selected' : 'node_edit';
    return (
      <input
        onChange={this.onTextEdit}
        onKeyDown={this.onKeyDown}
        className={classes}
        value={node.text}
        ref={this.textAreaRef}
        tabIndex={0}
      />
    );
  }
}
