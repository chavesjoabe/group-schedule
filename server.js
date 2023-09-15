import { createServer } from 'node:http';
import { crewController } from './controllers/crew.controller.js';

export class App {
  constructor(port, createServerFunction, handlerFunc) {
    this.PORT = port;
    this.createServerFunction = createServerFunction;
    this.handlerFunc = handlerFunc;
  }


  startServer() {
    const server = this.createServerFunction(this.handlerFunc);
    server.listen(this.PORT, () => console.log('server is running on port: ', this.PORT));
  }
}

const PORT = 3000;

const allRoutes = {
  ...crewController,
  default: (req, res) => {
    res.writeHead(404, 'Not Found');
    const response = {
      status: 404,
      message: 'Not Found',
    }

    res.end(JSON.stringify(response));
  }
}

const handler = (req, res) => {
  let { url, method } = req;
  console.log(url, method);
  const key = `${url}:${method.toLowerCase()}`;
  const chosen = allRoutes[key] || allRoutes.default;
  chosen.apply(allRoutes, [req, res]);
}

const app = new App(PORT, createServer, handler);

app.startServer();
