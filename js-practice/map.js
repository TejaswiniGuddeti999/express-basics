// Change every item in the array

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



const doubled = nums.map((num) => {
     return num*2 ;
});

console.log(doubled);


const double = (num) => {
  return num * 2;
};

const doubled_ = nums.map(double);   // just the name, no brackets
console.log(doubled_)

// Double every number and keep those greater than 5
const doubles = nums.map((num)=> {return num*2})
console.log(doubles)
const GreaterThanFive = doubles.filter((num) => { returnnum>5})
console.log(GreaterThanFive)

