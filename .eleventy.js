const plugins = [
  require("@11ty/eleventy-plugin-rss"),
  require("@11ty/eleventy-plugin-syntaxhighlight"),
];

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css/**/*.css");
  eleventyConfig.addPassthroughCopy("*.avif");
  eleventyConfig.addPassthroughCopy("*.webp");
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.png");

  eleventyConfig.addGlobalData("layout", "layout.html");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["notes/*.md"]);
  });

  eleventyConfig.addShortcode("isoString", (date) => date.toISOString());

  plugins.forEach((plugin) => eleventyConfig.addPlugin(plugin));
};
