export default `/* frowang·博客版 主题
 * 基于 frowang.js（公众号"水墨金"）改造，给 personal-site 博客窄栏使用。
 * 与公众号版的差异：字号/行距收敛到网页阅读习惯，去掉列表 section 上
 * 由 basic.js "#nice p" 继承来的 padding（网页上会把两行列表顶开 72px）。
 * 配色与母题一致：宣纸底 / 墨色 / 金色点缀。
 */

/* 全局属性 */
#nice {
  font-size: 16px;
  color: #34313B;
  line-height: 1.7;
  letter-spacing: 0.01em;
  padding: 0;
  font-family: Georgia, 'Times New Roman', 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'SimSun', 'PingFang SC', serif;
}

/* 段落 */
#nice p {
  font-size: 16px;
  color: #34313B;
  line-height: 1.7;
  letter-spacing: 0.01em;
  padding-top: 4px;
  padding-bottom: 4px;
  margin: 0;
  font-family: Georgia, 'Times New Roman', 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'SimSun', 'PingFang SC', serif;
}

/* 一级标题（页内一般不用 h1，保留作兜底） */
#nice h1 {
  font-size: 22px;
  color: #17151F;
  font-weight: bold;
  text-align: center;
  line-height: 1.4;
  letter-spacing: 0.5px;
  margin-top: 24px;
  margin-bottom: 14px;
  font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'STSong', Georgia, serif;
}

/* 二级标题：文章三个"部分"的分节 */
#nice h2 {
  font-size: 20px;
  color: #17151F;
  font-weight: bold;
  line-height: 1.4;
  letter-spacing: 0.3px;
  margin-top: 40px;
  margin-bottom: 14px;
  padding-top: 20px;
  border-top: 1px solid #E8E4DA;
  font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'STSong', Georgia, serif;
}

/* 三级标题 */
#nice h3 {
  font-size: 17px;
  color: #17151F;
  font-weight: bold;
  line-height: 1.5;
  margin-top: 24px;
  margin-bottom: 8px;
}

/* 四级标题：blog 网页版正文里有大量 h4 小节，按正常标题渲染；
   眉题式的小号金字样式只保留在 frowang 公众号主题里，两边互不影响 */
#nice h4 {
  font-size: 16px;
  color: #17151F;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 1.5;
  margin-top: 26px;
  margin-bottom: 6px;
  font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'STSong', Georgia, serif;
}

#nice h5,
#nice h6 {
  font-size: 16px;
  color: #17151F;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 8px;
}

/* 无序列表 */
#nice ul {
  padding-left: 1.5em;
  margin-top: 6px;
  margin-bottom: 12px;
}

/* 有序列表 */
#nice ol {
  padding-left: 1.5em;
  margin-top: 6px;
  margin-bottom: 12px;
}

/* 列表内容——关键差异：不再继承 #nice p 的 padding，行距收紧 */
#nice li section {
  font-size: 16px;
  color: #34313B;
  line-height: 1.65;
  letter-spacing: 0.01em;
  margin-top: 2px;
  margin-bottom: 2px;
  padding-top: 0;
  padding-bottom: 0;
  font-family: Georgia, 'Times New Roman', 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'SimSun', 'PingFang SC', serif;
}

/* 一级引用：纸色底 + 金色左竖条（frowang 签名） */
#nice .multiquote-1 {
  display: block;
  background: #FAF9F6;
  border-left: 3px solid #c8a057;
  padding: 10px 14px;
  margin-top: 14px;
  margin-bottom: 14px;
}

#nice .multiquote-1 p {
  font-size: 15px;
  color: #5F5B66;
  line-height: 1.7;
  padding: 0;
  margin: 0;
}

/* 二级引用：免责/广告位 */
#nice .multiquote-2 {
  display: block;
  background: #F8F4EA;
  border: 1px solid #E9DFC8;
  border-radius: 6px;
  box-shadow: none;
  padding: 10px 14px;
  margin-top: 14px;
  margin-bottom: 14px;
}

#nice .multiquote-2 p {
  font-size: 13px;
  color: #7E7A85;
  line-height: 1.65;
  padding: 0;
  margin: 0;
}

/* 三级引用 */
#nice .multiquote-3 {
  background: #FAF9F6;
  padding: 12px;
  margin-top: 14px;
  margin-bottom: 14px;
}

#nice .multiquote-3 p {
  color: #5F5B66;
}

/* 链接：深金 */
#nice a {
  color: #b8903f;
  text-decoration: none;
  border-bottom: none;
  font-weight: normal;
}

/* 加粗：墨色强调——金色留给链接、引用竖线、脚注等结构性元素，避免高密度加粗稀释强调力 */
#nice strong {
  font-weight: bold;
  color: #17151F;
}

/* 斜体：中文伪斜显乱，转墨灰辅助色 */
#nice em {
  font-style: normal;
  color: #7E7A85;
}

#nice em strong {
  font-weight: bold;
  color: #17151F;
}

#nice del {
  color: #A9A5AD;
}

/* 分隔线 */
#nice hr {
  height: 1px;
  border: none;
  border-top: 1px solid #E8E4DA;
  margin-top: 20px;
  margin-bottom: 20px;
}

/* 图片 */
#nice img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  border-radius: 6px;
}

/* 图注：灰色小字居中 */
#nice figcaption {
  margin-top: 6px;
  text-align: center;
  color: #A9A5AD;
  font-size: 13px;
  line-height: 1.5;
}

/* 行内代码：纸色底 + 深金字 */
#nice p code,
#nice li code {
  font-size: 15px;
  color: #b8903f;
  background-color: #F6F4EF;
  padding: 2px 5px;
  border-radius: 4px;
  margin: 0 2px;
  font-family: 'JetBrains Mono', Consolas, Monaco, Menlo, monospace;
  word-break: break-all;
}

/* 代码块：浅色纸底 */
#nice pre code {
  display: block;
  background: #FAF9F6;
  border: 1px solid #E8E4DA;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.65;
  color: #34313B;
  font-family: 'JetBrains Mono', Consolas, Monaco, Menlo, monospace;
}

/* 表格单元格 */
#nice table tr th,
#nice table tr td {
  font-size: 15px;
  border: 1px solid #E8E4DA;
  padding: 6px 12px;
  text-align: left;
  color: #34313B;
}

#nice table tr th {
  font-weight: bold;
  color: #17151F;
  background-color: #F6F4EF;
}

#nice table tr:nth-child(2n) {
  background-color: #FAF9F6;
}

/* 脚注 */
#nice .footnote-word { color: #b8903f; font-weight: bold; }
#nice .footnote-ref { color: #b8903f; font-weight: bold; }
#nice .footnotes-sep:before { color: #17151F; font-weight: bold; }
#nice .footnote-num { color: #A9A5AD; }
#nice .footnote-item p { font-size: 13px; color: #7E7A85; line-height: 1.7; }
#nice .footnote-item p em { color: #A9A5AD; }

/* 行间公式 */
#nice .block-equation { margin-top: 14px; margin-bottom: 14px; }
#nice .block-equation svg { max-width: 300% !important; }
#nice .inline-equation svg {}
`;
