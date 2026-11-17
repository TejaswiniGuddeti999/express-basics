const orderBiryani = () => {
  return new Promise((resolve, reject) => {
    console.log("Kitchen: cooking...");
    setTimeout(() => {
      resolve("🍛 Biryani is ready");
    }, 2000);
  });
};

async function eat() {
  const food = await orderBiryani();
  console.log(food);
}

eat();