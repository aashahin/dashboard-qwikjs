import markdownit from "markdown-it";

export default () => {
  return markdownit({
    html: true,
    linkify: true,
    typographer: true,
  });
};