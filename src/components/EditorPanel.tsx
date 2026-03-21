import React, { useEffect, useRef, useCallback } from 'react';
import Editor, { useMonaco, OnMount } from '@monaco-editor/react';
import { validateYaml } from '../engine/yamlValidator';

interface EditorPanelProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ value, onChange }) => {
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsRef = useRef<any>(null);
  // Track whether the last value change came from user typing
  const isUserEditRef = useRef(false);

  const updateErrorDecorations = useCallback((text: string) => {
    const editor = editorRef.current;
    const monacoInstance = monacoRef.current;
    if (!editor || !monacoInstance) return;

    const errors = validateYaml(text);

    const newDecorations = errors.map((err) => ({
      range: new monacoInstance.Range(err.line, 1, err.line, 1),
      options: {
        isWholeLine: true,
        className: 'monaco-error-line-highlight',
        overviewRuler: {
          color: 'rgba(239, 68, 68, 0.8)',
          position: monacoInstance.editor.OverviewRulerLane.Full,
        },
      },
    }));

    if (decorationsRef.current) {
      decorationsRef.current.set(newDecorations);
    }
  }, []);

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;
    decorationsRef.current = editor.createDecorationsCollection();

    // Run initial validation
    updateErrorDecorations(value);
  };

  // Sync external value changes into Monaco WITHOUT resetting cursor.
  // Only push when the change did NOT come from user typing.
  useEffect(() => {
    if (isUserEditRef.current) {
      // User just typed — the editor already has the right content.
      isUserEditRef.current = false;
      updateErrorDecorations(value);
      return;
    }
    const editor = editorRef.current;
    if (!editor) return;
    const model = editor.getModel();
    if (!model) return;
    // Only push if the value actually differs from what Monaco has
    if (model.getValue() !== value) {
      // Use pushEditOperations to preserve undo stack and avoid cursor reset
      const fullRange = model.getFullModelRange();
      model.pushEditOperations(
        [],
        [{ range: fullRange, text: value }],
        () => null
      );
    }
    updateErrorDecorations(value);
  }, [value, updateErrorDecorations]);

  // Handler for user edits inside Monaco
  const handleChange = useCallback((newValue: string | undefined) => {
    isUserEditRef.current = true;
    onChange(newValue);
  }, [onChange]);

  useEffect(() => {
    if (monaco) {
      const anyMonaco = monaco as any;
      if (anyMonaco.languages.yaml && anyMonaco.languages.yaml.yamlDefaults) {
        anyMonaco.languages.yaml.yamlDefaults.setDiagnosticsOptions({
          validate: true,
          enableSchemaRequest: true,
          hover: true,
          completion: true,
          schemas: [
            {
              uri: './schema.json',
              fileMatch: ['*'],
              schema: undefined, // Will be fetched from uri
            },
          ],
        });
      }
    }
  }, [monaco]);

  return (
    <div className="w-full h-full bg-surface" data-testid="editor-panel">
      <Editor
        height="100%"
        defaultLanguage="yaml"
        theme="vs-dark"
        defaultValue={value}
        onChange={handleChange}
        onMount={handleEditorMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          padding: { top: 16 },
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
          acceptSuggestionOnEnter: 'off',
          wordBasedSuggestions: 'off',
        }}
      />
    </div>
  );
};
