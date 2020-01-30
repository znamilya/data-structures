class StackNode {
  static getValue(node) {
    return node ? node.value : undefined;
  }

  static getNext(node) {
    return node ? node.next : null;
  }

  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Sequance {
  constructor() {
    this.start = null;
    this.end = null;
    this.size = 0;
  }

  [Symbol.iterator]() {
    return this._getIterator();
  }

  _getIterator(withIndex = false) {
    return new LinearIterator(this.start, withIndex);
  }

  clear() {
    this.start = null;
    this.end = null;
    this.size = 0;
  }

  /**
   * Get value of the node by index
   *
   * @param {number} index
   */
  get(index) {
    if (index >= this.size) return null;

    let iter = this._getIterator(true);
    let next = iter.next();

    while (next) {
      if (index === next.value[1]) {
        return next.value[0];
      }

      next = iter.next();
    }
  }

  /**
   * Return the first node of the sequance without removing it
   *
   * @return {StackNode.value}
   */
  getStart() {
    return StackNode.getValue(this.start);
  }

  /**
   * Return the last node of the sequance without removing it
   *
   * @return {StackNode.value}
   */
  getEnd() {
    return StackNode.getValue(this.end);
  }

  /**
   * Add a node to the beginnig of the sequance.
   *
   * @param {any} value
   */
  unshift(value) {
    let node = new StackNode(value, this.start);
    this.start = node;

    if (this.isEmpty()) {
      this.end = node;
    }

    this.size += 1;
  }

  /**
   * Add nodes to the beginnig of the sequance.
   *
   * @param {any[]} value
   */
  unshiftAll(values = []) {
    values.forEach(v => this.unshift(v));
  }

  /**
   * Extract a node from the beginnig of the sequance.
   *
   * @return {StackNode.value}
   */
  shift() {
    let start = this.start;

    this.start = StackNode.getNext(start);
    this.size -= 1;

    if (this.isEmpty()) {
      this.end = null;
    }

    return StackNode.getValue(start);
  }

  /**
   * Add a node to the end of the sequance.
   *
   * @param {any} value
   */
  push(value) {
    let node = new StackNode(value);

    if (this.isEmpty()) {
      this.start = node;
      this.end = node;
    } else {
      this.end.next = node;
    }

    this.size += 1;
    this.end = node;
  }

  /**
   * Add nodes to the end of the sequance.
   *
   * @param {any[]} value
   */
  pushAll(values) {
    values.forEach(v => this.push(v));
  }

  /**
   * Turn the sequence into an array.
   *
   * @returns {any[]}
   */
  toArray() {
    return [...this];
  }

  /**
   * Check if there is a node with passed value in the sequence.
   *
   * @param {any} value
   * @returns {boolean}
   */
  has(value) {
    for (let v of this) {
      if (value === v) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if the sequence is empty.
   *
   * @returns {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }
}
