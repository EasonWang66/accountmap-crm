import { Background, Controls, ReactFlow, useNodesState, type Edge, type OnNodesChange } from "@xyflow/react";
import { Eye, HelpCircle, Info, List, Pencil, Plus, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { chartEdges, chartNodes, contacts as seedContacts } from "../../data/seed";
import type { ChartEdge, Contact } from "../../data/types";
import { useOrgChartStore } from "../../stores/orgChartStore";
import { AddCardNode, type AddCardGraphNode } from "./AddCardNode";
import { PersonNode, type PersonGraphNode } from "./PersonNode";

const nodeTypes = {
  addCard: AddCardNode,
  person: PersonNode
};

type ChartFlowNode = PersonGraphNode | AddCardGraphNode;

export function OrgChartWorkspace() {
  const editMode = useOrgChartStore((state) => state.editMode);
  const query = useOrgChartStore((state) => state.query);
  const selectedPersonId = useOrgChartStore((state) => state.selectedPersonId);
  const hoveredPersonId = useOrgChartStore((state) => state.hoveredPersonId);
  const draftName = useOrgChartStore((state) => state.draftName);
  const setEditMode = useOrgChartStore((state) => state.setEditMode);
  const setQuery = useOrgChartStore((state) => state.setQuery);
  const setDraftName = useOrgChartStore((state) => state.setDraftName);
  const selectPerson = useOrgChartStore((state) => state.selectPerson);
  const setHoveredPerson = useOrgChartStore((state) => state.setHoveredPerson);

  const [contacts, setContacts] = useState<Contact[]>(seedContacts);
  const [chartRelationshipEdges, setChartRelationshipEdges] = useState<ChartEdge[]>(chartEdges);

  const normalizedQuery = query.trim().toLowerCase();
  const activePersonId = hoveredPersonId ?? selectedPersonId;
  const selectedContact = contacts.find((contact) => contact.id === activePersonId);

  const createPlaceholderContact = useCallback((index: number): Contact => {
    const metric = 6 + ((index * 5) % 17);

    return {
      id: `new-contact-${index}`,
      accountId: "acct-coca-cola",
      fullName: `New Contact ${index}`,
      title: "Account Stakeholder",
      department: "New Relationship",
      location: "Atlanta, GA",
      relationshipTags: [`${1 + (index % 9)} C`, `${2 + (index % 8)} FTE`],
      cardVariant: index % 2 === 0 ? "grey" : "blue",
      cardMetric: index % 2 === 0 ? undefined : metric
    };
  }, []);

  const initialNodes = useMemo<PersonGraphNode[]>(
    () =>
      chartNodes.map((node) => {
        const contact = seedContacts.find((item) => item.id === node.contactId);

        if (!contact) {
          throw new Error(`Missing contact for node ${node.id}`);
        }

        return {
          id: node.id,
          type: "person",
          position: node.position,
          data: {
            contact,
            matched: true,
            onDeleteContact: () => undefined
          }
        };
      }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<PersonGraphNode>(initialNodes);

  const deleteContactNode = useCallback(
    (nodeId: string) => {
      setNodes((currentNodes) => {
        const contactIdToDelete = currentNodes.find((node) => node.id === nodeId)?.data.contact.id;

        if (contactIdToDelete) {
          setContacts((currentContacts) => currentContacts.filter((contact) => contact.id !== contactIdToDelete));
        }
        setChartRelationshipEdges((currentEdges) =>
          currentEdges.filter((edge) => edge.sourceNodeId !== nodeId && edge.targetNodeId !== nodeId)
        );
        selectPerson(undefined);
        setHoveredPerson(undefined);

        return currentNodes.filter((node) => node.id !== nodeId);
      });
    },
    [selectPerson, setHoveredPerson, setNodes]
  );

  const addContactUnderNode = useCallback(
    (parentNodeId?: string) => {
      setNodes((currentNodes) => {
        const parentNode = parentNodeId ? currentNodes.find((node) => node.id === parentNodeId) : undefined;
        const nextIndex = contacts.length + 1;
        const newContact = createPlaceholderContact(nextIndex);
        const siblingCount = parentNodeId
          ? chartRelationshipEdges.filter((edge) => edge.sourceNodeId === parentNodeId).length
          : currentNodes.length;
        const newNodeId = `node-${newContact.id}`;
        const newPosition = parentNode
          ? {
              x: parentNode.position.x + (siblingCount - 0.5) * 170,
              y: parentNode.position.y + 145
            }
          : {
              x: 520 + siblingCount * 170,
              y: 520
            };

        setContacts((currentContacts) => [...currentContacts, newContact]);

        if (parentNodeId) {
          setChartRelationshipEdges((currentEdges) => [
            ...currentEdges,
            {
              id: `edge-${parentNodeId}-${newNodeId}`,
              sourceNodeId: parentNodeId,
              targetNodeId: newNodeId,
              relationshipType: "reports-to"
            }
          ]);
        }

        selectPerson(newContact.id);
        setHoveredPerson(newContact.id);

        return [
          ...currentNodes,
          {
            id: newNodeId,
            type: "person",
            position: newPosition,
            data: {
              contact: newContact,
              matched: true,
              onDeleteContact: deleteContactNode
            }
          }
        ];
      });
    },
    [
      chartRelationshipEdges,
      contacts.length,
      createPlaceholderContact,
      deleteContactNode,
      selectPerson,
      setHoveredPerson,
      setNodes
    ]
  );

  const leafNodeIds = useMemo(() => {
    const sourceNodeIds = new Set(chartRelationshipEdges.map((edge) => edge.sourceNodeId));

    return new Set(nodes.filter((node) => !sourceNodeIds.has(node.id)).map((node) => node.id));
  }, [chartRelationshipEdges, nodes]);

  const addCardNodes = useMemo<AddCardGraphNode[]>(
    () =>
      editMode
        ? nodes
            .filter((node) => leafNodeIds.has(node.id))
            .map((node) => ({
              id: `add-${node.id}`,
              type: "addCard",
              draggable: false,
              selectable: false,
              position: {
                x: node.position.x,
                y: node.position.y + 142
              },
              data: {
                onAddContact: addContactUnderNode,
                parentNodeId: node.id
              }
            }))
        : [],
    [addContactUnderNode, editMode, leafNodeIds, nodes]
  );

  const flowNodes = useMemo<ChartFlowNode[]>(
    () => (editMode ? [...nodes, ...addCardNodes] : nodes),
    [addCardNodes, editMode, nodes]
  );

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
            matched,
            onDeleteContact: deleteContactNode
          }
        };
      })
    );
  }, [deleteContactNode, normalizedQuery, setNodes]);

  const edges = useMemo<Edge[]>(
    () => {
      const hierarchyEdges = chartRelationshipEdges.map((edge) => ({
        id: edge.id,
        source: edge.sourceNodeId,
        target: edge.targetNodeId,
        type: "smoothstep",
        animated: editMode,
        pathOptions: { borderRadius: 24 },
        style: { stroke: "#a8b3bd", strokeWidth: 1.6 }
      }));

      const addEdges = addCardNodes.map((node) => ({
        id: `edge-${node.data.parentNodeId}-${node.id}`,
        source: node.data.parentNodeId,
        target: node.id,
        type: "smoothstep",
        style: {
          stroke: "#a8a8a8",
          strokeDasharray: "3 5",
          strokeWidth: 1.5
        }
      }));

      return [...hierarchyEdges, ...addEdges];
    },
    [addCardNodes, chartRelationshipEdges, editMode]
  );

  return (
    <section className="chart-panel" aria-label="Organizational chart workspace">
      <div className="chart-toolbar">
        <div className="toolbar-left">
          <button
            className={editMode ? "save-button" : "primary-button"}
            onClick={() => setEditMode(!editMode)}
            type="button"
          >
            {editMode ? null : <Pencil size={15} aria-hidden="true" />}
            {editMode ? "Save Changes" : "Edit"}
          </button>
          {editMode ? (
            <button className="add-contact-button" onClick={() => addContactUnderNode()} type="button">
              <Plus size={15} aria-hidden="true" />
              Add Contact
            </button>
          ) : null}
          <button className="icon-button" aria-label="Recent changes" disabled={editMode} type="button">
            <HelpCircle size={15} />
          </button>
          <button className="icon-button" aria-label="List view" disabled={editMode} type="button">
            <List size={15} />
          </button>
          <button className="icon-button" aria-label="Preview visibility" disabled={editMode} type="button">
            <Eye size={15} />
          </button>
          <label className={editMode ? "search-field disabled" : "search-field"}>
            <span className="sr-only">Search people</span>
            <input
              disabled={editMode}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              type="search"
              value={query}
            />
            <Search size={16} aria-hidden="true" />
          </label>
        </div>
        <div className="toolbar-right">
          <button className="primary-button" disabled={editMode} type="button">
            Legend
          </button>
          <button className="secondary-button" disabled={editMode} type="button">
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
          nodes={flowNodes}
          nodeTypes={nodeTypes}
          nodesDraggable
          onNodeClick={(_, node) => {
            if (node.type === "addCard") {
              addContactUnderNode((node as AddCardGraphNode).data.parentNodeId);
            }
          }}
          onNodesChange={onNodesChange as OnNodesChange<ChartFlowNode>}
          panOnScroll
          proOptions={{ hideAttribution: true }}
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
