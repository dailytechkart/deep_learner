import React from 'react';
import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  defaultValue?: string;
  language?: string;
  theme?: string;
  onChange?: (value: string | undefined) => void;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  defaultValue = '',
  language = 'typescript',
  theme = 'vs-dark',
  onChange,
}) => {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={defaultValue}
      theme={theme}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        contextmenu: true,
        formatOnPaste: true,
        formatOnType: true,
      }}
    />
  );
}; 