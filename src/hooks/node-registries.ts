import type { WorkflowNodeRegistry } from '@flowgram.ai/free-layout-editor';
import { custom } from '../nodes/custom';

/**
 * You can customize your own node registry
 * 你可以自定义节点的注册器
 */
export const nodeRegistries: WorkflowNodeRegistry[] = [
  {
    type: 'start',
    meta: {
      isStart: true, // Mark as start
      deleteDisable: true, // The start node cannot be deleted
      copyDisable: true, // The start node cannot be copied
      defaultPorts: [{ type: 'output' }], // Used to define the input and output ports, the start node only has the output port
    },
  },
  {
    type: 'end',
    meta: {
      deleteDisable: true,
      copyDisable: true,
      defaultPorts: [{ type: 'input' }],
    },
  },
  {
    type: 'custom',
    meta: {
      /**
     * Mark as subcanvas
     * 子画布标记
     */
    isContainer: true,
    /**
     * The subcanvas default size setting
     * 子画布默认大小设置
     */
 
    // autoResizeDisable: true,
    /**
     * The subcanvas padding setting
     * 子画布 padding 设置
     */
    padding: (transform) => {
      if (!transform.isContainer) {
        return {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        };
      }
      return {
        top: 120,
        bottom: 80,
        left: 80,
        right: 80,
      };
    },
    // expandable: false, // disable expanded
    wrapperStyle: {
      minWidth: 'unset',
      width: '100%',
    },
    },
    defaultPorts: [{ type: 'output' }, { type: 'input' }], // A normal node has two ports
    formMeta:custom,
  },
];
