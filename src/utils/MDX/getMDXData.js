import { format, parseISO } from "date-fns";
import matter from "gray-matter";
import path from "path";
import fs from "fs";

function getMDXFiles(dir) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  }
  
  function readMDXFile(filePath) {
    let rawContent = fs.readFileSync(filePath, "utf-8");
    return matter(rawContent);
  }
  
  export function getMDXData(dir) {
    let mdxFiles = getMDXFiles(dir);
  
    return mdxFiles.map((file) => {
      let { data: metadata, content } = readMDXFile(path.join(dir, file));
      let slug = path.basename(file, path.extname(file));
  
      return {
        metadata: { ...metadata, date: metadata.date ? format(parseISO(metadata.date), "dd MMM yyyy") : null },
        slug,
        content,
      };
    });
  }