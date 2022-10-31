import Position from './position';

export default class Node {
  id: number;

  position: Position;

  text: string;

  constructor(id: number, position: Position, text: string) {
    this.id = id;
    this.position = position;
    this.text = text;
  }
}
