/*********** import starts ***********/
const http = require("http");
const socketio = require('socket.io')
const { channel } = require('./app/socket.io')
require("dotenv").config();
("use strict");
const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const { router } = require("./app/routes");
const { connectDB } = require("./app/utils/db");
const { env } = require("./environment");
const logger = require("./logger");
var cron = require("node-cron");

const app = new koa();

connectDB();
app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

cron.schedule(" */1 * * * *", async function () {
   console.log('Cron job added')
});


const server = app.listen(env.PORT, () =>
   logger.info(`Server has started. http://localhost:${env.PORT}`)
);

const io = socketio(server, {
   cors: {
      origin: env.FRONTEND_BASE_URL,
      methods: ["GET", "POST"]
   }
});
channel(io)
exports.io = io
