export const mockEvents = [
  {
    id: "1",
    type: "Explicit Content",
    riskLevel: "high",
    timestamp: "15 minutes ago",
    platform: "Instagram",
    description: "Potentially inappropriate image detected in direct messages",
    aiExplanation:
      "The AI system detected an image that matches patterns associated with explicit content. The image was automatically blocked and requires parental review.",
  },
  {
    id: "2",
    type: "Cyberbullying",
    riskLevel: "medium",
    timestamp: "1 hour ago",
    platform: "WhatsApp",
    description: "Aggressive language detected in group chat",
    aiExplanation:
      "Multiple instances of aggressive language and threatening behavior were identified in a group conversation.",
  },
  {
    id: "3",
    type: "Grooming Attempt",
    riskLevel: "high",
    timestamp: "2 hours ago",
    platform: "Discord",
    description: "Suspicious pattern of communication detected",
    aiExplanation:
      "The AI detected communication patterns consistent with grooming behavior, including attempts to establish private communication channels.",
  },
];

// get a random mock event and set timestamp to now
export const getRandomMockEvent = () => {
  const randomIndex = Math.floor(Math.random() * mockEvents.length);
  const randomEvent = mockEvents[randomIndex];
  randomEvent.timestamp = new Date().toISOString();
  return randomEvent;
};

export const mockNotifications = [
  {
    id: "1",
    message: "High-risk content detected on Instagram",
    time: "15 minutes ago",
    isRead: false,
  },
  {
    id: "2",
    message: "New device login detected",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: "3",
    message: "Weekly activity report available",
    time: "3 hours ago",
    isRead: true,
  },
];
