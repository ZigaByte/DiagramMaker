export default class Position {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(pos: Position): Position {
    return new Position(this.x + pos.x, this.y + pos.y);
  }

  sub(pos: Position): Position {
    return new Position(this.x - pos.x, this.y - pos.y);
  }

  lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  absolute(): Position {
    return new Position(Math.abs(this.x), Math.abs(this.y));
  }
}
