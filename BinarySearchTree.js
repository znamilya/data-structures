class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  _insert(parentNode, childNode) {
    if (!parentNode) {
      return childNode;
    }

    if (childNode.value > parentNode.value) {
      parentNode.right = this._insert(parentNode.right, childNode);
    }

    if (childNode.value < parentNode.value) {
      parentNode.left = this._insert(parentNode.left, childNode);
    }

    return parentNode;
  }

  insert(value) {
    const node = new Node(value);

    this.root = this._insert(this.root, node);
  }

  _lookup(node, value) {
    if (!node) return null;

    if (node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this._lookup(node.left, value);
    }

    if (value > node.value) {
      return this._lookup(node.right, value);
    }
  }

  lookup(value) {
    return this._lookup(this.root, value);
  }

  _height(node) {
    if (!node) return 0;

    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  height() {
    return this._height(this.root);
  }
}
