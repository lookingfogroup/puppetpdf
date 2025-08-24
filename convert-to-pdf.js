const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function convertHtmlToPdf() {
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-web-security",
      ],
    });

    const page = await browser.newPage();

    // Read the HTML file
    const htmlPath = path.join(__dirname, "cam_porterfield_resume.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf8");

    // Set the HTML content
    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    // Generate PDF with more aggressive margins
    const pdfPath = path.join(__dirname, "Cam_Porterfield_Resume.pdf");
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.25in",
        bottom: "0.25in",
        left: "0.4in",
        right: "0.4in",
      },
    });

    await browser.close();

    console.log(`PDF successfully generated: ${pdfPath}`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

convertHtmlToPdf();
