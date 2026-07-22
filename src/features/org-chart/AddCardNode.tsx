import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type AddCardNodeData = {
  [key: string]: unknown;
  onAddContact: (parentNodeId: string) => void;
  parentNodeId: string;
};

export type AddCardGraphNode = Node<AddCardNodeData, "addCard">;

export function AddCardNode({ data }: NodeProps<AddCardGraphNode>) {
  return (
    <button
      className="add-card-node nodrag nopan"
      type="button"
      aria-label="Add person under this column"
      onClick={(event) => {
        event.stopPropagation();
        data.onAddContact(data.parentNodeId);
      }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <Handle className="node-handle" position={Position.Top} type="target" />
      <span aria-hidden="true">+</span>
    </button>
  );
}

export type AddCardNodeProps = NodeProps<AddCardGraphNode>;
