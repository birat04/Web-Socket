import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<string>('Disconnected');
  const inputRef = useRef<HTMLInputElement>(null);

  function sendMessage() {
    if (!socket || !inputRef.current) {
      return;
    }
    const message = inputRef.current.value;
    socket.send(message);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    
    ws.onopen = () => {
      setStatus('Connected');
      setSocket(ws);
    };

    ws.onclose = () => {
      setStatus('Disconnected');
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus('Error');
    };

    ws.onmessage = (ev) => {
      alert(ev.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <p>Status: {status}</p>
      <input ref = {inputRef} type='text' placeholder='message...'></input>
      <button onClick={sendMessage} disabled={!socket}>Send</button>
    </div>
  )
}

export default App
