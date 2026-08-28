"use strict";

const assert = require("assert");
const path = require("path");

const {renderWechatHtml} = require("../headless/renderWechat");

async function main() {
  const markdown = `# 测试标题

>> 二级引用

公式：$x^2$。

$$
y = \beta x
$$

| 变量 | 系数 |
| --- | ---: |
| x | 0.143 |

- 无序条目一
- 无序条目二

1. 有序条目一
2. 有序条目二

![表 1：测试表](https://example.com/table.png)
`;

  const html = await renderWechatHtml(markdown, {
    theme: "frowang",
    imageMaxWidth: "88%",
  });

  assert.match(html, /data-tool="mdnice编辑器"/);
  assert.match(html, /font-size:\s*24px/);
  assert.match(html, /class="multiquote-2"/);
  assert.match(html, /class="table-container"/);
  assert.match(html, /<svg\b/);
  assert.doesNotMatch(html, /\$x\^2\$/);
  assert.match(html, /max-width:\s*88%/);
  assert.match(html, /max-width:\s*100%\s*!important/);
  assert.doesNotMatch(html, /<(?:ul|ol)\b[^>]*>\s+<li\b/i);
  assert.match(html, /<p style="[^"]*font-family:/i);
  assert.match(html, /<li><section style="[^"]*font-family:/i);
  assert.doesNotMatch(html, /<style\b/i);
  assert.doesNotMatch(html, /<script\b/i);

  const projectRoot = path.resolve(__dirname, "..", "..");
  const reportPath = path.join(
    projectRoot,
    "paperpress",
    "outputs_gemini37",
    "EJ2025 ｜ 出口减速的犯罪诱因：来自数百万份司法裁判文书的经验证据.md",
  );
  const reportHtml = await renderWechatHtmlFile(reportPath);
  assert.strictEqual((reportHtml.match(/<img\b/g) || []).length, 14);
  console.log(`OK: ${reportHtml.length} chars, 14 images`);
}

async function renderWechatHtmlFile(reportPath) {
  const fs = require("fs");
  return renderWechatHtml(fs.readFileSync(reportPath, "utf8"), {
    theme: "frowang",
    imageMaxWidth: "88%",
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
