import fs from 'fs';

export const handleRequest = (request: any, response: any) => {
  if (request.url === "/users" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Response to GET /users");
    response.end();
  } else if (request.url === "/users" && request.method === "POST") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Response to POST /users");
    response.end();
  } else if (request.url === "/clients" && request.method === "GET") {
    const clients = ["Client 1", "Client 2", "Client 3"];
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(JSON.stringify(clients));
    response.end();
  } else if (request.url === "/product" && request.method === "GET") {
    const description = "<h1>details of the product</h1>";
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(description);
    response.end();
  } else if (request.url === "/pdf" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "application/pdf" });
    const readContent = fs.createReadStream(__dirname + "/historia.pdf");

    readContent.pipe(response);
    //const writeContent = fs.createWriteStream(__dirname + "/historia2.pdf")

    /*  console.log("Reading file");
    fs.readFile(__dirname + "/historia.pdf", (error, data) => {
      if (error) {
        console.log(error);
        response.end();
      } else {
        console.log("Sending file");
        response.end(data);
      }
    });
    console.log("File read"); */
    /*     console.log("Reading file");
    const buffer = fs.readFileSync(__dirname + "/historia.pdf");
    console.log("File read");
    console.log(buffer);
    response.write(buffer);
    response.end(); */
  } else {
    response.writeHead(200, { "Content-Type": "text/plain" });
    //response.write("Not Found");
    response.end("That's all folks!");
    /*    response.writeHead(200, { "Content-Type": "text/html" }); */
  }
};
