export default class Keymap {
  keys: { [id: string]: boolean } = {};

  onDown(key: string) {
    this.keys[key] = true;
  }

  onUp(key: string) {
    this.keys[key] = false;
  }

  isDown(key: string) {
    if (key in this.keys) {
      return this.keys[key];
    }
    return false;
  }
}
