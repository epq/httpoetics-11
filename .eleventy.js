const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  // Add your Eleventy configuration here
  
  // Example configuration:
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addWatchTarget("src/css");

  eleventyConfig.addPassthroughCopy("src/**/style.css");
  eleventyConfig.addPassthroughCopy("src/**/script.js");

  eleventyConfig.addPlugin(syntaxHighlight);

  // Loop over a range of numbers and add a collection for each w<number> directory
  for (let i = 1; i <= 12; i++) {
    eleventyConfig.addCollection(`w${i}`, function(collectionApi) {
      return collectionApi.getFilteredByGlob(`src/w${i}/**/*.{html,md}`);
    });
  }

eleventyConfig.addFilter("prependPath", function(value) {
  return `/httpoetics${value}`;
});
  
  // Return the configuration object
  return {
    url: "https://jordanne.ca",
    pathprefix: "/httpoetics",
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk", // use Nunjucks for Markdown files
    htmlTemplateEngine: "njk", // use Nunjucks for HTML files
    templateFormats: ["md", "njk", "html"], // use Nunjucks for .md, .njk, and .html files
    dir: {
      input: "src",
      output: "../httpoetics"
    }
  };
};
