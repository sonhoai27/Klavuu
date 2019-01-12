import * as React from 'react';

interface ILiteEditorProps {
  onChange?: Function;
  value?: any;
  className: any;
};

class LiteEditor extends React.PureComponent<ILiteEditorProps> {
  componentDidMount() {
    document.getElementById('editor').addEventListener('input', () => {
      this.props.onChange(document.getElementById('editor').innerHTML);
    },                                                 false);
  }

  bold = () => {
    document.execCommand('bold', false, null);
  }

  italic = () => {
    document.execCommand('italic', false, null);
  }

  underline = () => {
    document.execCommand('underline', false, null);
  }

  justifyLeft = () => {
    document.execCommand('justifyLeft', false, null);
  }

  justifyCenter = () => {
    document.execCommand('justifyCenter', false, null);
  }

  justifyRight = () => {
    document.execCommand('justifyRight', false, null);
  }

  insertUnorderedList = () => {
    document.execCommand('insertUnorderedList', false, null);
  }

  insertOrderedList = () => {
    document.execCommand('insertOrderedList', false, null);
  }

  size = (e) => {
    document.execCommand('fontSize', false, '7');
    const fontElements = document.getElementsByTagName('font');
    // tslint:disable-next-line
    for (let i = 0, len = fontElements.length; i < len; ++i) {
      if (fontElements[i].size === '7') {
        fontElements[i].removeAttribute('size');
        fontElements[i].style.fontSize = `${e.target.value}px`;
      }
    }
  }
  heading = (e) => {
    document.execCommand('fontSize', false, '7');
    const headingElements = document.getElementsByTagName('font');
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0, len = headingElements.length; i < len; ++i) {
      if (headingElements[i].size === '7') {
        headingElements[i].removeAttribute('size');
        headingElements[i].style.fontSize = `${e.target.value}px`;
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="content-editor" className={this.props.className}>
          <div className="wrap">
            <div className="toolbar">
              <button onClick={this.justifyLeft} title="Left">
                <i className="lnr lnr-text-align-left" />
              </button>
              <button onClick={this.justifyCenter} title="Center">
                <i className="lnr lnr-text-align-center" />
              </button>
              <button onClick={this.justifyRight} title="Right">
                <i className="lnr lnr-text-align-right" />
              </button>
              <button onClick={this.insertUnorderedList} title="Unordered List">
                <i className="lnr lnr-list" />
              </button>
              <button onClick={this.insertOrderedList} title="Ordered List">
                <i className="lnr lnr-menu" />
              </button>
              <button onClick={this.bold} title="Bold (Ctrl+B)">
                <i className="lnr lnr-bold" />
              </button>
              <button onClick={this.italic}>
                <i className="lnr lnr-italic" />
              </button>
              <button onClick={this.underline} title="Underline (Ctrl+U)">
                <i className="lnr lnr-underline" />
              </button>
              <div className="editor-select">
                <select name="heading" onChange={this.heading}>
                  <option value="36">h1</option>
                  <option value="30">h2</option>
                  <option value="24">h3</option>
                  <option value="20">h4</option>
                  <option value="18">h5</option>
                  <option value="16">h6</option>
                </select>
              </div>
              <div className="editor-select">
                <select name="size" onChange={this.size}>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="12">12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                  <option value="20">20</option>
                  <option value="22">22</option>
                  <option value="24">24</option>
                  <option value="26">26</option>
                  <option value="28">28</option>
                  <option value="30">30</option>
                  <option value="32">32</option>
                </select>
              </div>
            </div>
            <div className="wrap-editor">
              <div style={{
                height: 150,
                maxHeight:150,
                overflowY: 'auto',
              }} id="editor" contentEditable
              dangerouslySetInnerHTML={{ __html: this.props.value }}/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export {
  ILiteEditorProps,
};

export default LiteEditor;
