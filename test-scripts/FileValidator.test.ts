import { FileValidator } from "../model/FileValidator";
import core from "file-type/core";

describe("FileValidator", () => {
  // constant variables
  const ACCEPTABLE_FORMAT = ["image/jpeg", "application/pdf"];
  const JPEG_FILE_PATH = "resources/image1.jpeg";
  const PNG_TO_CSV_FILE_PATH = "resources/fake_pdf.pdf";

  // constructor
  const fv = new FileValidator(ACCEPTABLE_FORMAT);

  describe("checkFileSignatureFor(...)", () => {
    test('should throw error when filePath is just an empty string', () => {
      fv.checkFileSignatureFor("").then(function(fileInfo?: any) {
        expect(fileInfo).toBeNull();
      });
    });

    test('should return { ext: "jpg", mime: "image/jpeg" } when .jpeg file is passed in', () => {
      const expectedObj = { ext: 'jpg', mime: 'image/jpeg' };
  
      fv.checkFileSignatureFor(JPEG_FILE_PATH).then(function(fileInfo?: any) {
        expect(fileInfo).not.toBeNull();
        expect(JSON.stringify(fileInfo)).toBe(JSON.stringify(expectedObj));
      });
    });

    test('should return { ext: "png", mime: "image/png" } when .png file with a .csv extension is passed in', () => {
      const expectedObj = { ext: 'png', mime: 'image/png' };
      const unexpectedObj = { ext: 'csv', mime: 'text/csv' };
  
      fv.checkFileSignatureFor(PNG_TO_CSV_FILE_PATH).then(function(fileInfo?: any) {
        expect(fileInfo).not.toBeNull();
        expect(JSON.stringify(fileInfo)).not.toBe(JSON.stringify(unexpectedObj));
        expect(JSON.stringify(fileInfo)).toBe(JSON.stringify(expectedObj));
      });
    });
  });

  describe("checkForMIME(...)", () => {
    test('should TRUE when the extension is JPG & mime is IMAGE/JPEG', () => {
      const fileInfo: core.FileTypeResult = { ext: 'jpg', mime: 'image/jpeg' };

      expect(fv.checkForMIME(fileInfo)).toBeTruthy();
    });

    test('should TRUE when the extension is PDF & mime is APPLICATION/PDF', () => {
      const fileInfo: core.FileTypeResult = { ext: 'pdf', mime: 'application/pdf' };

      expect(fv.checkForMIME(fileInfo)).toBeTruthy();
    });

    test('should FALSE when the extension is PNG & mime is IMAGE/PNG', () => {
      const fileInfo: core.FileTypeResult = { ext: 'png', mime: 'image/png' };

      expect(fv.checkForMIME(fileInfo)).toBeFalsy();
    });
  });
});
