const response = await fetch("http://localhost:3000/api/ttt", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    board: "1,2,3,4,5,6,7,8",
  }),
});

const data = await response.json();
console.log(data);
