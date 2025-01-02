"use client";
import React from "react";

const Chat = () => {
  // const { socket } = useSocket();

  // const handleSendEvent = async () => {
  //   try {
  //     const accessToken = await getCookie(AppConfig.ACCESS_TOKEN);
  //     const res = await fetch(`${AppConfig.API_URL}/api/chat/test`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     console.log(res, "res");
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };

  // useEffect(() => {
  //   if (socket) {
  //     // Example of listening to events
  //     socket.on("user-detail", (data) => {
  //       console.log("Received user details:", data);
  //       // Handle the data
  //     });

  //     return () => {
  //       socket.off("user-detail");
  //     };
  //   }
  // }, [socket]);

  return (
    <div>
      Chat app
      {/* <button onClick={handleSendEvent}>get user details</button> */}
    </div>
  );
};

export default Chat;
