const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
http
  .createServer(function (req, res) {
    const reqUrl = url.parse(req.url, true).pathname;
    const routes = {
      "/": "index.html",
      "/about": "about.html",
      "/login": "login.html",
      "/contact": "contact.html",
    };
    const filePath = routes[reqUrl]
      ? path.join(__dirname, "public", routes[reqUrl])
      : path.join(__dirname, "public", reqUrl);

    const mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
    };
    const ext = path.extname(filePath);

    const contentType = mimeTypes[ext] || "application/octet-stream";
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internel Server Error");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  })
  .listen(2000, () => {
    console.log("Server is running at http://localhost:2000");
  });
