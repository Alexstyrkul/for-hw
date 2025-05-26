const arr = [4, 4, 8, 3, 3, 3, 2, 4, 4];

let sum = 0;
arr.forEach((el) => {
  if (el !== 4) {
    sum += el;
  }
});

console.log("Сума без елементів = 4:", sum);