require("dotenv").config()
require("./db")
const mongoose = require("mongoose")

const express = require("express")
const cors=require("cors")
const app = express()

const bookRouter=require("./routes/book.router")
const userRouter = require("./routes/user.router")
const auth = require("./middleware/auth")


app.use(express.json())
app.use(cors())

app.use(express.static("public"))
app.get("/Welcome", (req, res) => {
  res.render("index", { title: "WELCOME TO EJS", message: "HELLO ITI!" });
});

app.use(auth)
app.use("/api/books", bookRouter);
app.use(auth)
app.use("/api/users", userRouter)

const port = process.env.PORT || 3000;
mongoose.connection.once("open",()=>{
  console.log("DB Connection stablished...");
  app.listen(port, () => {
    console.log(`listening to port ${port}`);
  });
})