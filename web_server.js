const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

//our own middleware
app.use(logger);

//third-party middleware

app.use(cors(corsOptions));

//built-in middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "./public")));
app.use("/subdir", express.static(path.join(__dirname, "./public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("Tried to load hello.html page");
    next();
  },
  (req, res) => {
    res.send("Hello world!!");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("Finished!!");
};

app.get("/chain(.html)?", [one, two, three]);

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views,", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
