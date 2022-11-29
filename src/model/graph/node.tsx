import Position from './position';

export default class Node {
  id: number = -1;

  position: Position;

  text: string;

  selected?: boolean;

  dragging?: boolean;

  constructor(
    id: number,
    position: Position,
    text: string,
  ) {
    this.id = id;
    this.position = position;
    this.text = text;
  }
}
