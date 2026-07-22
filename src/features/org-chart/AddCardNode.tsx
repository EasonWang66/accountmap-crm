import { type Node, type NodeProps } from "@xyflow/react";
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
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        addContact();
      }}
      onMouseDownCapture={(event) => {
        event.preventDefault();
        event.stopPropagation();
        addContact();
      }}
      onPointerDownCapture={(event) => {
        event.preventDefault();
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
      <span aria-hidden="true">+</span>
    </button>
  );
}

export type AddCardNodeProps = NodeProps<AddCardGraphNode>;
