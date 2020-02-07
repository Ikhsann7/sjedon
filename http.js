const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

///////SERVER///////
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // const pathname = req.url;
  // console.log(url.parse(req.url, true));
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { Content: "text/html" });

    const cardsHTML = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardsHTML);

    res.end(output);
  }

  // PRODUCT
  else if (pathname === "/product") {
    res.writeHead(200, { Content: "text/html" });
    const product = dataObj[query.id];
    // console.log(product);
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, { Content: "application/json" });
    res.end(data);
  }

  // NOTFOUND
  else {
    res.writeHead(404, {
      Content: "text/html",
      "my-own-header-bro": "just trying"
    });
    res.end("<h1>page not FOUND</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requset on port 8000");
});
