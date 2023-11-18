const argv = process.argv.slice(2);
const { writeFile, statSync, readFile, existsSync } = require("fs");
const request = require("request");
const readline = require("readline");
const { stdin: input, stdout: output } = process;
const rl = readline.createInterface({ input, output });
const URL = argv[0];
const FILE = argv[1];
let currentFile;

request(URL, (error, response, body) => {
  if (error) {
    console.log("Invalid credentials");
    return;
  }

  if (existsSync(FILE)) {
    rl.question(
      "Do you want to replace the existing file? type 'y' if yes\n",
      (answer) => {
        if (answer === "y") {
          writeFile(FILE, body, "utf8", () => {
            const sizeInByte = statSync(FILE).size;
            console.log(`Downloaded and saved ${sizeInByte} bytes to ${FILE}`);
          });
        }
        rl.close();
      }
    );
    return;
  }

  try {
    writeFile(FILE, body, "utf8", () => {
      const sizeInByte = statSync(FILE).size;
      console.log(`Downloaded and saved ${sizeInByte} bytes to ${FILE}`);
    });
  } catch (error) {
    console.log(error);
  }
});
