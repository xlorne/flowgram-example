import { type CSSProperties, useEffect, useState } from 'react';

import { usePlaygroundTools, useClientContext, LineType, useRefresh } from '@flowgram.ai/free-layout-editor';

export const Tools = () => {
  const { history, document } = useClientContext();
  const refresh = useRefresh();
  const tools = usePlaygroundTools();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const buttonStyle: CSSProperties = {
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '4px',
    color: '#141414',
    background: '#e1e3e4',
  };

  useEffect(() => {
    const disposable = history.undoRedoService.onChange(() => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    return () => disposable.dispose();
  }, [history]);

  return (
    <div
      style={{ position: 'absolute', zIndex: 10, bottom: 34, right: 16, display: 'flex', gap: 8 }}
    >
      <button style={buttonStyle} onClick={() => tools.zoomin()}>
        ZoomIn
      </button>
      <button style={buttonStyle} onClick={() => tools.zoomout()}>
        ZoomOut
      </button>
      <span
        style={{
          ...buttonStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
          width: 40,
        }}
      >
        {Math.floor(tools.zoom * 100)}%
      </span>
      <button style={buttonStyle} onClick={() => tools.fitView()}>
        FitView
      </button>
      <button style={buttonStyle} onClick={() => tools.autoLayout()}>
        AutoLayout
      </button>
      <button
        style={buttonStyle}
        onClick={() =>
          tools.switchLineType(
            tools.lineType === LineType.BEZIER ? LineType.LINE_CHART : LineType.BEZIER
          )
        }
      >
        {tools.lineType === LineType.BEZIER ? 'Bezier' : 'Fold'}
      </button>
      <button
        style={{
          ...buttonStyle,
          cursor: canUndo ? 'pointer' : 'not-allowed',
          color: canUndo ? '#141414' : '#b1b1b1',
        }}
        onClick={() => history.undo()}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        style={{
          ...buttonStyle,
          cursor: canRedo ? 'pointer' : 'not-allowed',
          color: canRedo ? '#141414' : '#b1b1b1',
        }}
        onClick={() => history.redo()}
        disabled={!canRedo}
      >
        Redo
      </button>
      <button
        style={{
          ...buttonStyle,
          cursor: canUndo ? 'pointer' : 'not-allowed',
          color: canUndo ? '#141414' : '#b1b1b1',
        }}
        onClick={() => {
          const obj = document.toJSON();
          const json = JSON.stringify(obj);
          console.log(json);
        }}
      >
        Download
      </button>

      <button
        style={{
          ...buttonStyle,
          cursor: canUndo ? 'pointer' : 'not-allowed',
          color: canUndo ? '#141414' : '#b1b1b1',
        }}
        onClick={() => {
          const json =  {"nodes":[{"id":"2","type":"custom","meta":{"position":{"x":520,"y":0}},"data":{"title":"Custom Node A"}},{"id":"3","type":"custom","meta":{"position":{"x":520,"y":188}},"data":{"title":"Custom Node B"}},{"id":"4","type":"custom","meta":{"position":{"x":520,"y":376}},"data":{"title":"Custom Node C"}},{"id":"5","type":"end","meta":{"position":{"x":900,"y":188}},"data":{"title":"End Node"}},{"id":"1","type":"start","meta":{"position":{"x":140,"y":188}},"data":{"title":"Start Node"}}],"edges":[{"sourceNodeID":"1","targetNodeID":"2"},{"sourceNodeID":"2","targetNodeID":"5"},{"sourceNodeID":"1","targetNodeID":"3"},{"sourceNodeID":"3","targetNodeID":"5"},{"sourceNodeID":"1","targetNodeID":"4"},{"sourceNodeID":"4","targetNodeID":"5"}]}
          document.fromJSON(json,true);
        }}
      >
        Export
      </button>
    </div>
  );
};
