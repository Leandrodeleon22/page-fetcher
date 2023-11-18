const argv = process.argv.slice(2);
const { writeFile, statSync, readFile, existsSync, lstat } = require("fs");
const request = require("request");
const readline = require("readline");
const path = require("path");
const { stdin: input, stdout: output } = process;
const rl = readline.createInterface({ input, output });
const URL = argv[0];
const FILE = argv[1];

request(URL, (error, response, body) => {
  if (error) {
    console.log("Invalid credentials");
    return;
  }

  //   lstat(FILE, (err, stats) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }

  //     console.log(`Is file: ${stats.isFile()}`);
  //     console.log(`Is directory: ${stats.isDirectory()}`);
  //     console.log(`Is symbolic link: ${stats.isSymbolicLink()}`);
  //     console.log(`Is FIFO: ${stats.isFIFO()}`);
  //     console.log(`Is socket: ${stats.isSocket()}`);
  //     console.log(`Is character device: ${stats.isCharacterDevice()}`);
  //     console.log(`Is block device: ${stats.isBlockDevice()}`);
  //   });

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

  writeFile(FILE, body, "utf8", () => {
    const sizeInByte = statSync(FILE).size;
    console.log(`Downloaded and saved ${sizeInByte} bytes to ${FILE}`);
    rl.close();
  });
});
