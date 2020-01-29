class StackNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.clear();
  }

  [Symbol.iterator]() {
    return new LinearIterator(this.top);
  }

  clear() {
    this.top = null;
    this.bottom = null;
    this.size = 0;
  }

  valueMaybe(node) {
    return node ? node.value : undefined;
  }

  nextMaybe(node) {
    return node ? node.next : null;
  }

  has(value) {
    let res = false;

    this.iterate(v => {
      if (v === value) {
        res = true;

        return false;
      }

      return true;
    });

    return res;
  }

  peek() {
    return this.valueMaybe(this.top);
  }

  pop() {
    let node = this.top;

    this.top = this.nextMaybe(node);

    return node;
  }

  push(value) {
    this.top = new StackNode(value, this.top);

    this.size += 1;
  }

  toArray() {
    return [...this];
  }
}
