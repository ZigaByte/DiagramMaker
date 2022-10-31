import Position from './position';

export default class Node {
  id: number;

  position: Position;

  text: string;

  constructor(position: Position, text: string) {
    this.position = position;
    this.text = text;
  }
}
