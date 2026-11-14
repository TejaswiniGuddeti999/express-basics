// filter: keep some, drop the rest

// For signle Digit
function isEven(num){
    return num%2 === 0;
};
console.log(isEven(4));

// With named function
const nums = [1,2,3,4,5,6,7,8,9,0]
const evens = nums.filter(isEven)
console.log(evens)

// // function inside filter
// const evens_ =  nums.filter((num) => {
//     return num%2 === 0;
// });
// console.log(evens_)

// arr= [1,2,3,4,5]
// const grtthan2 = arr.filter(isEven)

