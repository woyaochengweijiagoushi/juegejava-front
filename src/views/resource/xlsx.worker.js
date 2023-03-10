import XLSX, { read, utils } from "xlsx";

onmessage = (e) => {
  console.error(`parse start: ${Date.now()}`);
  const reader = new FileReader();

  reader.onload = (e) => {
    const book = read(e.target.result, { type: "binary" });

    postMessage(
      book.SheetNames.map((name) => utils.sheet_to_json(book.Sheets[name]))
    );
    console.error(`parse end: ${Date.now()}`);
  };

  reader.readAsBinaryString(e.data);
};
