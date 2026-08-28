export default `/* frowang·水墨金 主题
 * 设计语言来自 frowang.com 前端（web-lunwen/src/assets/styles/main.scss）：
 * 宣纸底 #FAF9F6 / 墨色文字 #34313B / 金色点缀 #c8a057（文字用深金 #b8903f）
 * 金色用量克制：只出现在标题竖条、引用竖条、强调文字、标签底色
 */

/* 全局属性 */
#nice {
  font-size: 17px;
  color: #34313B;
  line-height: 1.85;
  letter-spacing: 0.02em;
  padding: 0 12px;
  font-family: Georgia, 'Times New Roman', 'Songti SC', 'SimSun', 'PingFang SC', serif;
}

/* 段落 */
#nice p {
  font-size: 17px;
  color: #34313B;
  line-height: 1.85;
  letter-spacing: 0.02em;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 0;
  font-family: Georgia, 'Times New Roman', 'Songti SC', 'SimSun', 'PingFang SC', serif;
}

/* 一级标题：论文标题，居中，衬线 */
#nice h1 {
  font-size: 24px;
  color: #17151F;
  font-weight: bold;
  text-align: center;
  line-height: 1.4;
  letter-spacing: 1px;
  margin-top: 32px;
  margin-bottom: 18px;
  font-family: 'Songti SC', 'STSong', 'Noto Serif SC', Georgia, serif;
}

#nice h1 .content {
}

/* 二级标题：章节大标题，衬线大字（约定搭配 h4 眉题使用，不再用竖条——竖条是引用的签名） */
#nice h2 {
  font-size: 22px;
  color: #17151F;
  font-weight: bold;
  line-height: 1.4;
  letter-spacing: 0.5px;
  margin-top: 8px;
  margin-bottom: 18px;
  font-family: 'Songti SC', 'STSong', 'Noto Serif SC', Georgia, serif;
}

#nice h2 .content {
}

/* 三级标题：粗体段首，深墨，不加装饰 */
#nice h3 {
  font-size: 18px;
  color: #17151F;
  font-weight: bold;
  line-height: 1.5;
  margin-top: 28px;
  margin-bottom: 12px;
}

#nice h3 .content {
}

/* 四级标题：章节眉题专用（约定写法：#### 第一章，放在 h2 上方）
 * 金色小字 + 宽字间距，承担章节间的"隔断感"
 */
#nice h4 {
  font-size: 14px;
  color: #b8903f;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 1.5;
  margin-top: 44px;
  margin-bottom: 6px;
}

#nice h5,
#nice h6 {
  font-size: 17px;
  color: #17151F;
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 10px;
}

/* 无序列表 */
#nice ul {
  padding-left: 1.5em;
  margin-top: 8px;
  margin-bottom: 8px;
}

/* 有序列表 */
#nice ol {
  padding-left: 1.5em;
  margin-top: 8px;
  margin-bottom: 8px;
}

/* 列表内容 */
#nice li section {
  font-size: 17px;
  color: #34313B;
  line-height: 1.85;
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: Georgia, 'Times New Roman', 'Songti SC', 'SimSun', 'PingFang SC', serif;
}

/* 一级引用：纸色底 + 金色左竖条（frowang 引用风格） */
#nice .multiquote-1 {
  display: block;
  background: #FAF9F6;
  border-left: 3px solid #c8a057;
  padding: 12px 16px;
  margin-top: 18px;
  margin-bottom: 18px;
}

/* 一级引用文字：墨灰，小一号 */
#nice .multiquote-1 p {
  font-size: 15px;
  color: #5F5B66;
  line-height: 1.8;
  padding: 0;
  margin: 0;
}

/* 二级引用：免责声明/广告位专用板块（约定写法：>> 文字）
 * 浅金衬底 + 灰体小字，既有"广告位"的区块感，又有免责的弱化感
 * 配色沿用网站 notice 体系：#F8F4EA 底 / #E9DFC8 边
 */
#nice .multiquote-2 {
  display: block;
  background: #F8F4EA;
  border: 1px solid #E9DFC8;
  border-radius: 6px;
  box-shadow: none;
  padding: 12px 16px;
  margin-top: 18px;
  margin-bottom: 18px;
}

#nice .multiquote-2 p {
  font-size: 13px;
  color: #7E7A85;
  line-height: 1.75;
  padding: 0;
  margin: 0;
}

/* 三级引用 */
#nice .multiquote-3 {
  background: #FAF9F6;
  padding: 16px;
  margin-top: 18px;
  margin-bottom: 18px;
}

#nice .multiquote-3 p {
  color: #5F5B66;
}

/* 链接：深金，公众号里不可点，去掉下划线保持干净 */
#nice a {
  color: #b8903f;
  text-decoration: none;
  border-bottom: none;
  font-weight: normal;
}

/* 加粗：变色加粗（frowang 的金色强调思路） */
#nice strong {
  font-weight: bold;
  color: #b8903f;
}

/* 斜体：中文伪斜显乱，转为墨灰辅助色（适合免责声明、注释） */
#nice em {
  font-style: normal;
  color: #7E7A85;
}

/* 加粗斜体 */
#nice em strong {
  font-weight: bold;
  color: #b8903f;
}

/* 删除线 */
#nice del {
  color: #A9A5AD;
}

/* 分隔线：纸系细线 */
#nice hr {
  height: 1px;
  border: none;
  border-top: 1px solid #E8E4DA;
  margin-top: 24px;
  margin-bottom: 24px;
}

/* 图片 */
#nice img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  border-radius: 6px;
}

/* 图片描述文字：灰色小字居中 */
#nice figcaption {
  margin-top: 8px;
  text-align: center;
  color: #A9A5AD;
  font-size: 14px;
  line-height: 1.6;
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

/* 代码块：浅色纸底（配合 github / atomOneLight 高亮主题使用） */
#nice pre code {
  display: block;
  background: #FAF9F6;
  border: 1px solid #E8E4DA;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.7;
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

/* 表头：浅纸底加粗 */
#nice table tr th {
  font-weight: bold;
  color: #17151F;
  background-color: #F6F4EF;
}

/* 斑马纹：纸色 */
#nice table tr:nth-child(2n) {
  background-color: #FAF9F6;
}

/* 脚注文字 */
#nice .footnote-word {
  color: #b8903f;
  font-weight: bold;
}

/* 脚注上标 */
#nice .footnote-ref {
  color: #b8903f;
  font-weight: bold;
}

/* "参考资料"四个字 */
#nice .footnotes-sep:before {
  color: #17151F;
  font-weight: bold;
}

/* 参考资料编号 */
#nice .footnote-num {
  color: #A9A5AD;
}

/* 参考资料文字 */
#nice .footnote-item p {
  font-size: 14px;
  color: #7E7A85;
  line-height: 1.8;
}

/* 参考资料解释 */
#nice .footnote-item p em {
  color: #A9A5AD;
}

/* 行间公式 */
#nice .block-equation {
  margin-top: 16px;
  margin-bottom: 16px;
}

#nice .block-equation svg {
  max-width: 300% !important;
}

/* 行内公式 */
#nice .inline-equation svg {
}
`;
