import * as React from 'react';
import { Helmet } from 'react-helmet';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/ImageResize', ImageResize);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
  [{ direction: 'rtl' }],                         // text direction

  [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
  [{ font: [] }],
  ['image', 'addIcon'],
  [{ align: '' }, { align: 'center' }, { align: 'justify' }, { align: 'right' }],
];

interface IEditorProps {
  data: any;
  onChange: any;
}
class Editor extends React.Component<IEditorProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const customButton = document.querySelector('.ql-addIcon');
    customButton.innerHTML = '<span class="lnr lnr-smile"></span>'
  }

  render() {
    return (
      <>
        <Helmet>
          <link rel="stylesheet" href="/css/quill.snow.css" />
        </Helmet>
        <ReactQuill
          modules={{
            toolbar: {
              container: toolbarOptions,
              handlers: {
                image: () => { alert('DAGUR'); },
              },
            },
            ImageResize: {
              parchment: Quill.import('parchment'),
              // See optional "config" below
            },
          }}
          theme="snow"
          value={this.props.data}
          onChange={this.props.onChange} />
      </>
    )
  }
}

export default Editor
