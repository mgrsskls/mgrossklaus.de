import htmlmin from "html-minifier";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

import transformImages from "./src/transform-images.js";

const input = "src";
const output = "_site";

export default function (eleventyConfig) {
	/* Global Data */
	eleventyConfig.addGlobalData("origin", "https://www.mgrossklaus.de");

	/* Passthrough Copy */
	eleventyConfig.addPassthroughCopy({
		"src/img": "img",
		"src/favicons": "/",
		"src/js": "js",
	});
	eleventyConfig.addPassthroughCopy(
		process.env.NODE_ENV === "production"
			? { "dist/css/*": "css" }
			: { "src/css": "css" }
	);
	eleventyConfig.addPassthroughCopy(`${input}/notes/**/*.png`);

	/* Collections */
	eleventyConfig.addCollection("notes", function (collection) {
		return collection.getFilteredByGlob([`${input}/notes/**/*.md`]);
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

	/* Shortcodes */
	eleventyConfig.addShortcode("isoString", (date) => date.toISOString());

	/* Plugins */
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight);

	/* Transforms */
	eleventyConfig.addTransform("transformImages", async function (content) {
		if (this.outputPath && this.outputPath.endsWith(".html")) {
			return await transformImages(content, this.outputPath, output, input);
		}
		return content;
	});

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
}

export const config = {
	dir: {
		input,
		output,
		includes: "html",
	},
};
