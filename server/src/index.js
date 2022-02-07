import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/connectDB.js";
dotenv.config();

const port = process.env.PORT;
if (port === null) {
  throw new Error("port is null it seems you forgot to create env file");
}

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => console.log(`server is running in port ${port}`));
  } catch (error) {
    console.error(error);
  }
}

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(new URL("../../client/dist", import.meta.url).pathname)
  );
  // Redirect * requests to give the client data
  app.get("*", (req, res) =>
    res.sendFile(
      new URL("../../client/dist/index.html", import.meta.url).pathname
    )
  );
}

startServer();
