export const enum InvitationStatus {
  ACCEPT = "accept",
  PENDING = "pending",
  DECLINE = "decline",
}

export const enum InvitationTabValue {
  SEND = "send",
  RECEIVE = "receive",
}

export const InvitationTab = [
  { name: "Send", value: InvitationTabValue.SEND },
  { name: "Receive", value: InvitationTabValue.RECEIVE },
];
