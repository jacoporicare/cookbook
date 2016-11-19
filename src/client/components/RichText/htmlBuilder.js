export default class HtmlBuilder {
  constructor() {
    this._result = [];
    this._opened = [];
  }

  write(html) {
    this._result.push(html);
  }

  open(html) {
    this._result.push(html);

    const tag = this._getTag(html);
    this._opened.push(tag);
  }

  close() {
    const tag = this._opened.pop();
    if (!tag) return;
    this._result.push(`</${tag}>`);
  }

  closeAll() {
    while (this._opened.length) this.close();
  }

  isOpen(tag) {
    for (let i = this._opened.length - 1; i >= 0; i--) {
      if (this._opened[i] === tag) return true;
    }

    return false;
  }

  getHtml() {
    this.closeAll();
    if (this._result[this._result.length - 1] === '<br>') this._result.pop();

    return this._result.join('');
  }

  _getTag(html) {
    return html.match(/<([^\s>]+).*>/)[1];
  }
}
