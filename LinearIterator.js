class LinearIterator {
  constructor(node) {
    this.node = node;
  }

  next() {
    let result = { value: undefined, done: true };

    if (this.node) {
      result.value = this.node.value;
      result.done = false;
      this.node = this.node.next;
    }

    return result;
  }
}
