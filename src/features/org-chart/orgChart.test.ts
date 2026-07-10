import { describe, expect, it } from "vitest";
import { chartEdges, chartNodes, contacts } from "../../data/seed";

describe("Finovatech org chart seed data", () => {
  it("only references contacts that exist", () => {
    const contactIds = new Set(contacts.map((contact) => contact.id));

    expect(chartNodes.every((node) => contactIds.has(node.contactId))).toBe(true);
  });

  it("only references nodes that exist", () => {
    const nodeIds = new Set(chartNodes.map((node) => node.id));

    expect(chartEdges.every((edge) => nodeIds.has(edge.sourceNodeId) && nodeIds.has(edge.targetNodeId))).toBe(true);
  });
});

