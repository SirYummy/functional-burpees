//Try to do these on your own and checkout the console in Chrome to check your work, or if checking in node, make sure you have atleast V8.7

const magicNumbers = [72, 3, 9, 10, 65, 0, 18, 21];

// Find the largest number from the magicNumbers array => 72
const largestReducer = (accumulator, current) => {
    return current > accumulator ? current : accumulator
}
const largest = magicNumbers.reduce(largestReducer, magicNumbers[0])

console.log("Largest number: ", largest)

/*
   Sort the numbers from highest to lowest, but leave the original array the same
   [ 72, 65, 21, 18, 10, 9, 3, 0 ]
*/
const quickSort = (arr, left, right) => {
    const len = arr.length;
    let pivot;
    let partitionIndex;

    if(left < right){
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right);
        
        //sort left and right
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}

const partition = (arr, pivot, left, right) => {
    const pivotValue = arr[pivot];
    let partitionIndex = left;
 
    for(var i = left; i < right; i++){
     if(arr[i] < pivotValue){
       swap(arr, i, partitionIndex);
       partitionIndex++;
     }
   }
   swap(arr, right, partitionIndex);
   return partitionIndex;
}

const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
 }

const sorted = 
    quickSort(magicNumbers, 0, 11).
    filter((value) => typeof value !== 'undefined').
    reverse();

console.log("Sorted: ", sorted)

const names = ['Michael', 'Ying', 'Sid', 'Ravi', 'Rodo', 'Mark'];

/*
   Turn each name into an object:
   {name:'Michael'}

*/
const objectifyName = x => { return {name: x} }
const objectifiedNames = Array.from(names, objectifyName)
console.log("objectified names: ", objectifiedNames)

const coolPeople = [
   {
       name: 'Michael Liendo',
       profession: 'Developer',
       yearsProgramming: 10
   },
   {
       name: 'Ravi Andulu',
       profession: 'Developer',
       yearsProgramming: 6
   },
   {
       name: 'Ying Wang',
       profession: 'Developer',
       yearsProgramming: 1
   },
   {
       name: 'Sid Dawar',
       profession: 'Developer',
       yearsProgramming: 3
   }
];



//filter the cool people so that it excludes anyone that has an 'M' in their name
const excludeMs = (peep) => !peep.name.includes('M')
const filteredPeepz = coolPeople.filter(excludeMs)
console.log("Filtered Peepz: ", filteredPeepz);


// How many years of programming does everyone have together?
const aggregateReducer = (accumulator, currentValue) => accumulator + currentValue.yearsProgramming
const aggregateYearsProgramming = coolPeople.reduce(aggregateReducer, 0);
console.log("Aggregate years programming: ", aggregateYearsProgramming)