"use strict";

const fs = require("fs");
const path = require("path");

const highlightjs = require("highlight.js");
const juice = require("juice");
const MarkdownIt = require("markdown-it");
const markdownItDeflist = require("markdown-it-deflist");
const markdownItImplicitFigures = require("markdown-it-implicit-figures");
const markdownItImsize = require("markdown-it-imsize");
const markdownItRuby = require("markdown-it-ruby");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const THEME_PATHS = {
  frowang: path.join(PROJECT_ROOT, "src", "template", "markdown", "frowang.js"),
  normal: path.join(PROJECT_ROOT, "src", "template", "markdown", "normal.js"),
};

let mathJaxPromise;

function readTemplateLiteral(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const start = source.indexOf("`");
  const end = source.lastIndexOf("`");
  if (start < 0 || end <= start) {
    throw new Error(`无法读取主题模板：${filePath}`);
  }
  return source.slice(start + 1, end);
}

function getMathJax() {
  if (!mathJaxPromise) {
    const mathJaxRoot = path.dirname(require.resolve("mathjax"));
    mathJaxPromise = require("mathjax").init({
      loader: {
        paths: {mathjax: mathJaxRoot},
        load: ["input/tex", "output/svg"],
      },
      svg: {fontCache: "none"},
    });
  }
  return mathJaxPromise;
}

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function mathSvg(mathJax, latex, display) {
  const node = mathJax.tex2svg(latex, {display});
  const adaptor = mathJax.startup.adaptor;
  const container = adaptor.outerHTML(node);
  const svgStart = container.indexOf("<svg");
  const svgEnd = container.lastIndexOf("</svg>");
  if (svgStart < 0 || svgEnd < svgStart) {
    throw new Error(`MathJax 未生成 SVG：${latex}`);
  }
  const svg = container.slice(svgStart, svgEnd + 6);
  const cls = display ? "block-equation" : "inline-equation";
  const tag = display ? "section" : "span";
  return `<${tag} class="${cls}" data-formula="${escapeAttribute(latex)}">${svg}</${tag}>`;
}

function mathPlugin(md, mathJax) {
  function isValidDelimiter(state, pos) {
    const prev = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
    const next = pos + 1 <= state.posMax ? state.src.charCodeAt(pos + 1) : -1;
    return {
      canOpen: next !== 0x20 && next !== 0x09,
      canClose: prev !== 0x20 && prev !== 0x09 && !(next >= 0x30 && next <= 0x39),
    };
  }

  function inlineRule(state, silent) {
    if (state.src[state.pos] !== "$" || state.src[state.pos + 1] === "$") return false;
    const opening = isValidDelimiter(state, state.pos);
    if (!opening.canOpen) return false;

    const start = state.pos + 1;
    let match = start;
    while ((match = state.src.indexOf("$", match)) !== -1) {
      let escapes = 0;
      let cursor = match - 1;
      while (cursor >= 0 && state.src[cursor] === "\\") {
        escapes += 1;
        cursor -= 1;
      }
      if (escapes % 2 === 0) break;
      match += 1;
    }
    if (match < 0 || match === start || !isValidDelimiter(state, match).canClose) return false;

    if (!silent) {
      const token = state.push("math_inline", "math", 0);
      token.content = state.src.slice(start, match);
    }
    state.pos = match + 1;
    return true;
  }

  function blockRule(state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (state.src.slice(pos, pos + 2) !== "$$") return false;
    if (silent) return true;

    let firstLine = state.src.slice(pos + 2, max);
    let lastLine = "";
    let nextLine = startLine;
    let found = firstLine.trim().endsWith("$$");
    if (found) firstLine = firstLine.trim().slice(0, -2);

    while (!found && ++nextLine < endLine) {
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      const line = state.src.slice(pos, max);
      const closeAt = line.lastIndexOf("$$");
      if (closeAt >= 0 && line.slice(closeAt).trim() === "$$") {
        lastLine = line.slice(0, closeAt);
        found = true;
      }
    }

    state.line = nextLine + 1;
    const token = state.push("math_block", "math", 0);
    token.block = true;
    token.content = [firstLine, state.getLines(startLine + 1, nextLine, state.tShift[startLine], true), lastLine]
      .filter(Boolean)
      .join("\n")
      .trim();
    return true;
  }

  md.inline.ruler.after("escape", "math_inline", inlineRule);
  md.block.ruler.after("blockquote", "math_block", blockRule, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  });
  md.renderer.rules.math_inline = (tokens, index) => mathSvg(mathJax, tokens[index].content, false);
  md.renderer.rules.math_block = (tokens, index) => `${mathSvg(mathJax, tokens[index].content, true)}\n`;
}

