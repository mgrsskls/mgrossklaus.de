const Image = require("@11ty/eleventy-img");
const path = require("path");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

module.exports = function transformImages(
  htmlString,
  filePath,
  outputDir,
  inputDir
) {
  if (filePath?.endsWith(".html") && htmlString.includes("<img")) {
    const { document } = new JSDOM(htmlString).window;
    const promises = [];

    document.querySelectorAll("article img").forEach(async (image) => {
      if (image.src.endsWith(".jpg") || image.src.endsWith(".png")) {
        promises.push(
          new Promise((resolve) => {
            getImageHTML({
              imageSrc: path.join(inputDir, image.src),
              attrs: image.attributes,
              outputDir,
              inputDir,
            })
              .then((result) => {
                // eslint-disable-next-line no-param-reassign
                image.outerHTML = result;
                resolve();
              })
              .catch((e) => console.error(e));
          })
        );
      }
    });

    return Promise.all(promises).then(async () => {
      return `<!DOCTYPE html>${document.documentElement.outerHTML}`;
    });
  }

  return htmlString;
};

/**
 * @param {object} o
 * @param {string} o.imageSrc
 * @param {object} o.attrs
 * @param {string} o.outputDir
 * @param {string} o.inputDir
 * @returns {Promise<string>}
 */
async function getImageHTML({ imageSrc, attrs, outputDir, inputDir }) {
  let attrStr = "";

  Array.from(attrs).forEach((attr) => {
    if (attr.nodeName !== "src") {
      attrStr += ` ${attr.nodeName}="${attr.nodeValue}"`;
    }
  });

  attrStr += ' loading="lazy" decoding="async"';

  const originalType = imageSrc.endsWith(".png") ? "png" : "jpeg";

  const metadata = await Image(imageSrc, {
    formats: ["avif", "webp", originalType],
    urlPath: path.join("/", path.relative(inputDir, path.dirname(imageSrc))),
    outputDir: path.dirname(
      path.join(outputDir, path.relative(inputDir, imageSrc))
    ),
    filenameFormat(id, src, width, format) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      return `${name}.${format}`;
    },
    useCache: false,
  });

  const lowsrc = metadata[originalType][0];
  const highsrc = metadata[originalType][metadata[originalType].length - 1];

  return `<picture>
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `  <source type="${
            imageFormat[0].sourceType
          }" srcset="${imageFormat
            .map((entry) => entry.srcset.split(" ")[0])
            .join(", ")}">`;
        })
        .join("\n")}
        <img
          src="${lowsrc.url}"
          width="${highsrc.width}"
          height="${highsrc.height}"
          style="aspect-ratio: ${highsrc.width} / ${highsrc.height}"
          ${attrStr}
        >
      </picture>`;
}
