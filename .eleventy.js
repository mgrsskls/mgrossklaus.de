const plugins = [
  require("@11ty/eleventy-plugin-rss"),
  require("@11ty/eleventy-plugin-syntaxhighlight"),
];

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "dist/css/*": "css" });
  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  eleventyConfig.addPassthroughCopy("notes/**/*.png");

  eleventyConfig.addGlobalData("layout", "layout.html");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["notes/*.md"]);
  });

  eleventyConfig.addShortcode("isoString", (date) => date.toISOString());

  plugins.forEach((plugin) => eleventyConfig.addPlugin(plugin));

  return {
    dir: {
      includes: "src/html",
    },
  };
};
