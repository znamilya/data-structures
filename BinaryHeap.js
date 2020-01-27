class BinaryHeap {
  constructor(options) {
    this.cmpParentChild = options.cmpParentChild;
    this.cmpSiblings = options.cmpSiblings;
    this.values = [];
  }

  findParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  findLeftIndex(index) {
    return 2 * index + 1;
  }

  findRightIndex(index) {
    return this.findLeftIndex(index) + 1;
  }

  getMaybe(index) {
    return this.values[index] || null;
  }

  swap(indexA, indexB) {
    let tmp = this.values[indexA];

    this.values[indexA] = this.values[indexB];
    this.values[indexB] = tmp;
  }

  insert(value) {
    this.values.push(value);

    let index = this.values.length - 1;
    let parentIndex = this.findParentIndex(index);
    let parentValue = this.getMaybe(parentIndex);

    while (parentValue) {
      if (this.cmpParentChild(parentValue, value)) {
        this.swap(index, parentIndex);

        index = parentIndex;
        parentIndex = this.findParentIndex(index);
        parentValue = this.getMaybe(parentIndex);
      } else {
        break;
      }
    }
  }

  getRoot() {
    return this.values[0];
  }

  extract(cmp) {
    const max = this.values[0];

    let parentValue = this.values.pop();
    this.values[0] = parentValue;

    let parentIndex = 0;
    let leftIndex = this.findLeftIndex(parentIndex);
    let rightIndex = this.findRightIndex(parentIndex);
    let leftValue = this.getMaybe(leftIndex);
    let rightValue = this.getMaybe(rightIndex);

    while (leftValue || rightValue) {
      if (!rightValue || this.cmpSiblings(leftValue, rightValue)) {
        this.swap(parentIndex, leftIndex);

        parentIndex = leftIndex;
      } else {
        this.swap(parentIndex, rightIndex);

        parentIndex = rightIndex;
      }

      leftIndex = this.findLeftIndex(parentIndex);
      rightIndex = this.findRightIndex(parentIndex);
      leftValue = this.getMaybe(leftIndex);
      rightValue = this.getMaybe(rightIndex);
    }

    return max;
  }
}

class MaxBinaryHeap extends BinaryHeap {
  constructor() {
    super({
      cmpParentChild: (a, b) => a < b,
      cmpSiblings: (a, b) => a > b,
    });
  }

  extractMax() {
    return this.extract();
  }

  getMax() {
    return this.getRoot();
  }
}

class MinBinaryHeap extends BinaryHeap {
  constructor() {
    super({
      cmpParentChild: (a, b) => a > b,
      cmpSiblings: (a, b) => a < b,
    });
  }

  extractMin() {
    return this.extract();
  }

  getMin() {
    return this.getRoot();
  }
}
