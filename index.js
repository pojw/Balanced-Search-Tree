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
    //find node
    if (!Node) {
      return null;
    }
    if (Node.value == value) {
      console.log("found", Node);
      //Leaf checking
      if (!Node.left && !Node.right) {
        console.log("leaf");
        return null;
      }
      //One Child Checking
      if (!Node.left) {
        console.log("right Child");
        return Node.right;
      }
      if (!Node.right) {
        console.log("left child");
        return Node.left;
      }
      //Two children
      else {
        console.log("double Children");
        let farLeftParent = Node;
        let farLeft = Node.right;

        while (farLeft.left) {
          console.log("left");
          farLeftParent = farLeft;

          farLeft = farLeft.left;
        }
        Node.value = farLeft.value;
        farLeftParent.left = null;
        if (farLeftParent.left === farLeft) {
          farLeftParent.left = farLeft.right;
        } else {
          farLeftParent.right = farLeft.right;
        }
      }

      return Node;
    } else if (Node.value > value) {
      console.log("went left");

      Node.left = this.remove(value, Node.left);
      return Node;
    } else if (Node.value < value) {
      console.log("went right");

      Node.right = this.remove(value, Node.right);
      return Node;
    }
  }
  levelOrderForEach(Node = this.root) {
    let queue = [];

    console.log("fdfsdf");
    queue.push(Node);
    while (queue.length != 0) {
      console.log(queue[0].value);
      if (queue[0].left != null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right != null) {
        queue.push(queue[0].right);
      }
      queue.shift();
    }
  }
  depth(value, Node = this.root, depth = 0) {
    if (Node == null) {
      console.log("missing");
      return false;
    }
    if (value == Node.value) {
      console.log("Took ", depth);
      return depth;
    }

    if (value > Node.value) {
      this.depth(value, Node.right, (depth += 1));
    }
    if (value < Node.value) {
      this.depth(value, Node.left, (depth += 1));
    }
  }
  height(value, Node = this.root, height = 0) {
    if (Node == null) {
      console.log("missing");
      return false;
    }
    let left = this.height(value, Node.left, height + 1);

    let right = this.height(value, Node.right, height + 1);

    if (height < left) {
      height = left;
    }
    if (height < right) {
      height = right;
    }
    console.log(height);
    return height;
  }
}
let newArray = [];
while (newArray.length != 100) {
  newArray.push(Math.floor(Math.random() * 100) + 1);
}
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let Balanced = new BST();
Balanced.builtTree(newArray);
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
prettyPrint(Balanced.root);

Balanced.insert(66);
Balanced.remove();
prettyPrint(Balanced.root);
Balanced.levelOrderForEach();
Balanced.depth(3);
Balanced.height(9);
