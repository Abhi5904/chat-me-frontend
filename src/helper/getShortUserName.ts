const getShortUserName = (firstName?: string, lastName?: string) => {
  // Get the first letter of the firstName
  const firstInitial = firstName ? firstName?.charAt(0)?.toUpperCase() : "X";

  // Get the first letter of the lastName if provided
  const lastInitial = lastName ? lastName?.charAt(0)?.toUpperCase() : "Y";

  // Combine the initials
  return firstInitial + lastInitial;
};

export default getShortUserName;
