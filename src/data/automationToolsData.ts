export interface ToolFeature {
  title: string;
  features: string[];
}

export interface AutomationTool {
  id: string;
  title: string;
  icon: string;
  color: string;
  tagline: string;
  category: string;
  pricing: string;
  level: string;
  features: ToolFeature[];
  benefits: string[];
  capabilities: string[];
  documentation: string;
  integration: {
    platforms: string[];
    languages: string[];
    frameworks: string[];
  };
  description: string;
  requirements: string[];
  reviews: {
    name: string;
    role: string;
    text: string;
  }[];
  demoAvailable: boolean;
}

export const automationTools: AutomationTool[] = [
  {
    id: "whatsapp-bulk-sender",
    title: "WhatsApp Bulk Message Sender",
    icon: "💬",
    color: "from-green-500 to-emerald-500",
    tagline: "Send personalized WhatsApp messages at scale with scheduling and templates",
    category: "Marketing & Communication",
    pricing: "Free trial available",
    level: "All Levels",
    features: [
      {
        title: "Messaging",
        features: [
          "Bulk sending with smart batching",
          "Personalization with name/placeholders",
          "Media attachments (images/docs)",
          "Message templates"
        ]
      },
      {
        title: "Productivity",
        features: [
          "CSV/Excel contact import",
          "Scheduling & rate limiting",
          "Delivery status overview",
          "Duplicate & invalid number handling"
        ]
      }
    ],
    benefits: [
      "Reach more customers faster",
      "Save manual effort",
      "Consistent messaging",
      "Better engagement with personalization"
    ],
    capabilities: [
      "CSV Import",
      "Template Management",
      "Scheduling",
      "Delivery Reports"
    ],
    documentation: "Quick start guide with CSV format, template variables, and scheduling tips",
    integration: {
      platforms: ["Windows", "macOS", "Web"],
      languages: [""],
      frameworks: [""]
    },
    description: "A simple, reliable bulk WhatsApp sender that lets you import contacts, personalize messages, attach media, and schedule campaigns with rate limiting to reduce blocks.",
    requirements: [
      "An active WhatsApp account",
      "CSV/Excel file with phone numbers",
      "Stable internet connection"
    ],
    reviews: [
      {
        name: "Anita V.",
        role: "Marketing Manager",
        text: "We reached 2,000+ leads in a day with personalized messages. Huge time saver!"
      }
    ],
    demoAvailable: true
  }
];

export const getToolById = (id: string): AutomationTool | undefined => {
  return automationTools.find(tool => tool.id === id);
};