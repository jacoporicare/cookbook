export default class HtmlBuilder {
  constructor() {
    this.result = [];
    this.opened = [];
  }

  write(html) {
    this.result.push(html);
  }

  open(html) {
    this.result.push(html);

    const tag = this.getTag(html);
    this.opened.push(tag);
  }

  close() {
    const tag = this.opened.pop();
    if (!tag) return;
    this.result.push(`</${tag}>`);
  }

  closeAll() {
    while (this.opened.length) this.close();
  }

  isOpen(tag) {
    for (let i = this.opened.length - 1; i >= 0; i--) {
      if (this.opened[i] === tag) return true;
    }

    return false;
  }

  getHtml() {
    this.closeAll();
    if (this.result[this.result.length - 1] === '<br>') this.result.pop();

    return this.result.join('');
  }

  getTag(html) {
    return html.match(/<([^\s>]+).*>/)[1];
  }
}
