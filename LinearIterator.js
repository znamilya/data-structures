class LinearIterator {
  constructor(node, withIndex) {
    this._node = node;
    this._index = 0;
    this._withIndex = withIndex;
  }

  next() {
    let result = { value: undefined, done: true };

    if (this._node) {
      result.value = this._withIndex ? [this._node.value, this._index] : this._node.value;
      result.done = false;
      this._node = this._node.next;
      this._index += 1;
    }

    return result;
  }
}
