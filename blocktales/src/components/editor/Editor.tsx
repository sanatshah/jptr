import React, { useCallback, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { Txn } from './plugins/Txn';
import { Address } from './plugins/Address';
import { Gif } from './plugins/Gif';
import { Commentary } from './plugins/Commentary';

interface EditorProps {
  onNewEditorData: (data: OutputData) => void
}

export const Editor = ({ onNewEditorData }: EditorProps) => {
   const elemRef = useCallback((node) => {
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
        onChange: async (api) => {
          const savedData = await api.saver.save() 
          onNewEditorData(savedData)
        }
      });
    }
  }, [])

  return (
    <div id="editor" ref={elemRef} />
  );
}