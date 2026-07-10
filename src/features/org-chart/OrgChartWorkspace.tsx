import { Background, Controls, ReactFlow, useNodesState, type Edge } from "@xyflow/react";
import { Eye, HelpCircle, Info, List, Pencil, Search } from "lucide-react";
import { useEffect, useMemo } from "react";
import { chartEdges, chartNodes, contacts } from "../../data/seed";
import { useOrgChartStore } from "../../stores/orgChartStore";
import { PersonNode, type PersonGraphNode } from "./PersonNode";

const nodeTypes = {
  person: PersonNode
};

export function OrgChartWorkspace() {
  const editMode = useOrgChartStore((state) => state.editMode);
  const query = useOrgChartStore((state) => state.query);
  const selectedPersonId = useOrgChartStore((state) => state.selectedPersonId);
  const hoveredPersonId = useOrgChartStore((state) => state.hoveredPersonId);
  const draftName = useOrgChartStore((state) => state.draftName);
  const setEditMode = useOrgChartStore((state) => state.setEditMode);
  const setQuery = useOrgChartStore((state) => state.setQuery);
  const setDraftName = useOrgChartStore((state) => state.setDraftName);

  const normalizedQuery = query.trim().toLowerCase();
  const activePersonId = hoveredPersonId ?? selectedPersonId;
  const selectedContact = contacts.find((contact) => contact.id === activePersonId);

  const initialNodes = useMemo<PersonGraphNode[]>(
    () =>
      chartNodes.map((node) => {
        const contact = contacts.find((item) => item.id === node.contactId);

        if (!contact) {
          throw new Error(`Missing contact for node ${node.id}`);
        }

        return {
          id: node.id,
          type: "person",
          position: node.position,
          data: {
            contact,
            matched: true
          }
        };
      }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<PersonGraphNode>(initialNodes);

  useEffect(() => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        const matched =
          normalizedQuery.length === 0 ||
          [node.data.contact.fullName, node.data.contact.title, node.data.contact.department]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return {
          ...node,
          data: {
            ...node.data,
            matched
          }
        };
      })
    );
  }, [normalizedQuery, setNodes]);

  const edges = useMemo<Edge[]>(
    () =>
      chartEdges.map((edge) => ({
        id: edge.id,
        source: edge.sourceNodeId,
        target: edge.targetNodeId,
        type: "smoothstep",
        animated: editMode,
        pathOptions: { borderRadius: 24 },
        style: { stroke: "#a8b3bd", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.6 }
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
          fitViewOptions={{ padding: 0.2 }}
          maxZoom={1.35}
          minZoom={0.45}
          nodes={nodes}
          nodeTypes={nodeTypes}
          nodesDraggable
          onNodesChange={onNodesChange}
          panOnScroll
        >
          <Background color="#d7dee4" gap={22} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <aside className={selectedContact ? "person-drawer open" : "person-drawer"} aria-label="Selected person details">
        {selectedContact ? (
          <>
            <div>
              <span>{selectedContact.department}</span>
              <h2>{selectedContact.fullName}</h2>
              <p>{selectedContact.title}</p>
            </div>
            {editMode ? (
              <label className="drawer-field">
                Display name
                <input
                  onChange={(event) => setDraftName(event.target.value)}
                  placeholder={selectedContact.fullName}
                  value={draftName}
                />
              </label>
            ) : (
              <dl>
                <div>
                  <dt>Location</dt>
                  <dd>{selectedContact.location}</dd>
                </div>
                <div>
                  <dt>Relationship</dt>
                  <dd>{selectedContact.relationshipTags.join(", ") || "Unclassified"}</dd>
                </div>
              </dl>
            )}
          </>
        ) : (
          <p>Select a person card to inspect account relationships.</p>
        )}
      </aside>
    </section>
  );
}
