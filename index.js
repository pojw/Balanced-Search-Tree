class node {
  constructor(value, left, right) {
    (this.value = value), (this.left = left), (this.right = right);
  }
}

class BST {
  constructor(head, root) {
    (this.head = head), (this.root = root);
  }
  MergeSort(array) {
    //base case

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
  duplicates(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === array[i + 1]) {
        array.splice(i, 1);
      }
    }
    return array;
  }
  createTree(array) {
    //base case
    if (array.length === 0) {
      return null;
    }

    //spliting
    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid + 1);
    console.log(mid, left, right);
    let Node = new node();
    Node.value = array[mid];
    Node.left = this.createTree(left);
    Node.right = this.createTree(right);
    return Node;
  }
  builtTree(array) {
    let sortedArray = this.MergeSort(array);
    let checkedArrray = this.duplicates(sortedArray);
    console.log(checkedArrray);
    let tree = this.createTree(checkedArrray);

    console.log(tree);
  }
}
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let Balanced = new BST();
Balanced.builtTree(array);
