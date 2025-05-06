import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import GifSearchModal from './GifSearchModal';

const icons = Quill.import('ui/icons') as any;
icons['insertGif'] = '<svg viewBox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect><circle class="ql-fill" cx="6" cy="7" r="1"></circle><path class="ql-even ql-fill" d="M9 6h2v1h-2zM11 7h1v1h-1z"></path></svg>';
interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    showToolbar?: boolean;
}

// const modules = {
//   toolbar: [
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//     ['bold', 'italic', 'underline', 'strike'],
//     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//     ['link', 'image'],
//     ['clean']
//   ]
// };

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => (
//   <ReactQuill
//     theme="snow"
//     value={value}
//     onChange={onChange}
//     modules={modules}
//     placeholder={placeholder}
//   />
// );

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder, className, showToolbar = false }) => {

    const quillRef = useRef<ReactQuill | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toolbarVisible, setToobarVisible] = useState(showToolbar)
    const handleFocus = useCallback(() => {
        setToobarVisible(true);
    }, []);
    //    const handleGifClick = () => setIsModalOpen(true);
    const handleBlur = useCallback(() => {
        setToobarVisible(false);
    }, []);
    const modules = useMemo(() => ({
        toolbar: toolbarVisible ? {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'insertGif'],
                ['clean'],
            ],
            handlers: {
                insertGif: () => setIsModalOpen(true),
            },
        } : false, // set toolbar false when showToolbar = false
    }), [toolbarVisible]);

    const formats = useMemo(() => [
        'header', 'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'link', 'image', 'insertGif'
    ], []);

    const handleGifSelect = (url: string) => {
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection();
        if (range) {
            editor?.insertEmbed(range.index, 'image', url);
        }
        setIsModalOpen(false);
    };

    return (
        <div className={className}>
            <ReactQuill
                key={showToolbar ? 'with-toolbar' : 'no-toolbar'}
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <GifSearchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectGif={handleGifSelect}
            />
        </div>
    );

}
export default RichTextEditor; 