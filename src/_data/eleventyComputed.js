const fs = require("fs");
const path = require("path");
const markdownIt = require("markdown-it");
const markdownItFrontMatter = require("markdown-it-front-matter");

const MD = markdownIt({ html: true }).use(markdownItFrontMatter, () => {});

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

		return "html.html";
	},

	css({ page }) {
		if (["/index", "/tag"].includes(page.filePathStem)) return "index.css";
		if (page.filePathStem.includes("notes/")) return "note.css";
	},

	active({ page }) {
		if (page.filePathStem === "/work") return "work";
		if (page.filePathStem === "/about") return "about";
		if (
			["/index", "/tag"].includes(page.filePathStem) ||
			page.filePathStem.includes("notes/")
		)
			return "notes";
	},

	title(data) {
		if (data.title) return data.title;

		return "Michael Großklaus";
	},

	isNote(data) {
		return data.layout === "note-detail.html";
	},

	excerpt(data) {
		if (!data.blog) return null;

		const fileContent = fs.readFileSync(
			path.join(process.cwd(), data.page.inputPath),
			"utf8"
		);
		const tokens = MD.parse(fileContent, {});

		const indexOpeningTag = tokens.findIndex(
			({ type, tag }) => type === "paragraph_open" && tag === "p"
		);

		if (indexOpeningTag < 0) return null;
		if (!tokens[indexOpeningTag + 1]?.content) return null;

		return MD.render(`${tokens[indexOpeningTag + 1].content} […]`);
	},
};
