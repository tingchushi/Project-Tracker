const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 3000;

// process.env.NODE_ENV => production or undefined

// middleware
app.use(cors());
app.use(express.json()); // req.body

app.use("/project", require("./routes/projectRoute"));
app.use("/item", require("./routes/itemRoute"));
app.use('/user', require('./routes/auth'))


// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}🚀`);
});

//https://github.com/AndrewJBateman/pern-stack-todo/blob/master/img/edit.png

