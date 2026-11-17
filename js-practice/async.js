// a helper that just waits for some milliseconds (pretend this is the kitchen)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function makeTea() {
  console.log("1. Tea: started boiling water");
  await wait(2000);                 // pause THIS function for 2 seconds
  console.log("3. Tea: ready!");
}

makeTea();
console.log("2. Meanwhile: replying to a message");