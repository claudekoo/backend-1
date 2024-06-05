import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import viewsRoutes from "./routes/views.routes.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use("/api", routes);

app.use("/", viewsRoutes);

const httpServer = app.listen(8080, () => {
    console.log("Server started on http://localhost:8080");
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("New client connected");
});
