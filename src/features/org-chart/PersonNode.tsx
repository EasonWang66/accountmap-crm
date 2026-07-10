import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { Contact } from "../../data/types";
import { useOrgChartStore } from "../../stores/orgChartStore";

export type PersonNodeData = {
  [key: string]: unknown;
  contact: Contact;
  matched: boolean;
};

export type PersonGraphNode = Node<PersonNodeData, "person">;

function PhoneGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M5.1 1.8 6.8 5c.2.4.1.8-.2 1.1l-.8.8c.9 1.8 1.9 2.8 3.7 3.7l.8-.8c.3-.3.8-.4 1.1-.2l3.2 1.7c.4.2.6.6.5 1.1l-.4 2c-.1.4-.5.7-.9.7C6.7 15.1.9 9.3.9 2.2c0-.4.3-.8.7-.9l2-.4c.6-.1 1 .1 1.5.9Z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M2.2 3.1h11.6c.7 0 1.2.5 1.2 1.2v7.4c0 .7-.5 1.2-1.2 1.2H2.2c-.7 0-1.2-.5-1.2-1.2V4.3c0-.7.5-1.2 1.2-1.2Zm.7 1.6L8 8.2l5.1-3.5H2.9Zm10.6 6.6V6.1l-5.1 3.5c-.3.2-.6.2-.9 0L2.5 6.1v5.2h11Z" />
    </svg>
  );
}

function LinkedinGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M2.2 1.4h11.6c.5 0 .8.4.8.8v11.6c0 .5-.4.8-.8.8H2.2a.8.8 0 0 1-.8-.8V2.2c0-.5.4-.8.8-.8Zm2.6 5.2H3v6h1.8v-6Zm.1-1.8c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1Zm8.1 4.4c0-1.8-1-2.8-2.4-2.8-1 0-1.5.6-1.8 1v-.8H7v6h1.8V9.5c0-.8.4-1.4 1.1-1.4.6 0 1 .5 1 1.4v3.1H13V9.2Z" />
    </svg>
  );
}

export function PersonNode({ data }: NodeProps<PersonGraphNode>) {
  const hoveredPersonId = useOrgChartStore((state) => state.hoveredPersonId);
  const setHoveredPerson = useOrgChartStore((state) => state.setHoveredPerson);
  const selectPerson = useOrgChartStore((state) => state.selectPerson);
  const isActive = hoveredPersonId === data.contact.id;

  return (
    <button
      className={`person-node ${data.contact.cardVariant} ${data.matched ? "matched" : "dimmed"} ${isActive ? "active" : ""}`}
      onBlur={() => setHoveredPerson(undefined)}
      onClick={() => selectPerson(data.contact.id)}
      onFocus={() => setHoveredPerson(data.contact.id)}
      onMouseEnter={() => setHoveredPerson(data.contact.id)}
      onMouseLeave={() => setHoveredPerson(undefined)}
      type="button"
    >
      <Handle className="node-handle" position={Position.Top} type="target" />
      {data.contact.relationshipTags.length > 0 ? (
        <div className="person-tags">
          {data.contact.relationshipTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      ) : null}
      {data.contact.cardVariant === "blue" && data.contact.cardMetric ? (
        <span className="person-metric">{data.contact.cardMetric}</span>
      ) : null}
      <span className="person-title">{data.contact.title}</span>
      <strong>{data.contact.fullName}</strong>
      <span className="person-location">{data.contact.location}</span>
      <div className="person-actions" aria-hidden="true">
        <PhoneGlyph />
        <MailGlyph />
        <LinkedinGlyph />
      </div>
      <Handle className="node-handle" position={Position.Bottom} type="source" />
    </button>
  );
}
