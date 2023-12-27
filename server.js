// const { add, sub, mul, div } = require("./math");

// console.log(add(10, 2));
// console.log(sub(10, 2));
// console.log(mul(10, 2));
// console.log(div(10, 2));

// import { readFile } from "node:fs";

// const fs = require("fs");
const { error } = require("console");
const path = require("path");
const fsPromises = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "start.txt"),
      "utf8"
    );
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "end.txt"),
      "Have you done this?"
    );
    console.log("Writing completed");
    await fsPromises.appendFile(
      path.join(__dirname, "files", "start.txt"),
      "\n\nHave you done this now?"
    );
    console.log("Completed append");
    await fsPromises.rename(
      path.join(__dirname, "files", "end.txt"),
      path.join(__dirname, "files", "Finished.txt")
    ),
      console.log("Finished completed");

    /* To delete */
    await fsPromises.unlink(path.join(__dirname, "files", "Finished.txt"));
  } catch (err) {
    console.error(err);
  }
};
fileOps();

//     fs.rename(
//       path.join(__dirname, "files", "end.txt"),
//       path.join(__dirname, "files", "Finished.txt"),
//       (err) => {
//         if (err) throw err;
//         console.log("Finished completed");
//       }
//     );
//   }
// );

process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error ${err}`);
  process.exit(1);
});
