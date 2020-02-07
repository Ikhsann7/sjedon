const fs = require("fs");

// BLOCKING, SYNC WAY
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOut = `This is what we know about avocado: ${textIn}.\nCreated by Ikhsan on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// const textMe = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textMe);

// console.log("file written");

// NONBLOCKING, ASYNC WAY
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR!");
  else {
    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
      console.log(data2);
      fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
        console.log(data3);

        fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, err => {
          console.log("file has written!");
        });
      });
    });
  }
});
console.log("read this!");
