import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  site: "https://" + process.env.WEBSITE + ".ru",
  srcDir: "src/" + process.env.WEBSITE,
  publicDir: "public/" + process.env.WEBSITE,
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [alpinejs(), mdx(), tailwind(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
  },
});
