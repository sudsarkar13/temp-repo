const sitemap = require("nextjs-sitemap-generator");
const path = require("path");

const options = {
  baseUrl: "https://example.com",
  pagesDirectory: path.join(__dirname, "pages"),
  targetDirectory: path.join(__dirname, "..", "public"),
  ignoredExtensions: ["ts", "tsx", "js", "jsx"],
};
sitemap(options);

// sitemap({
//   baseUrl: "https://example.com",
//   pagesDirectory: path.join(__dirname, "pages"),
//   targetDirectory: path.join(__dirname, "..", "public"),
//   ignoredExtensions: ["ts", "tsx", "js", "jsx"],
// });