import FileType from "file-type";
import core from "file-type/core";

export class FileValidator {
  private acceptedFormats: string[];

  constructor(acceptedFormats: string[]) {
    this.acceptedFormats = acceptedFormats;
  }

  async checkFileSignatureFor(filePath: string) {
    try {
      filePath = filePath.trim();

      if ("" === filePath) {
        console.log("File path is empty.");
        return null;
      }

      var fileInfo = await FileType.fromFile(filePath);
      if(undefined === fileInfo) {
        console.log("No match.");
        return null;
      }

      return fileInfo;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  checkForMIME(fileInfo: core.FileTypeResult) {
    return (this.acceptedFormats.indexOf(fileInfo.mime) > -1);
  }

  // add on more functions you want... (:
}
