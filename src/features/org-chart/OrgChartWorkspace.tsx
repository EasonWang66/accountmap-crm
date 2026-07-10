import { Background, Controls, ReactFlow, type Edge } from "@xyflow/react";
import { Eye, HelpCircle, Info, List, Pencil, Search } from "lucide-react";
import { useMemo } from "react";
import { chartEdges, chartNodes, contacts } from "../../data/seed";
import { useOrgChartStore } from "../../stores/orgChartStore";
import { PersonNode, type PersonGraphNode } from "./PersonNode";

const nodeTypes = {
  person: PersonNode
};

export function OrgChartWorkspace() {
  const editMode = useOrgChartStore((state) => state.editMode);
  const query = useOrgChartStore((state) => state.query);
  const setEditMode = useOrgChartStore((state) => state.setEditMode);
  const setQuery = useOrgChartStore((state) => state.setQuery);

  const normalizedQuery = query.trim().toLowerCase();

  const nodes = useMemo<PersonGraphNode[]>(
    () =>
      chartNodes.map((node) => {
        const contact = contacts.find((item) => item.id === node.contactId);

        if (!contact) {
          throw new Error(`Missing contact for node ${node.id}`);
        }

        const matched =
          normalizedQuery.length === 0 ||
          [contact.fullName, contact.title, contact.department]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return {
          id: node.id,
          type: "person",
          position: node.position,
          data: {
            contact,
            matched
          }
        };
      }),
    [normalizedQuery]
  );

  const edges = useMemo<Edge[]>(
    () =>
      chartEdges.map((edge) => ({
        id: edge.id,
        source: edge.sourceNodeId,
        target: edge.targetNodeId,
        type: "smoothstep",
        animated: editMode,
        style: { stroke: "#a8b3bd", strokeWidth: 1.5 }
      })),
    [editMode]
  );

  return (
    <section className="chart-panel" aria-label="Organizational chart workspace">
      <div className="chart-toolbar">
        <div className="toolbar-left">
          <button className={editMode ? "primary-button active" : "primary-button"} onClick={() => setEditMode(!editMode)}>
            <Pencil size={15} aria-hidden="true" />
            Edit
          </button>
          <button className="icon-button" aria-label="Recent changes">
            <HelpCircle size={15} />
          </button>
          <button className="icon-button" aria-label="List view">
            <List size={15} />
          </button>
          <button className="icon-button" aria-label="Preview visibility">
            <Eye size={15} />
          </button>
          <label className="search-field">
            <span className="sr-only">Search people</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              type="search"
              value={query}
            />
            <Search size={16} aria-hidden="true" />
          </label>
        </div>
        <div className="toolbar-right">
          <button className="primary-button">Legend</button>
          <button className="secondary-button">
            <Info size={15} aria-hidden="true" />
            Info
          </button>
        </div>
      </div>
      <div className={editMode ? "flow-frame editing" : "flow-frame"}>
        <ReactFlow
          edges={edges}
          fitView
          maxZoom={1.35}
          minZoom={0.45}
          nodes={nodes}
          nodeTypes={nodeTypes}
          nodesDraggable={editMode}
          panOnScroll
        >
          <Background color="#d7dee4" gap={22} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </section>
  );
}
