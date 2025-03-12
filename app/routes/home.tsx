import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Worker } from "@react-pdf-viewer/core"
import BookReader from "~/pages/bookreader";

// Specify the worker's location

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export default function Home() {

  const pdfUrl =  "/CGAssignment.pdf";
  const samplePdf = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";


  return  (

      <div>
        <BookReader />
      </div>

  );
}
