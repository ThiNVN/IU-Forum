import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/core';
import '../styles/forum.css';

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  isPreview?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  isPreview = false
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline'
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg'
        }
      }),
      CodeBlockLowlight.configure({
        lowlight
      })
    ],
    content: value,
    editable: !isPreview,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  if (!editor) {
    return null;
  }

  if (isPreview) {
    return (
      <div className="prose max-w-none p-4 border rounded-lg bg-white">
        <EditorContent editor={editor} />
      </div>
    );
  }

  return (
    <div className="border rounded-lg bg-white">
      <div className="border-b p-2 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
          title="Strike"
        >
          <s>S</s>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
          title="Code"
        >
          <code>{'</>'}</code>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          title="Ordered List"
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
          title="Blockquote"
        >
          Quote
        </button>
        <button
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
          title="Link"
        >
          🔗
        </button>
        <button
          onClick={() => {
            const url = window.prompt('Enter image URL');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="p-2 rounded"
          title="Image"
        >
          🖼️
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-gray-200' : ''}`}
          title="Code Block"
        >
          {'</>'}
        </button>
      </div>
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor; 