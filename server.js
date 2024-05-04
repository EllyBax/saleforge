import router from "./api/routes/router.js";
import express from "express";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  // Set a cookie named 'session' with the value '123456', and make it HTTPOnly
  res.cookie("session", "123456", {
    httpOnly: true,
    secure: true, // Only sent over HTTPS
    sameSite: "strict", // Helps mitigate CSRF attacks
    expires: new Date(Date.now() + 86400000), // Expires after 24 hours
  });
  res.send("Cookie has been set with HTTPOnly flag.");
});

app.get("/read-cookie", (req, res) => {
  const session = req.cookies.session;
  res.send(`Session value: ${session}`);
});

app.use("/", router);
process.on("SIGINT", async () => {
  console.log("Server shutting down...");
  await prisma.$disconnect();
  process.exit();
});

app.listen(3000, () => {
  "Server running on port 3000";
});
