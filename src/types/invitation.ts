export interface ISendInvitationPayload {
  senderId: string;
  invitations: {
    receiverId: string;
    message: string;
  }[];
}

export interface ISendInvitations {
  message: string;
  receiverId: {
    firstName: string;
    lastName: string;
    userName: string;
    _id: string;
    profilePicture: string;
  };
  status: string;
  _id: string;
}
export interface IReceiveInvitations {
  message: string;
  senderId: {
    firstName: string;
    lastName: string;
    userName: string;
    _id: string;
    profilePicture: string;
  };
  status: string;
  _id: string;
}