function headingSpanPlugin(md) {
  md.core.ruler.push("heading_span", (state) => {
    for (let index = 0; index < state.tokens.length - 1; index += 1) {
      if (state.tokens[index].type !== "heading_open" || state.tokens[index + 1].type !== "inline") continue;
      const inline = state.tokens[index + 1];
      if (!inline.content) continue;
      const before = new state.Token("html_inline", "", 0);
      before.content = '<span class="prefix"></span><span class="content">';
      const after = new state.Token("html_inline", "", 0);
      after.content = '</span><span class="suffix"></span>';
      inline.children.unshift(before);
      inline.children.push(after);
      index += 2;
    }
  });
}

function tableContainerPlugin(md) {
  md.core.ruler.push("table_container", (state) => {
    const tokens = [];
    for (const token of state.tokens) {
      if (token.type === "table_open") {
        const open = new state.Token("html_inline", "", 0);
        open.content = '<section class="table-container">';
        tokens.push(open);
      }
      tokens.push(token);
      if (token.type === "table_close") {
        const close = new state.Token("html_inline", "", 0);
        close.content = "</section>";
        tokens.push(close);
      }
    }
    state.tokens = tokens;
  });
}

function multiquotePlugin(md) {
  md.core.ruler.push("blockquote_class", (state) => {
    let depth = 0;
    let outer;
    for (const token of state.tokens) {
      if (token.type === "blockquote_open") {
        if (depth === 0) outer = token;
        depth += 1;
      } else if (depth > 0) {
        outer.attrs = [["class", `multiquote-${depth}`]];
        depth = 0;
      }
    }
  });
}

function listSectionPlugin(md) {
  md.renderer.rules.list_item_open = () => "<li><section>";
  md.renderer.rules.list_item_close = () => "</section></li>";
}

function createParser(mathJax) {
  const md = new MarkdownIt({
    html: true,
    highlight: (code, language) => {
      const lang = language || "bash";
      if (highlightjs.getLanguage(lang)) {
        try {
          const formatted = highlightjs
            .highlight(lang, code, true)
            .value.replace(/\n/g, "<br/>")
            .replace(/\s/g, "&nbsp;")
            .replace(/span&nbsp;/g, "span ");
          return `<pre class="custom"><code class="hljs">${formatted}</code></pre>`;
        } catch (error) {
          // Fall through to escaped plain code.
        }
      }
      return `<pre class="custom"><code class="hljs">${md.utils.escapeHtml(code)}</code></pre>`;
    },
  });

  md.use(headingSpanPlugin)
    .use(tableContainerPlugin)
    .use(mathPlugin, mathJax)
    .use(markdownItRuby)
    .use(markdownItImplicitFigures, {figcaption: true})
    .use(markdownItDeflist)
    .use(listSectionPlugin)
    .use(multiquotePlugin)
    .use(markdownItImsize);
  return md;
}

function validateOptions(options) {
  const theme = options.theme || "frowang";
  if (!THEME_PATHS[theme]) throw new Error(`未知主题：${theme}`);
  const imageMaxWidth = options.imageMaxWidth || "88%";
  if (!/^\d+(?:\.\d+)?%$/.test(imageMaxWidth)) {
    throw new Error(`imageMaxWidth 必须是百分比，例如 88%：${imageMaxWidth}`);
  }
  return {theme, imageMaxWidth};
}

async function renderWechatHtml(markdown, options = {}) {
  if (typeof markdown !== "string") throw new TypeError("markdown 必须是字符串");
  const {theme, imageMaxWidth} = validateOptions(options);
  const mathJax = await getMathJax();
  const parser = createParser(mathJax);
  const body = parser.render(markdown);
  const root = `<section id="nice" data-tool="mdnice编辑器" data-website="https://www.mdnice.com">${body}</section>`;

  const basicCss = readTemplateLiteral(path.join(PROJECT_ROOT, "src", "template", "basic.js"));
  const themeCss = readTemplateLiteral(THEME_PATHS[theme]);
  const codeCss = readTemplateLiteral(path.join(PROJECT_ROOT, "src", "template", "code", "github.js"));
  const imageCss = `\n#nice img { width: auto; max-width: ${imageMaxWidth}; height: auto; }\n`;
  const formulaCss = `
#nice .block-equation { display: block; max-width: 100%; overflow-x: auto; }
#nice .block-equation svg { width: auto; max-width: 100% !important; height: auto; }
#nice .inline-equation { display: inline-block; max-width: 100%; overflow-x: auto; vertical-align: middle; }
#nice .inline-equation svg { width: auto; max-width: 100% !important; height: auto; }
`;
  const html = juice.inlineContent(root, basicCss + themeCss + codeCss + imageCss + formulaCss, {
    inlinePseudoElements: true,
    preserveImportant: true,
  });
  // 微信 draft/add 会把列表起始标签后的纯空白节点重写成一个空的首项。
  return html.replace(/(<(?:ul|ol)\b[^>]*>)\s+(?=<li\b)/gi, "$1");
}

module.exports = {renderWechatHtml};
