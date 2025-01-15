// import React, { useState, useEffect } from "react";
// import { Camera } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "./UI/card";
// import { Alert, AlertTitle, AlertDescription } from "./UI/alert";
// import axios from "axios"; // Import Axios

// const EventCheckIn = () => {
//   const [guests, setGuests] = useState([]);
//   const [scanning, setScanning] = useState(false);
//   const [lastScanned, setLastScanned] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch guests list from the backend when the component mounts
//   useEffect(() => {
//     const fetchGuests = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/guests"); // Update with your backend API URL
//         setGuests(response.data);
//       } catch (err) {
//         setError("Failed to fetch guest list");
//       }
//     };

//     fetchGuests();
//   }, []);

//   // Handle scan result by sending the guest data to the backend
//   const handleScan = async (scanData) => {
//     try {
//       // Simulated QR code scan result handler
//       const guestData = JSON.parse(
//         scanData ||
//           '{"GuestID":"123","Name":"John Doe","Email":"john@example.com"}'
//       );

//       // Check if guest already checked in
//       const existingGuest = guests.find((g) => g.GuestID === guestData.GuestID);
//       if (existingGuest) {
//         setError(
//           `${guestData.Name} has already checked in at ${existingGuest.checkInTime}`
//         );
//         return;
//       }

//       // Send check-in data to the backend
//       const checkInTime = new Date().toLocaleTimeString();
//       const newGuest = {
//         ...guestData,
//         checkInTime,
//       };

//       await axios.post("http://localhost:5000/check-in", {
//         GuestID: guestData.GuestID,
//       }); // Backend check-in API

//       setGuests((prev) => [...prev, newGuest]);
//       setLastScanned(newGuest);
//       setError(null);
//     } catch (err) {
//       setError("Invalid QR code data or check-in failed");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-4">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             Event Check-in System
//             <button
//               onClick={() => setScanning(!scanning)}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               <Camera size={20} />
//               {scanning ? "Stop Scanning" : "Start Scanning"}
//             </button>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {scanning && (
//             <div className="mb-4 p-4 border-2 border-dashed rounded-lg text-center">
//               <p>Camera feed would appear here</p>
//               <button
//                 onClick={() => handleScan()}
//                 className="mt-2 px-4 py-2 bg-gray-200 rounded-md"
//               >
//                 Simulate Scan
//               </button>
//             </div>
//           )}

//           {error && (
//             <Alert variant="destructive" className="mb-4">
//               <AlertTitle>Error</AlertTitle>
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {lastScanned && (
//             <Alert className="mb-4">
//               <AlertTitle>Last Check-in</AlertTitle>
//               <AlertDescription>
//                 {lastScanned.Name} checked in at {lastScanned.checkInTime}
//               </AlertDescription>
//             </Alert>
//           )}

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="p-2 text-left">Name</th>
//                   <th className="p-2 text-left">Email</th>
//                   <th className="p-2 text-left">Check-in Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {guests.map((guest, index) => (
//                   <tr key={index} className="border-b">
//                     <td className="p-2">{guest.Name}</td>
//                     <td className="p-2">{guest.Email}</td>
//                     <td className="p-2">{guest.checkInTime}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default EventCheckIn;

// Functional Part

import React, { useState } from "react";
import { Camera } from "lucide-react";
// import { ReactQRReader } from "react-qr-reader"; // Correct import for the QR reader
import { QrReader } from "react-qr-reader";
import { Card, CardHeader, CardTitle, CardContent } from "./UI/card";
import { Alert, AlertTitle, AlertDescription } from "./UI/alert";

const EventCheckIn = () => {
  const [guests, setGuests] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState(null);
  const [error, setError] = useState(null);

  // Simulated QR code scan result handler
  const handleScan = (scanData) => {
    try {
      // In a real application, scanData would be the QR code content
      // Here we're simulating a JSON string that would be encoded in the QR code
      const guestData = JSON.parse(
        scanData || '{"id":"123","name":"John Doe","email":"john@example.com"}'
      );

      // Check if guest already checked in
      const existingGuest = guests.find((g) => g.id === guestData.id);
      if (existingGuest) {
        setError(
          `${guestData.name} has already checked in at ${existingGuest.checkInTime}`
        );
        return;
      }

      // Add check-in time to guest data
      const checkInTime = new Date().toLocaleTimeString();
      const newGuest = {
        ...guestData,
        checkInTime,
      };

      setGuests((prev) => [...prev, newGuest]);
      setLastScanned(newGuest);
      setError(null);
    } catch (err) {
      setError("Invalid QR code data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Event Check-in System
            <button
              onClick={() => setScanning(!scanning)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Camera size={20} />
              {scanning ? "Stop Scanning" : "Start Scanning"}
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scanning && (
            <div className="mb-4 p-4 border-2 border-dashed rounded-lg text-center">
              <p>Camera feed would appear here</p>
              <QrReader
                onScan={handleScan}
                onError={(error) => setError(`Scan error: ${error.message}`)}
              />
              <button
                onClick={() => handleScan()}
                className="mt-2 px-4 py-2 bg-gray-200 rounded-md"
              >
                Simulate Scan
              </button>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {lastScanned && (
            <Alert className="mb-4">
              <AlertTitle>Last Check-in</AlertTitle>
              <AlertDescription>
                {lastScanned.name} checked in at {lastScanned.checkInTime}
              </AlertDescription>
            </Alert>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Check-in Time</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{guest.name}</td>
                    <td className="p-2">{guest.email}</td>
                    <td className="p-2">{guest.checkInTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCheckIn;
