const argv = process.argv.slice(2);
const { writeFile, statSync } = require("fs");
const request = require("request");
const readline = require("readline");
// const { stdin: input, stdout: output } = process;
// const rl = readline.createInterface({ input, output });
const URL = argv[0];
const FILE = argv[1];

request(URL, (error, response, body) => {
  try {
    writeFile(FILE, body, "utf8", () => {
      const sizeInByte = statSync(FILE).size;
      console.log(`Downloaded and saved ${sizeInByte} bytes to ${FILE}`);
    });

    // rl.question("Do you want to replace the existing file?", (answer) => {
    //   if (answer === "yes") {
    //     writeFile(FILE, body, "utf8", () => {
    //       const sizeInByte = statSync(FILE).size;
    //       console.log(`Downloaded and saved ${sizeInByte} bytes to ${FILE}`);
    //     });
    //   }
    //   rl.close();
    // });
  } catch (error) {
    console.log(error);
  }
});
