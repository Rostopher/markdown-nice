#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const {renderWechatHtml} = require("../headless/renderWechat");

function parseArgs(argv) {
  const args = {theme: "frowang", imageMaxWidth: "88%"};
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!args.input && !value.startsWith("--")) args.input = value;
    else if (value === "--output" || value === "-o") args.output = argv[++index];
    else if (value === "--theme") args.theme = argv[++index];
    else if (value === "--image-max-width") args.imageMaxWidth = argv[++index];
    else if (value === "--stdout") args.stdout = true;
    else throw new Error(`未知参数：${value}`);
  }
  if (!args.input) {
    throw new Error(
      "用法：node scripts/render-wechat.js <report.md> [--theme frowang] " +
        "[--image-max-width 88%] [-o report.wechat.html] [--stdout]",
    );
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputPath = path.resolve(args.input);
  const markdown = fs.readFileSync(inputPath, "utf8");
  const html = await renderWechatHtml(markdown, args);
  if (args.stdout) {
    process.stdout.write(html);
    return;
  }
  const outputPath = args.output
    ? path.resolve(args.output)
    : inputPath.replace(/\.md$/i, ".wechat.html");
  fs.writeFileSync(outputPath, html, "utf8");
  const imageCount = (html.match(/<img\b/g) || []).length;
  console.log(`${outputPath} (${html.length} chars, ${imageCount} images)`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});

