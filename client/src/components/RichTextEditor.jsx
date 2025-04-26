import React, { useRef, useEffect } from 'react';

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  // Keep innerHTML in sync with value
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const exec = (command, val = null) => {
    document.execCommand(command, false, val);
    onChange?.(editorRef.current.innerHTML); // Emit HTML content
  };

  const handleInput = () => {
    onChange?.(editorRef.current.innerHTML);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border rounded-t-md bg-gray-100">
        <button onClick={() => exec('bold')} className="btn">B</button>
        <button onClick={() => exec('italic')} className="btn italic">I</button>
        <button onClick={() => exec('underline')} className="btn underline">U</button>
        <button onClick={() => exec('insertUnorderedList')} className="btn">UL</button>
        <button onClick={() => exec('insertOrderedList')} className="btn">OL</button>
        <button onClick={() => exec('formatBlock', '<h1>')} className="btn">H1</button>
        <button onClick={() => exec('formatBlock', '<h2>')} className="btn">H2</button>
        <button
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) exec('createLink', url);
          }}
          className="btn"
        >
          🔗
        </button>
        <button onClick={() => exec('removeFormat')} className="btn">Tx</button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="border border-t-0 rounded-b-md min-h-[200px] p-4 bg-white focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;
