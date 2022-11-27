import React, { useCallback, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { Txn } from './plugins/Txn';
import { Address } from './plugins/Address';
import { Gif } from './plugins/Gif';
import { Commentary } from './plugins/Commentary';


export const Editor = () => {
  const editorRef = useRef(null)

   const elemRef = useCallback((node) => {
    console.log("got node!:")
    if (node !== null) {
      new EditorJS({
        autofocus: false,
        placeholder: 'Add commentary here...',
        holder: node,
        hideToolbar: true,
        tools: {
          txn: Txn,
          Address: Address,
          Gif: Gif,
        },
      });
    }
  }, [])


  return (
    <div id="editor" ref={elemRef} />
  );
}