import { PDFDocument, rgb, StandardFonts, PDFPage } from "pdf-lib";
import { DiplomaLayout } from "../assets";

async function modifyPdf(graduates: Certificate[]) {
  const url = DiplomaLayout;
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const layoutDoc = await PDFDocument.load(existingPdfBytes);
  const pdfDoc = await PDFDocument.create();
  const TimesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const [layoutPage] = await pdfDoc.copyPages(layoutDoc, [0]);

  // let currPage = pdfDoc.addPage(layoutPage);
  const { width, height } = layoutPage.getSize();

  const drawText = (
    page: PDFPage,
    text: string,
    textSize: number,
    xOffset: number,
    yOffset: number
  ) => {
    let textW = TimesRomanBold.widthOfTextAtSize(text, textSize);
    let textH = TimesRomanBold.heightAtSize(textSize);

    page.drawText(text, {
      x: width / 2 - textW / 2 + xOffset,
      y: height / 2 - textH / 2 + yOffset,
      size: textSize,
      font: TimesRomanBold,
      color: rgb(0, 0, 0),
    });
  };
  let i = 0;
  for (let graduate of graduates) {
    const [layoutPage] = await pdfDoc.copyPages(layoutDoc, [0]);
    const currPage = pdfDoc.addPage(layoutPage);

    drawText(currPage, graduate.studentName, 50, 0, 55);
    drawText(currPage, graduate.studentNum, 14, 0, 15);
    drawText(currPage, graduate.program, 32, 0, -43);
    drawText(currPage, graduate?.specialization!, 20, 0, -73);
    drawText(currPage, graduate.gradDate, 14, 134, -160);
    drawText(currPage, `Holify Token: ${graduate.tokenId}`, 20, 0, -230);
    // DEAN
    drawText(currPage, graduate.dean, 20, -240, -210);
    drawText(currPage, `Dean, ${graduate.school}`, 14, -250, -230);
    // PRESIDENT
    drawText(currPage, graduate.president, 20, 240, -210);
    drawText(currPage, "University President", 14, 250, -230);
    console.log(currPage);
    i++;
  }

  const pdfBytes = await pdfDoc.save();
  const docUrl = URL.createObjectURL(
    new Blob([pdfBytes], { type: "application/pdf" })
  );
  return docUrl;
}

export default modifyPdf;
