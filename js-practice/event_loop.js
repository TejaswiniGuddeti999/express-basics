const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function order() {
    console.log("W");
    await wait(1000);
    console.log("X");
}

console.log("Y");
order();
setTimeout(()=> console.log("Z"), 0);
console.log("V");