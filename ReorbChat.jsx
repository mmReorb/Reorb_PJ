// ReorbChat.jsx
import { useState, useRef } from 'react';

export default function ReorbChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);
  const leftDragRef = useRef(null);
  const rightDragRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const response = await fetch('/api/reorb/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });
    const data = await response.json();

    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Reorb Chat</h1>
      <div style={{ marginBottom: '12px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <span style={{ background: m.role === 'user' ? '#D2F0FF' : '#EEE', padding: '6px 10px', borderRadius: '8px', display: 'inline-block', marginBottom: '6px' }}>{m.content}</span>
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="何か話しかけてみてね"
          style={{ width: '100%', height: '60px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', resize: 'none' }}
        />
        <button onClick={handleSend} disabled={loading} style={{ marginTop: '8px', padding: '6px 12px', background: '#00A3FF', color: '#fff', border: 'none', borderRadius: '6px' }}>
          送信
        </button>
      </div>
    </div>
  );
}
