import '@flowgram.ai/free-layout-editor/index.css';

import { FreeLayoutEditorProvider, EditorRenderer } from '@flowgram.ai/free-layout-editor';

import { useEditorProps } from './hooks/use-editor-props';
import { Tools } from './tools/tools';
import { Minimap } from './tools/minimap';
import { AddNode } from './tools/add-node';

const FlowGramApp = () => {
  const editorProps = useEditorProps();
  return (
    <FreeLayoutEditorProvider {...editorProps}>
      <EditorRenderer />
      <Tools />
      <Minimap />
      <AddNode />
    </FreeLayoutEditorProvider>
  );
};

export default FlowGramApp;
