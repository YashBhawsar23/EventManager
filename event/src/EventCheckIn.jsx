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

// import React, { useState } from "react";
// import { Camera } from "lucide-react";
// import { QrReader } from "react-qr-reader";
// import { Card, CardHeader, CardTitle, CardContent } from "./UI/card";
// import { Alert, AlertTitle, AlertDescription } from "./UI/alert";

// const EventCheckIn = () => {
//   const [guests, setGuests] = useState([]);
//   const [scanning, setScanning] = useState(false);
//   const [lastScanned, setLastScanned] = useState(null);
//   const [error, setError] = useState(null);

//   // Simulated QR code scan result handler
//   const handleScan = (scanData) => {
//     try {
//       // In a real application, scanData would be the QR code content
//       // Here we're simulating a JSON string that would be encoded in the QR code
//       const guestData = JSON.parse(
//         scanData || '{"id":"123","name":"John Doe","email":"john@example.com"}'
//       );

//       // Check if guest already checked in
//       const existingGuest = guests.find((g) => g.id === guestData.id);
//       if (existingGuest) {
//         setError(
//           `${guestData.name} has already checked in at ${existingGuest.checkInTime}`
//         );
//         return;
//       }

//       // Add check-in time to guest data
//       const checkInTime = new Date().toLocaleTimeString();
//       const newGuest = {
//         ...guestData,
//         checkInTime,
//       };

//       setGuests((prev) => [...prev, newGuest]);
//       setLastScanned(newGuest);
//       setError(null);
//     } catch (err) {
//       setError("Invalid QR code data");
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
//               <QrReader
//                 onScan={handleScan}
//                 onError={(error) => setError(`Scan error: ${error.message}`)}
//               />
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
//                 {lastScanned.name} checked in at {lastScanned.checkInTime}
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
//                     <td className="p-2">{guest.name}</td>
//                     <td className="p-2">{guest.email}</td>
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

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Camera, UserCheck, Users, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./UI/card";
import { Alert, AlertTitle, AlertDescription } from "./UI/alert";
import jsQR from "jsqr"; // Import jsQR

const EventCheckIn = () => {
  const [guests, setGuests] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState(null);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const videoRef = useRef(null); // Reference to video element
  const canvasRef = useRef(null); // Reference to canvas element for capturing frames

  const qrReaderConstraints = {
    facingMode: "environment", // Use back camera
  };

  const validateQRData = (data) => {
    const requiredFields = ["id", "name", "email"];
    try {
      const parsed = JSON.parse(data);
      const missingFields = requiredFields.filter((field) => !parsed[field]);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      return parsed;
    } catch (err) {
      throw new Error(`Invalid QR data format: ${err.message}`);
    }
  };

  const handleScan = useCallback(
    (scanData) => {
      setDebugInfo({
        timestamp: new Date().toISOString(),
        rawData: scanData,
        cameraType: "Back Camera",
      });

      if (!scanData) {
        return;
      }

      try {
        const guestData = validateQRData(scanData);

        const existingGuest = guests.find((g) => g.id === guestData.id);
        if (existingGuest) {
          setError(
            `${guestData.name} has already checked in at ${existingGuest.checkInTime}`
          );
          return;
        }

        const checkInTime = new Date().toLocaleTimeString();
        const newGuest = {
          ...guestData,
          checkInTime,
        };

        setGuests((prev) => [...prev, newGuest]);
        setLastScanned(newGuest);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    },
    [guests]
  );

  const startScanning = () => {
    setScanning(true);
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (videoElement && canvasElement) {
      const context = canvasElement.getContext("2d");

      const handleFrame = () => {
        if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
          canvasElement.height = videoElement.videoHeight;
          canvasElement.width = videoElement.videoWidth;
          context.drawImage(
            videoElement,
            0,
            0,
            canvasElement.width,
            canvasElement.height
          );

          const imageData = context.getImageData(
            0,
            0,
            canvasElement.width,
            canvasElement.height
          );
          const code = jsQR(
            imageData.data,
            canvasElement.width,
            canvasElement.height,
            {
              inversionAttempts: "dontInvert",
            }
          );

          if (code) {
            handleScan(code.data); // Process the QR code data
          }
        }

        if (scanning) {
          requestAnimationFrame(handleFrame); // Continue scanning
        }
      };

      handleFrame();
    }
  };

  const stopScanning = () => {
    setScanning(false);
    const videoElement = videoRef.current;
    if (videoElement) {
      const stream = videoElement.srcObject;
      const tracks = stream?.getTracks();
      tracks?.forEach((track) => track.stop());
      videoElement.srcObject = null;
    }
  };

  useEffect(() => {
    if (scanning) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => {
      stopScanning(); // Cleanup on component unmount or when scanning is stopped
    };
  }, [scanning]);

  const simulateScan = () => {
    const testData = {
      valid: JSON.stringify({
        id: "123",
        name: "John Doe",
        email: "john@example.com",
      }),
      invalid: "invalid-qr-data",
      missing: JSON.stringify({
        id: "124",
        name: "Jane Doe",
      }),
    };

    const testCases = ["valid", "invalid", "missing"];
    const currentCase = testCases[guests.length % testCases.length];
    handleScan(testData[currentCase]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  Total Guests
                </p>
                <p className="text-2xl font-bold">{guests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Last Check-in
                </p>
                <p className="text-lg font-medium truncate">
                  {lastScanned ? lastScanned.name : "None"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">
                  Scanner Status
                </p>
                <p className="text-lg font-medium">
                  {scanning ? "Active" : "Ready"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              Event Check-in System
            </CardTitle>
            <div className="flex gap-2">
              <button
                onClick={simulateScan}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Test Scanner
              </button>
              <button
                onClick={() => setScanning(!scanning)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  scanning
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                <Camera className="w-5 h-5" />
                {scanning ? "Stop Scanning" : "Start Scanning"}
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {scanning && (
            <div className="mb-6 overflow-hidden rounded-lg border-2 border-dashed border-gray-200">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-md mx-auto"
                style={{ display: "none" }}
                constraints={qrReaderConstraints}
              ></video>
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle className="font-bold">Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {debugInfo && (
            <Card className="mb-6 bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Scanner Debug Info:</h3>
                <pre className="text-sm bg-white p-2 rounded">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}

          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Check-in Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id} className="border-t">
                    <td className="px-4 py-2 text-sm">{guest.name}</td>
                    <td className="px-4 py-2 text-sm">{guest.email}</td>
                    <td className="px-4 py-2 text-sm">{guest.checkInTime}</td>
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
