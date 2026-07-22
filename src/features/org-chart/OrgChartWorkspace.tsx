import {
  Background,
  ConnectionMode,
  Controls,
  ReactFlow,
  useNodesState,
  type Edge,
  type OnConnect,
  type OnConnectEnd,
  type OnConnectStart,
  type OnNodesChange
} from "@xyflow/react";
import { Eye, HelpCircle, Info, Linkedin, List, Mail, MapPin, Pencil, Phone, Plus, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import profilePhoto from "../../assets/profile-photo.jpg";
import { chartEdges, chartNodes, contacts as seedContacts } from "../../data/seed";
import type { ChartEdge, Contact } from "../../data/types";
import { useOrgChartStore } from "../../stores/orgChartStore";
import { PersonNode, type PersonGraphNode } from "./PersonNode";

const nodeTypes = {
  person: PersonNode
};

type ChartFlowNode = PersonGraphNode;
type ConnectionSide = "top" | "bottom";
type ConnectedSides = Record<ConnectionSide, boolean>;
type NodePosition = PersonGraphNode["position"];
type PendingConnection = {
  handleId: string | null;
  nodeId: string;
};

const CARD_WIDTH = 124;
const CARD_HEIGHT = 88;
const CARD_GAP = 36;

const emptyConnectedSides = (): ConnectedSides => ({
  bottom: false,
  top: false
});

const constrainOrgChartEdges = (edges: ChartEdge[]) => {
  const childNodeIds = new Set<string>();
  const constrainedEdges: ChartEdge[] = [];

  for (const edge of edges) {
    if (childNodeIds.has(edge.targetNodeId)) {
      continue;
    }

    childNodeIds.add(edge.targetNodeId);
    constrainedEdges.push(edge);
  }

  return constrainedEdges;
};

const getSideFromHandleId = (handleId?: string | null): ConnectionSide | undefined => {
  if (!handleId?.startsWith("edit-")) {
    return undefined;
  }

  const side = handleId.replace("edit-", "");

  return side === "top" || side === "bottom" ? side : undefined;
};

const getPointerClientPosition = (event: globalThis.MouseEvent | TouchEvent) => {
  return "clientX" in event
    ? {
        x: event.clientX,
        y: event.clientY
      }
    : {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY
      };
};

const getNodeIdAtPointer = (event: globalThis.MouseEvent | TouchEvent) => {
  const pointer = getPointerClientPosition(event);
  const elementsAtPointer = document.elementsFromPoint(pointer.x, pointer.y);
  const nodeElement = elementsAtPointer.find((element) => element.matches(".react-flow__node[data-id]"));

  return nodeElement?.getAttribute("data-id") ?? undefined;
};

const overlapsExistingNode = (position: NodePosition, existingPosition: NodePosition) => {
  return (
    position.x < existingPosition.x + CARD_WIDTH + CARD_GAP &&
    position.x + CARD_WIDTH + CARD_GAP > existingPosition.x &&
    position.y < existingPosition.y + CARD_HEIGHT + CARD_GAP &&
    position.y + CARD_HEIGHT + CARD_GAP > existingPosition.y
  );
};

const findOpenCardPosition = (currentNodes: PersonGraphNode[]) => {
  const selectedNodes = currentNodes.filter((node) => node.selected);
  const anchorNode = selectedNodes[0] ?? currentNodes[currentNodes.length - 1];
  const anchorPosition = anchorNode?.position ?? { x: 520, y: 520 };
  const offsets = [
    { x: 170, y: 0 },
    { x: 0, y: 145 },
    { x: -170, y: 0 },
    { x: 170, y: 145 },
    { x: -170, y: 145 },
    { x: 340, y: 0 },
    { x: 0, y: 290 },
    { x: -340, y: 0 },
    { x: 340, y: 145 },
    { x: -340, y: 145 }
  ];

  for (const offset of offsets) {
    const candidate = {
      x: anchorPosition.x + offset.x,
      y: anchorPosition.y + offset.y
    };

    if (!currentNodes.some((node) => overlapsExistingNode(candidate, node.position))) {
      return candidate;
    }
  }

  const rightMostNode = currentNodes.reduce(
    (rightMost, node) => (node.position.x > rightMost.position.x ? node : rightMost),
    anchorNode
  );

  return {
    x: (rightMostNode?.position.x ?? anchorPosition.x) + 170,
    y: rightMostNode?.position.y ?? anchorPosition.y
  };
};

const getContactSlug = (fullName: string) => fullName.toLowerCase().replace(/\s+/g, "");
const getContactEmailName = (fullName: string) => fullName.toLowerCase().replace(/\s+/g, ".");

export function OrgChartWorkspace() {
  const editMode = useOrgChartStore((state) => state.editMode);
  const query = useOrgChartStore((state) => state.query);
  const selectedPersonId = useOrgChartStore((state) => state.selectedPersonId);
  const hoveredPersonId = useOrgChartStore((state) => state.hoveredPersonId);
  const setEditMode = useOrgChartStore((state) => state.setEditMode);
  const setQuery = useOrgChartStore((state) => state.setQuery);
  const setDraftName = useOrgChartStore((state) => state.setDraftName);
  const selectPerson = useOrgChartStore((state) => state.selectPerson);
  const setHoveredPerson = useOrgChartStore((state) => state.setHoveredPerson);

  const [contacts, setContacts] = useState<Contact[]>(seedContacts);
  const [chartRelationshipEdges, setChartRelationshipEdges] = useState<ChartEdge[]>(() =>
    constrainOrgChartEdges(chartEdges)
  );
  const pendingConnectionRef = useRef<PendingConnection | undefined>(undefined);
  const nextContactIndexRef = useRef(seedContacts.length + 1);

  const normalizedQuery = query.trim().toLowerCase();
  const activePersonId = selectedPersonId ?? hoveredPersonId;
  const selectedContact = contacts.find((contact) => contact.id === activePersonId);
  const selectedContactBio = selectedContact
    ? `${selectedContact.fullName} is the ${selectedContact.title.toLowerCase()} for Coca-Cola's enterprise account team, bringing cross-functional experience in stakeholder alignment, account planning, and organizational execution. With a proven track record of improving communication across departments, ${selectedContact.fullName.split(" ")[0]} helps teams identify priorities, remove blockers, and drive relationship momentum across the account.`
    : "";

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

  const addContactToCanvas = useCallback(
    () => {
      setNodes((currentNodes) => {
        const nextIndex = nextContactIndexRef.current;
        nextContactIndexRef.current += 1;
        const newContact = createPlaceholderContact(nextIndex);
        const newNodeId = `node-${newContact.id}`;
        const newPosition = findOpenCardPosition(currentNodes);

        setContacts((currentContacts) => [...currentContacts, newContact]);

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
    [createPlaceholderContact, deleteContactNode, selectPerson, setHoveredPerson, setNodes]
  );

  const connectContactNodes = useCallback(
    (sourceNodeId: string, targetNodeId: string, sourceHandleId?: string | null) => {
      if (!editMode || sourceNodeId === targetNodeId) {
        return;
      }

      setChartRelationshipEdges((currentEdges) => {
        const sourceSide = getSideFromHandleId(sourceHandleId);
        const parentNodeId = sourceSide === "top" ? targetNodeId : sourceNodeId;
        const childNodeId = sourceSide === "top" ? sourceNodeId : targetNodeId;
        const nodeIds = new Set(nodes.map((node) => node.id));

        if (!nodeIds.has(parentNodeId) || !nodeIds.has(childNodeId)) {
          return currentEdges;
        }

        const alreadyConnected = currentEdges.some(
          (edge) =>
            (edge.sourceNodeId === parentNodeId && edge.targetNodeId === childNodeId) ||
            (edge.sourceNodeId === childNodeId && edge.targetNodeId === parentNodeId)
        );
        const childAlreadyHasParent = currentEdges.some((edge) => edge.targetNodeId === childNodeId);

        if (alreadyConnected || childAlreadyHasParent) {
          return currentEdges;
        }

        return [
          ...currentEdges,
          {
            id: `edge-${parentNodeId}-${childNodeId}-${Date.now()}`,
            sourceNodeId: parentNodeId,
            targetNodeId: childNodeId,
            relationshipType: "reports-to"
          }
        ];
      });
    },
    [editMode, nodes]
  );

  const handleNativeConnect = useCallback<OnConnect>(
    (connection) => {
      if (!connection.source || !connection.target) {
        return;
      }

      connectContactNodes(connection.source, connection.target, connection.sourceHandle);
    },
    [connectContactNodes]
  );

  const handleConnectStart = useCallback<OnConnectStart>(
    (_event, params) => {
      pendingConnectionRef.current =
        editMode && params.nodeId
          ? {
              handleId: params.handleId,
              nodeId: params.nodeId
            }
          : undefined;
    },
    [editMode]
  );

  const handleConnectEnd = useCallback<OnConnectEnd>(
    (event) => {
      const pendingConnection = pendingConnectionRef.current;
      pendingConnectionRef.current = undefined;

      if (!pendingConnection) {
        return;
      }

      const targetNodeId = getNodeIdAtPointer(event);

      if (!targetNodeId) {
        return;
      }

      connectContactNodes(pendingConnection.nodeId, targetNodeId, pendingConnection.handleId);
    },
    [connectContactNodes]
  );

  const deleteRelationshipEdge = useCallback(
    (event, edge) => {
      if (!editMode) {
        return;
      }

      event.stopPropagation();
      setChartRelationshipEdges((currentEdges) => currentEdges.filter((chartEdge) => chartEdge.id !== edge.id));
    },
    [editMode]
  ) as (event: ReactMouseEvent, edge: Edge) => void;

  const connectedSideMap = useMemo(() => {
    const sideMap = new Map(nodes.map((node) => [node.id, emptyConnectedSides()]));

    chartRelationshipEdges.forEach((edge) => {
      sideMap.get(edge.targetNodeId)!.top = true;
    });

    return sideMap;
  }, [chartRelationshipEdges, nodes]);

  const personFlowNodes = useMemo<PersonGraphNode[]>(
    () =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          connectedSides: connectedSideMap.get(node.id) ?? emptyConnectedSides()
        }
      })),
    [connectedSideMap, nodes]
  );

  const flowNodes = useMemo<ChartFlowNode[]>(
    () => personFlowNodes,
    [personFlowNodes]
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
        className: editMode ? "editable-chart-edge" : undefined,
        type: "smoothstep",
        animated: editMode,
        pathOptions: { borderRadius: 24 },
        style: { stroke: "#a8b3bd", strokeWidth: 1.6 }
      }));

      return hierarchyEdges;
    },
    [chartRelationshipEdges, editMode]
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
            <button className="add-contact-button" onClick={() => addContactToCanvas()} type="button">
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
          connectionMode={ConnectionMode.Loose}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          maxZoom={1.35}
          minZoom={0.45}
          nodes={flowNodes}
          nodeTypes={nodeTypes}
          nodesDraggable
          nodesConnectable={editMode}
          onConnect={handleNativeConnect}
          onConnectEnd={handleConnectEnd}
          onConnectStart={handleConnectStart}
          onEdgeClick={deleteRelationshipEdge}
          onNodesChange={onNodesChange as OnNodesChange<ChartFlowNode>}
          panOnDrag={editMode ? [1] : true}
          panOnScroll={!editMode}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#d7dee4" gap={22} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <aside
        className={`${selectedContact ? "person-drawer open" : "person-drawer"} ${editMode ? "edit-drawer" : ""}`}
        aria-label="Selected person details"
      >
        {selectedContact ? (
          <div className="drawer-content">
            <button
              aria-label="Close contact details"
              className="drawer-close"
              onClick={() => {
                selectPerson(undefined);
                setHoveredPerson(undefined);
              }}
              type="button"
            >
              <X size={24} aria-hidden="true" />
            </button>
            {editMode ? (
              <>
                <div className="edit-drawer-header">
                  <h2>Edit Mode</h2>
                  <button className="remove-account-button" type="button">
                    Remove Account
                  </button>
                </div>
                <div className="profile-image-editor">
                  <img alt="" src={profilePhoto} />
                  <button type="button">Change Profile image</button>
                </div>
                <div className="drawer-identity">
                  <label className="drawer-inline-field">
                    <span className="sr-only">Title</span>
                    <input defaultValue={selectedContact.title} />
                  </label>
                  <label className="drawer-inline-field name-field">
                    <span className="sr-only">Name</span>
                    <input
                      defaultValue={selectedContact.fullName}
                      key={selectedContact.id}
                      onChange={(event) => setDraftName(event.target.value)}
                      placeholder={selectedContact.fullName}
                    />
                  </label>
                </div>
                <div className="drawer-edit-fields">
                  <label>
                    <Phone size={20} aria-hidden="true" />
                    <input defaultValue="(555) 123-4567" />
                  </label>
                  <label>
                    <Mail size={20} aria-hidden="true" />
                    <input defaultValue={`${getContactEmailName(selectedContact.fullName)}@coca-cola.com`} />
                  </label>
                  <label>
                    <Linkedin size={20} aria-hidden="true" />
                    <input defaultValue={`linkedin.com/in/${getContactSlug(selectedContact.fullName)}`} />
                  </label>
                  <label>
                    <MapPin size={20} aria-hidden="true" />
                    <input defaultValue={selectedContact.location} />
                  </label>
                  <textarea defaultValue={selectedContactBio} />
                </div>
                {selectedContact.cardVariant === "grey" ? (
                  <button className="add-to-leads-button" type="button">
                    Add to Leads
                  </button>
                ) : (
                  <div className="account-manager-card edit-manager-card">
                    <img alt="" src={profilePhoto} />
                    <div>
                      <strong>Leo Young</strong>
                      <span>Current AM in Charge</span>
                    </div>
                    <Mail size={22} aria-hidden="true" />
                  </div>
                )}
                <div className="drawer-edit-actions">
                  <button className="secondary-action" type="button">
                    Cancel
                  </button>
                  <button className="primary-action" type="button">
                    Save
                  </button>
                  <button className="primary-action" type="button">
                    Publish
                  </button>
                </div>
              </>
            ) : (
              <>
                <img className="drawer-avatar" alt="" src={profilePhoto} />
                <div className="drawer-identity">
                  <p>{selectedContact.title.replace("Chief Executive Officer", "CEO")}</p>
                  <h2>{selectedContact.fullName}</h2>
                </div>
                <div className="drawer-contact-list">
                  <div>
                    <Phone size={20} aria-hidden="true" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div>
                    <Mail size={20} aria-hidden="true" />
                    <span>{getContactEmailName(selectedContact.fullName)}@coca-cola.com</span>
                  </div>
                  <div>
                    <Linkedin size={20} aria-hidden="true" />
                    <span>linkedin.com/in/{getContactSlug(selectedContact.fullName)}</span>
                  </div>
                  <div>
                    <MapPin size={20} aria-hidden="true" />
                    <span>{selectedContact.location}</span>
                  </div>
                </div>
                <div className="drawer-bio">
                  <p>{selectedContactBio.slice(0, 230)}...</p>
                  <button type="button">see more</button>
                </div>
                <div className="drawer-action-stack">
                  <button type="button">View Activity Timeline</button>
                  <button type="button">View Contract Placements</button>
                  <button type="button">View Similar Contracts</button>
                </div>
                {selectedContact.cardVariant === "grey" ? (
                  <button className="add-to-leads-button" type="button">
                    Add to Leads
                  </button>
                ) : (
                  <div className="account-manager-card">
                    <img alt="" src={profilePhoto} />
                    <div>
                      <strong>Leo Young</strong>
                      <span>Current AM in Charge</span>
                    </div>
                    <Mail size={22} aria-hidden="true" />
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <p>Select a person card to inspect account relationships.</p>
        )}
      </aside>
    </section>
  );
}
