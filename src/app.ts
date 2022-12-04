import express from 'express';

import RouterUsers from './modules/users/presentation/user.route';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.mountRoutes();
  }

  mountRoutes(): void {
    this.app.use("/users", RouterUsers);

    this.app.get("/products", (request, response) => {
      const products = [
        { name: "Product 1", price: 10 },
        { name: "Product 2", price: 20 },
      ];
      /*   response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(products));
            response.end(); */

      //response.status(200).type("application/json").json(products);
      response.json(products);
    });

    this.app.get("/pdf", (request, response) => {
      //response.download(__dirname + "/historia.pdf");
      response.sendFile(__dirname + "/historia.pdf");
    });
  }
}

export default new App().app;
