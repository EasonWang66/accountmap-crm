import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { useRef } from "react";

export type AddCardNodeData = {
  [key: string]: unknown;
  onAddContact: (parentNodeId: string) => void;
  parentNodeId: string;
};

export type AddCardGraphNode = Node<AddCardNodeData, "addCard">;

export function AddCardNode({ data }: NodeProps<AddCardGraphNode>) {
  const lastAddAtRef = useRef(0);

  const addContact = () => {
    const now = Date.now();

    if (now - lastAddAtRef.current < 250) {
      return;
    }

    lastAddAtRef.current = now;
    data.onAddContact(data.parentNodeId);
  };

  return (
    <button
      className="add-card-node nodrag nopan"
      type="button"
      aria-label="Add person under this column"
      onClickCapture={(event) => event.stopPropagation()}
      onPointerUp={(event) => {
        event.stopPropagation();
        addContact();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          addContact();
        }
      }}
    >
      <Handle className="node-handle" position={Position.Top} type="target" />
      <span aria-hidden="true">+</span>
    </button>
  );
}

export type AddCardNodeProps = NodeProps<AddCardGraphNode>;
