import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type AddCardNodeData = {
  [key: string]: unknown;
  parentNodeId: string;
};

export type AddCardGraphNode = Node<AddCardNodeData, "addCard">;

export function AddCardNode() {
  return (
    <button className="add-card-node" type="button" aria-label="Add person under this column">
      <Handle className="node-handle" position={Position.Top} type="target" />
      <span aria-hidden="true">+</span>
    </button>
  );
}

export type AddCardNodeProps = NodeProps<AddCardGraphNode>;
