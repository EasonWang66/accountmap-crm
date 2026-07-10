import { Mail, Phone, UserRound } from "lucide-react";
import type { Node, NodeProps } from "@xyflow/react";
import type { Contact } from "../../data/types";
import { useOrgChartStore } from "../../stores/orgChartStore";

export type PersonNodeData = {
  [key: string]: unknown;
  contact: Contact;
  matched: boolean;
};

export type PersonGraphNode = Node<PersonNodeData, "person">;

export function PersonNode({ data }: NodeProps<PersonGraphNode>) {
  const selectedPersonId = useOrgChartStore((state) => state.selectedPersonId);
  const selectPerson = useOrgChartStore((state) => state.selectPerson);
  const isSelected = selectedPersonId === data.contact.id;

  return (
    <button
      className={`person-node ${data.matched ? "matched" : ""} ${isSelected ? "selected" : ""}`}
      onClick={() => selectPerson(data.contact.id)}
      type="button"
    >
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
    </button>
  );
}
