import pluginCssNano from "cssnano";
import pluginImport from "postcss-import";

export default {
  map: {
    inline: false,
  },
  plugins: [pluginImport(), pluginCssNano()],
};
