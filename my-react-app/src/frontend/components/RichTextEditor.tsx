import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => (
  <ReactQuill
    theme="snow"
    value={value}
    onChange={onChange}
    modules={modules}
    placeholder={placeholder}
  />
);

export default RichTextEditor; 