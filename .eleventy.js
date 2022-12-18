const htmlmin = require("html-minifier");

const plugins = [
  require("@11ty/eleventy-plugin-rss"),
  require("@11ty/eleventy-plugin-syntaxhighlight"),
];

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "dist/css/*": "css", "src/img": "img" });
  eleventyConfig.addPassthroughCopy("src/notes/**/*.png");

  eleventyConfig.addCollection("notes", function (collection) {
    return collection.getFilteredByGlob(["src/notes/*.md"]);
  });
  eleventyConfig.addCollection("tagList", function (collection) {
    const tagSet = new Set();

    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => {
        tagSet.add(tag);
      });
    });

    return [...tagSet].sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  });

  eleventyConfig.addShortcode("isoString", (date) => date.toISOString());

  plugins.forEach((plugin) => eleventyConfig.addPlugin(plugin));

  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }

    return content;
  });

  return {
    dir: {
      input: "src",
      includes: "html",
    },
  };
};
