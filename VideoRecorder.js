// import { Button } from '@mui/material';
// import React, { useState, useRef } from 'react';

// const VideoRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const recordedChunksRef = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       videoRef.current.srcObject = stream;
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = function(event) {
//         recordedChunksRef.current.push(event.data);
//       };

//       mediaRecorderRef.current.onstop = function() {
//         const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'recorded.webm';
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);

//       // Stop recording after one minute
//       setTimeout(() => {
//         stopRecording();
//       }, 60000); // 60 seconds
//     } catch (err) {
//       console.error('Error accessing media devices: ', err);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//     }
//   };

//   return (
//     <div style={{padding:'10px',backgroundImage:'url("https://images.unsplash.com/photo-1469949376458-094571676254?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NjV8fHxlbnwwfHx8fHw%3D")',height:'100vh',backgroundSize:'cover'}} >

//       <h3 style={{textAlign:'center'}}>Give Introduction Video for a Minute</h3>
  
      
//       <video ref={videoRef} autoPlay />
//       {!isRecording ? (
//         <button className='bg-primary'style={{color:'white', borderColor:'white',padding:'5px',borderRadius:'5px',textAlign:'center'}} onClick={startRecording}>Start Recording</button>
//       ) : (
//         <button className='bg-primary'style={{color:'white', borderColor:'white',padding:'5px',borderRadius:'5px'}} onClick={stopRecording}>Stop Recording</button>
//       )}
//     </div>
//   );
// };

// export default VideoRecorder;
import { Button } from '@mui/material';
import React, { useState, useRef } from 'react';

const VideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = function(event) {
        recordedChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async function() {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        
        // Send recorded video to backend API
        const formData = new FormData();
        formData.append('video', blob, 'recorded.webm');

        try {
          const response = await fetch('YOUR_BACKEND_API_URL', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload video');
          }

          // Do something with the response if needed
          console.log('Video uploaded successfully');
        } catch (error) {
          console.error('Error uploading video: ', error);
        }

        recordedChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Stop recording after one minute
      setTimeout(() => {
        stopRecording();
      }, 60000); // 60 seconds
    } catch (err) {
      console.error('Error accessing media devices: ', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div style={{ padding: '10px', backgroundImage: 'url("https://images.unsplash.com/photo-1469949376458-094571676254?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NjV8fHxlbnwwfHx8fHw%3D")', height: '100vh', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', color: 'Black'}}>Video Profile</h3>
      <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '500px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px' }} />
      {!isRecording ? (
        <Button variant="contained" color="primary" onClick={startRecording} style={{ color: 'white' }}>Start Recording</Button>
      ) : (
        <Button variant="contained" color="primary" onClick={stopRecording} style={{ color: 'white' }}>Stop Recording</Button>
      )}
    </div>
  );
};

export default VideoRecorder;

