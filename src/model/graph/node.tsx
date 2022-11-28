import Position from './position';

export default class Node {
  id: number = -1;

  position: Position;

  text: string;

  selected?: boolean;

  constructor(
    id: number,
    position: Position,
    text: string,
    selected?: boolean
  ) {
    this.id = id;
    this.position = position;
    this.text = text;
    this.selected = selected;
  }
}
