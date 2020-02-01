class Node {
  static getValue(node) {
    return node ? node.value : undefined;
  }

  static getLeft(node) {
    return node ? node.left : null;
  }

  static getRight(node) {
    return node ? node.right : null;
  }

  static hasLeft(node) {
    return Node.getLeft(node) !== null;
  }
  static hasRight(node) {
    return Node.getRight(node) !== null;
  }

  static setLeft(node, leftNode) {
    if (!node) return null;

    node.left = leftNode;

    return node;
  }

  static setRight(node, rightNode) {
    if (!node) return null;

    node.right = rightNode;

    return node;
  }

  static isLeaf(node) {
    return Node.getLeft(node) === null && Node.getRight(node) === null;
  }

  static isFull(node) {
    return Node.getLeft(node) !== null && Node.getRight(node) !== null;
  }

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

  _remove(node, value) {
    if (!node) {
      return;
    }

    const nodeValue = Node.getValue(node);
    const leftNode = Node.getLeft(node);
    const rightNode = Node.getRight(node);

    // Look up a node to remove in the left subtree
    if (value < nodeValue) {
      return Node.setLeft(node, this._remove(leftNode, value));
    }

    // Look up a node to remove in the right subtree
    if (value > nodeValue) {
      return Node.setRight(node, this._remove(rightNode, value));
    }

    // We found a node we what to remove
    if (nodeValue === value) {
      // special case: the node has no children
      if (Node.isLeaf(node)) {
        return null;
      }

      // special case: the node has only one child
      if (!Node.isFull(node)) {
        // Just attach child of the node to its parent
        return leftNode || rightNode;
      }

      // special case: the node has two children
      if (Node.isFull(node)) {
        let leftmostNode = rightNode;
        let parentNode = leftmostNode;

        // Looking up for the leftmost node in the subtree
        while (Node.hasLeft(leftmostNode)) {
          parentNode = leftmostNode;
          leftmostNode = Node.getLeft(leftmostNode);
        }

        // Remove the leftmost node from where it was
        parentNode.left = null;
        // Attach to that node subtrees of the removed node
        leftmostNode.left = leftNode;
        leftmostNode.right = rightNode;

        // And attach it to parent of removed node
        return leftmostNode;
      }
    }

    return node;
  }

  /**
   * Remove node
   *
   * @param {any} value 
   */
  remove(value) {
    this.root = this._remove(this.root, value);
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

let bst = new BinarySearchTree;

bst.insert(100);
bst.insert(10);
bst.insert(15);
bst.insert(8);
bst.insert(17);
bst.insert(13);
bst.insert(11);
bst.insert(14);
bst.remove(10);

// 100,10,15,8,17,13,11,14
console.log(bst);