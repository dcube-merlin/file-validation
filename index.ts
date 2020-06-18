import { FileValidator } from "./model/FileValidator";

const file_format_list = ["image/jpeg", "text/csv"];

const fileValidator = new FileValidator(file_format_list);

function runFileValidator(filePath: string) {
  fileValidator.checkFileSignatureFor(filePath).then(function(fileInfo: any | null) {
    console.log("=====================");
    console.log("filePath: " + filePath);

    if(null === fileInfo) {
      console.log("File signature not found.");
      console.log("=====================\n\n");
      return;
    }

    console.log(fileInfo);

    if (fileValidator.checkForMIME(fileInfo)) {
      console.log("File signature is VALID.");
    } else {
      console.log("File signature is INVALID.");
    }

    console.log("=====================\n");
  });
}

runFileValidator(""); 

// scenario 1: no such file
runFileValidator("resources/a.jpeg"); 

// scenario 2: existing .jpeg file
runFileValidator("resources/image1.jpeg");

// scenario 3: changed the file extension from .png to .csv
runFileValidator("resources/fake_pdf.pdf"); 
