// reduce - combine everything into one value

//  Total or one item:
const addTotal = (total, num) => {
    return total + num;
};
console.log(addTotal(122,435))


// Total for an array
nums = [234,234,25,3634,365,35436,2546,2463,2436,246278]
//  0 is the starting total
const added = nums.reduce(addTotal,0) 
console.log(added);

// Total with func inside reduce
const added_ = nums.reduce((total,num)=> {
    return total+num
})
console.log(added_)

// Multiplication 
arr = [1,2,3,4,5,6,7,8,9,10]
const multiplied = arr.reduce((total,num) => {
    return total*num;
})
console.log(multiplied)