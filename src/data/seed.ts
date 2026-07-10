import type { Account, ChartEdge, ChartNode, Contact } from "./types";

export const finovatechAccount: Account = {
  id: "acct-finovatech",
  name: "Finovatech",
  industryTags: ["Technology", "Finance"],
  description:
    "Finovatech is a cutting-edge technology finance company dedicated to empowering businesses and individuals with innovative financial solutions. By leveraging advanced AI, blockchain technology, and data analytics, Finovatech provides secure, efficient, and personalized financial management tools.",
  phone: "404-527-9868",
  email: "finovatech@gmail.com",
  website: "https://finovatech.com",
  address: "123 Innovation Drive, Suite 456, Atlanta, GA 30303"
};

export const contacts: Contact[] = [
  {
    id: "robert-elbert",
    accountId: "acct-finovatech",
    fullName: "Robert Elbert",
    title: "Chief Executive Officer",
    department: "Executive",
    location: "Atlanta, GA",
    relationshipTags: ["SC", "SFTE"]
  },
  {
    id: "cheryl-garvin",
    accountId: "acct-finovatech",
    fullName: "Cheryl Garvin",
    title: "Chief Operating Officer",
    department: "Operations",
    location: "Atlanta, GA",
    relationshipTags: ["12", "SFTE"]
  },
  {
    id: "jon-mcfarland",
    accountId: "acct-finovatech",
    fullName: "Jon McFarland",
    title: "Chief Financial Officer",
    department: "Finance",
    location: "Atlanta, GA",
    relationshipTags: ["SC", "SFTE", "12"]
  },
  {
    id: "evelyn-chen",
    accountId: "acct-finovatech",
    fullName: "Evelyn Chen",
    title: "Chief Technical Officer",
    department: "Technology",
    location: "Atlanta, GA",
    relationshipTags: []
  },
  {
    id: "robert-green",
    accountId: "acct-finovatech",
    fullName: "Robert Green",
    title: "VP of Operations",
    department: "Operations",
    location: "Atlanta, GA",
    relationshipTags: []
  },
  {
    id: "lily-lambert",
    accountId: "acct-finovatech",
    fullName: "Lily Lambert",
    title: "VP of Sales",
    department: "Sales",
    location: "Atlanta, GA",
    relationshipTags: []
  },
  {
    id: "emily-wright",
    accountId: "acct-finovatech",
    fullName: "Emily Wright",
    title: "VP of Finance",
    department: "Finance",
    location: "Atlanta, GA",
    relationshipTags: ["12"]
  },
  {
    id: "kevin-sanchez",
    accountId: "acct-finovatech",
    fullName: "Kevin Sanchez",
    title: "VP of Technology",
    department: "Technology",
    location: "Atlanta, GA",
    relationshipTags: ["12", "SFTE"]
  },
  {
    id: "michelle-brown",
    accountId: "acct-finovatech",
    fullName: "Michelle Brown",
    title: "Chief Operations Officer",
    department: "Operations",
    location: "Atlanta, GA",
    relationshipTags: ["12", "SFTE"]
  },
  {
    id: "nicole-bennett",
    accountId: "acct-finovatech",
    fullName: "Nicole Bennett",
    title: "HR Manager",
    department: "People",
    location: "Atlanta, GA",
    relationshipTags: ["12", "MPTE"]
  },
  {
    id: "ryan-edwards",
    accountId: "acct-finovatech",
    fullName: "Ryan Edwards",
    title: "Sales Manager",
    department: "Sales",
    location: "Atlanta, GA",
    relationshipTags: ["12", "SFTE"]
  },
  {
    id: "daniel-walker",
    accountId: "acct-finovatech",
    fullName: "Daniel Walker",
    title: "Software Engineer",
    department: "Technology",
    location: "Atlanta, GA",
    relationshipTags: ["12", "SFTE"]
  },
  {
    id: "tessa-morris",
    accountId: "acct-finovatech",
    fullName: "Tessa Morris",
    title: "Software Dev Manager",
    department: "Technology",
    location: "Atlanta, GA",
    relationshipTags: ["12", "MPTE"]
  }
];

export const chartNodes: ChartNode[] = [
  { id: "node-robert-elbert", contactId: "robert-elbert", position: { x: 660, y: 20 } },
  { id: "node-cheryl-garvin", contactId: "cheryl-garvin", position: { x: 300, y: 145 } },
  { id: "node-jon-mcfarland", contactId: "jon-mcfarland", position: { x: 640, y: 145 } },
  { id: "node-evelyn-chen", contactId: "evelyn-chen", position: { x: 875, y: 145 } },
  { id: "node-robert-green", contactId: "robert-green", position: { x: 180, y: 260 } },
  { id: "node-lily-lambert", contactId: "lily-lambert", position: { x: 410, y: 260 } },
  { id: "node-emily-wright", contactId: "emily-wright", position: { x: 650, y: 260 } },
  { id: "node-kevin-sanchez", contactId: "kevin-sanchez", position: { x: 900, y: 260 } },
  { id: "node-michelle-brown", contactId: "michelle-brown", position: { x: 140, y: 380 } },
  { id: "node-nicole-bennett", contactId: "nicole-bennett", position: { x: 300, y: 380 } },
  { id: "node-ryan-edwards", contactId: "ryan-edwards", position: { x: 470, y: 380 } },
  { id: "node-daniel-walker", contactId: "daniel-walker", position: { x: 800, y: 380 } },
  { id: "node-tessa-morris", contactId: "tessa-morris", position: { x: 960, y: 380 } }
];

export const chartEdges: ChartEdge[] = [
  { id: "edge-ceo-coo", sourceNodeId: "node-robert-elbert", targetNodeId: "node-cheryl-garvin", relationshipType: "reports-to" },
  { id: "edge-ceo-cfo", sourceNodeId: "node-robert-elbert", targetNodeId: "node-jon-mcfarland", relationshipType: "reports-to" },
  { id: "edge-ceo-cto", sourceNodeId: "node-robert-elbert", targetNodeId: "node-evelyn-chen", relationshipType: "reports-to" },
  { id: "edge-coo-ops", sourceNodeId: "node-cheryl-garvin", targetNodeId: "node-robert-green", relationshipType: "reports-to" },
  { id: "edge-coo-sales", sourceNodeId: "node-cheryl-garvin", targetNodeId: "node-lily-lambert", relationshipType: "reports-to" },
  { id: "edge-cfo-finance", sourceNodeId: "node-jon-mcfarland", targetNodeId: "node-emily-wright", relationshipType: "reports-to" },
  { id: "edge-cto-tech", sourceNodeId: "node-evelyn-chen", targetNodeId: "node-kevin-sanchez", relationshipType: "reports-to" },
  { id: "edge-ops-michelle", sourceNodeId: "node-robert-green", targetNodeId: "node-michelle-brown", relationshipType: "reports-to" },
  { id: "edge-ops-nicole", sourceNodeId: "node-robert-green", targetNodeId: "node-nicole-bennett", relationshipType: "reports-to" },
  { id: "edge-sales-ryan", sourceNodeId: "node-lily-lambert", targetNodeId: "node-ryan-edwards", relationshipType: "reports-to" },
  { id: "edge-tech-daniel", sourceNodeId: "node-kevin-sanchez", targetNodeId: "node-daniel-walker", relationshipType: "reports-to" },
  { id: "edge-tech-tessa", sourceNodeId: "node-kevin-sanchez", targetNodeId: "node-tessa-morris", relationshipType: "reports-to" }
];

