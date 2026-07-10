export type Account = {
  id: string;
  name: string;
  logoUrl?: string;
  description: string;
  industryTags: string[];
  phone: string;
  email: string;
  website: string;
  address: string;
};

export type Contact = {
  id: string;
  accountId: string;
  fullName: string;
  title: string;
  department: string;
  location: string;
  relationshipTags: string[];
  cardVariant: "blue" | "grey";
  cardMetric?: number;
};

export type ChartNode = {
  id: string;
  contactId: string;
  position: {
    x: number;
    y: number;
  };
};

export type ChartEdge = {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationshipType: "reports-to" | "influences" | "partner" | "stakeholder";
};
