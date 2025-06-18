// ReorbChat.jsx
import { useState, useRef } from 'react';

function Card({ children }) {
  return <div className="border rounded p-2 shadow-sm bg-white">{children}</div>;
}

function CardContent({ children, className = '' }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}

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

  const handleToggle = (side) => {
    if (side === 'left') {
      setShowLeft((prev) => !prev);
    } else if (side === 'right') {
      setShowRight((prev) => !prev);
    }
  };

  const handleDragStart = (e, side) => {
    e.preventDefault();
    let startX = e.clientX;
    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      if (side === 'left') {
        if (deltaX < -30) setShowLeft(false);
        if (deltaX > 30) setShowLeft(true);
      } else if (side === 'right') {
        if (deltaX > 30) setShowRight(false);
        if (deltaX < -30) setShowRight(true);
      }
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="w-[1440px] h-[1024px] mx-auto flex flex-col relative">
      {/* ヘッダー */}
      <header className="h-16 px-6 flex items-center justify-between border-b text-lg font-bold z-30 relative">
        <span>Reorb</span>
        <nav className="flex gap-6 text-sm">
          <a href="#">構造ログ</a>
          <a href="#">チーム</a>
          <a href="#">履歴</a>
          <a href="#">申請</a>
          <a href="#">連携</a>
        </nav>
      </header>

      <main className="flex flex-1 overflow-visible relative z-10">
        {/* 3Dオーブエリア背景 */}
        <section className="absolute top-0 bottom-0 left-0 right-0 z-0 bg-white flex items-center justify-center">
          <span className="text-gray-300 text-xl">3Dオーブエリア（動的拡縮）</span>
        </section>

        {/* チャットエリア（観音扉左） */}
        <section className={`absolute left-0 top-16 bottom-4 z-30 flex flex-col items-start transition-all duration-300 ${showLeft ? 'w-[440px]' : 'w-[16px]'}`}>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] rounded-[8px]">
            <div
              className="absolute top-0 bottom-0 right-[-4px] w-6 z-40 cursor-ew-resize"
              ref={leftDragRef}
              onMouseDown={(e) => handleDragStart(e, 'left')}
              onClick={() => handleToggle('left')}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-20 bg-[#00A3FF] rounded-[16px]" />
            </div>
            {showLeft && (
              <div className="p-4 h-full flex flex-col justify-end">
                <div className="space-y-2">
                  {messages.map((m, i) => (
                    <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                      <span className={`block p-2 rounded whitespace-pre-wrap ${m.role === 'user' ? 'bg-[#D2F0FF]' : 'bg-gray-100'}`}>{m.content}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full h-12">
                    <textarea
                      placeholder={`どんなことでも構いません。\n違和感、もやもや、気づいたことをReorbにどうぞ`}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      disabled={loading}
                      className="text-sm h-full leading-tight whitespace-pre-wrap resize-none w-full bg-transparent focus:outline-none"
                    />
                    <button onClick={handleSend} disabled={loading} className="ml-2 w-6 h-6" aria-label="送信">
                      <img src="https://img.icons8.com/ios-filled/50/00A3FF/rocket.png" width="24" height="24" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* タスクエリア（観音扉右） */}
        <section className={`absolute right-0 top-16 bottom-4 z-30 flex flex-col items-end transition-all duration-300 ${showRight ? 'w-[360px]' : 'w-[16px]'}`}>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] rounded-[8px]">
            <div
              className="absolute top-0 bottom-0 left-[-4px] w-6 z-40 cursor-ew-resize"
              ref={rightDragRef}
              onMouseDown={(e) => handleDragStart(e, 'right')}
              onClick={() => handleToggle('right')}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-20 bg-[#00A3FF] rounded-[16px]" />
            </div>
            {showRight && (
              <div className="p-4 space-y-2 text-sm overflow-y-auto h-full">
                <div className="font-semibold text-base">関連タスク</div>
                {[...Array(6)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-2">
                      <div className="text-xs text-gray-400 mb-1">UX改善　TO DO　2025/04/22</div>
                      <div className="text-sm">操作導線のレビューを事前に実施</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
