class Node {
  constructor(left, right, content) {
    (this.left = left), (this.right = right), (this.content = content);
  }
}
class Tree {
  constructor(root) {
    this.root = root;
  }
  create(array) {
    if (array.length == 1) {
      return null;
    }

    let middle = Math.floor(array.length / 2);

    let content = array[middle];
    let left = this.create(array[(0, middle)]);
    let right = this.create(array[middle]);
    let node = new Node(left, right, content);
    return node;
  }

  buildtree(array) {
    let sortedArray = this.MergeSort(array);
    //splitting
    let tree = this.create(sortedArray);
    return tree;
  }
  sort(left, right) {
    let array = [];
    while (left.length != 0 && right.length != 0) {
      if (left[0] > right[0]) {
        array.push(right.shift());
      } else {
        array.push(left.shift());
      }
    }
    array = array.concat(left).concat(right);
    return array;
  }
  MergeSort(array) {
    if (array.length == 1) {
      return array;
    }
    let middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle);

    let sortedLeft = this.MergeSort(left);
    let sortedRight = this.MergeSort(right);

    return this.sort(sortedLeft, sortedRight);
  }
}
let working = [5, 4, 2, 6, 1, 4, 3];

let node = new Tree();
console.log(node.buildtree(working));
