class node {
  constructor(value, left, right) {
    (this.value = value), (this.left = null), (this.right = null);
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
        i = -1;
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
    let Node = new node();
    Node.value = array[mid];
    Node.left = this.createTree(left);
    Node.right = this.createTree(right);
    return Node;
  }
  builtTree(array) {
    let sortedArray = this.MergeSort(array);
    let checkedArrray = this.duplicates(sortedArray);
    let tree = this.createTree(checkedArrray);
    this.root = tree;
  }
  find(value, node = this.root) {
    if (node == null) {
      return null;
    }
    if (node.value == value) {
      console.log("found" + value);
      console.log(node);
      return node;
    }

    let leftValue = this.find(value, node.left);

    if (leftValue) {
      return leftValue;
    }
    let rightValue = this.find(value, node.right);

    if (rightValue) {
      return rightValue;
    }
    return false;
  }
  insert(value, Node = this.root) {
    if (Node == null) {
      console.log("fwr");

      return new node(value);
    }
    if (Node.value == value) {
      console.log("clone");
      return Node;
    }
    if (Node.value > value) {
      Node.left = this.insert(value, Node.left);
    } else {
      Node.right = this.insert(value, Node.right);
    }
    return Node;
  }
  remove(value, Node = this.root) {
    console.log(Node);

    if (Node.value == null) {
      console.log("wrong");

      return null;
    }

    if (Node.value < value) {
      console.log(Node);

      Node.right = this.remove(value, Node.right);
      console.log(Node);
    } else if (Node.value > value) {
      console.log(Node);

      Node.left = this.remove(value, Node.left);
    } else {
      console.log(Node);
      if (Node.left == null && Node.right == null) {
        console.log("leaf");
        Node = null;
      } else if (Node.left) {
        let newNode = Node.left;
        Node = newNode;
        console.log("leftbranch");
        return Node;
      } else if (Node.right) {
        let newNode = Node.right;
        Node = newNode;
        console.log("rightbranch");

        return Node;
      } else {
        let newNode = this.leftMost(value, Node.right);
        Node.value = newNode.value;
        return Node;
      }
    }
  }
  leftMost(value, Node) {
    while (Node.left) {
      Node = Node.left;
    }
    return Node;
  }
}
let newArray = [];
while (newArray.length != 100) {
  newArray.push(Math.floor(Math.random() * 100) + 1);
}
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let Balanced = new BST();
Balanced.builtTree(array);
console.log(Balanced.root);
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (!node) return;

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
// prettyPrint(Balanced.root);

Balanced.insert(66);
console.log(Balanced.root);
prettyPrint(Balanced.root);
Balanced.remove(1);
prettyPrint(Balanced.root);
