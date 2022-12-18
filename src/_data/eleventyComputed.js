module.exports = {
  permalink(data) {
    if (data.permalink) return data.permalink;

    if (data.page.inputPath.includes("webdev/")) {
      return data.page.inputPath
        .replace("webdev/", "")
        .replace(".md", "/index.html");
    }

    return null;
  },
  layout({ page }) {
    if (page.fileSlug === "feed") return null;

    if (page.filePathStem.includes("notes/")) return "note.html";

    return "layout.html";
  },
};
