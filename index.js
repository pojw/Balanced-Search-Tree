//merge sort will split it in half, until it lengh is 1, and the things being passed down will be the new array, left and right
//so when you split the array in half, you would pass the left and right
//that would be the recrussion for splititng it, to join would check for the valules of each array iten and ocmpare to the right and append the greater one

//Funciotn to split array
function MergeSort(array) {
  //base case
  console.log(array);

  if (array.length == 1) {
    return;
  }
  let middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle);

  MergeSort(left);
  MergeSort(right);

  sort(left, right);
}

//function to put them back togeter
function sort(left, right) {
  let array = [];
  while (left.length != 0 || right.length != 0) {
    console.log("working");
    if (left[0] > right[0]) {
      array.push(right.shift);
    } else {
      array.push(left.shift);
    }
    console.log(left.length, right.length);
  }
  return array;
}
let array = [5, 4, 2, 6, 1, 4, 3];
MergeSort(array);
