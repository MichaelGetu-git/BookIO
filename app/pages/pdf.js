import { GlobalWorkerOptions } from "pdfjs-dist";

const pdfjsVersion = "3.4.120"; // Check the latest version on npm
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
