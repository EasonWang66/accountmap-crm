import { Mail, Phone, UserRound } from "lucide-react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { Contact } from "../../data/types";
import { useOrgChartStore } from "../../stores/orgChartStore";

export type PersonNodeData = {
  [key: string]: unknown;
  contact: Contact;
  matched: boolean;
};

export type PersonGraphNode = Node<PersonNodeData, "person">;

export function PersonNode({ data }: NodeProps<PersonGraphNode>) {
  const hoveredPersonId = useOrgChartStore((state) => state.hoveredPersonId);
  const setHoveredPerson = useOrgChartStore((state) => state.setHoveredPerson);
  const selectPerson = useOrgChartStore((state) => state.selectPerson);
  const isActive = hoveredPersonId === data.contact.id;

  return (
    <button
      className={`person-node ${data.matched ? "matched" : ""} ${isActive ? "active" : ""}`}
      onBlur={() => setHoveredPerson(undefined)}
      onClick={() => selectPerson(data.contact.id)}
      onFocus={() => setHoveredPerson(data.contact.id)}
      onMouseEnter={() => setHoveredPerson(data.contact.id)}
      onMouseLeave={() => setHoveredPerson(undefined)}
      type="button"
    >
      <Handle className="node-handle" position={Position.Top} type="target" />
      <div className="person-tags">
        {data.contact.relationshipTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <span className="person-title">{data.contact.title}</span>
      <strong>{data.contact.fullName}</strong>
      <div className="person-actions" aria-hidden="true">
        <Phone size={12} />
        <Mail size={12} />
        <UserRound size={12} />
      </div>
      <Handle className="node-handle" position={Position.Bottom} type="source" />
    </button>
  );
}
