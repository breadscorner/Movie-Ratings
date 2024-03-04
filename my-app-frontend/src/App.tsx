// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useEffect, useState } from "react";
// import "./App.css";

// import {
//   HubConnection,
//   HubConnectionBuilder,
//   LogLevel,
// } from "@microsoft/signalr";

// export default function App() {
//   const [connection, setConnection] = useState<HubConnection | undefined>(
//     undefined
//   );

//   useEffect(() => {
//     // Cancel everything if this component unmounts
//     let canceled = false;

//     // Build a connection to the signalR server. Automatically reconnect if the connection is lost.
//     const connection = new HubConnectionBuilder()
//       .withUrl("/r/movies")
//       .withAutomaticReconnect()
//       .configureLogging(LogLevel.Information)
//       .build();

//     // Try to start the connection
//     connection
//       .start()
//       .then(() => {
//         if (!canceled) {
//           setConnection(connection);
//         }
//       })
//       .catch((error) => {
//         console.log("signal error", error);
//       });

//     // Handle the connection closing
//     connection.onclose((error) => {
//       if (canceled) {
//         return;
//       }
//       console.log("signal closed");
//       setConnection(undefined);
//     });

//     // If the connection is lost, it won't close. Instead it will try to reconnect.
//     // So we need to treat this is a lost connection until `onreconnected` is called.
//     connection.onreconnecting((error) => {
//       if (canceled) {
//         return;
//       }
//       console.log("signal reconnecting");
//       setConnection(undefined);
//     });

//     // Connection is back, yay
//     connection.onreconnected((error) => {
//       if (canceled) {
//         return;
//       }
//       console.log("signal reconnected");
//       setConnection(connection);
//     });

//     // Clean up the connection when the component unmounts
//     return () => {
//       canceled = true;
//       connection.stop();
//     };
//   }, []);

//   return (
//     <div className="App">
//       <h1>SignalR Movies</h1>
//       <p>{connection ? "Connected" : "Not connected"}</p>
//     </div>
//   );
// }
