<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2575.6">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">import { useState, useRef } from 'react';</p>
<p class="p1">import { Card, CardContent } from '@/components/ui/card';</p>
<p class="p2"><br></p>
<p class="p1">export default function ReorbChat() {</p>
<p class="p1"><span class="Apple-converted-space">  </span>const [messages, setMessages] = useState([]);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const [input, setInput] = useState('');</p>
<p class="p1"><span class="Apple-converted-space">  </span>const [loading, setLoading] = useState(false);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const [showLeft, setShowLeft] = useState(true);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const [showRight, setShowRight] = useState(true);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const leftDragRef = useRef(null);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const rightDragRef = useRef(null);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const handleSend = async () =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!input.trim()) return;</p>
<p class="p1"><span class="Apple-converted-space">    </span>const newMessages = [...messages, { role: 'user', content: input }];</p>
<p class="p1"><span class="Apple-converted-space">    </span>setMessages(newMessages);</p>
<p class="p1"><span class="Apple-converted-space">    </span>setInput('');</p>
<p class="p1"><span class="Apple-converted-space">    </span>setLoading(true);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const response = await fetch('/api/reorb/answer', {</p>
<p class="p1"><span class="Apple-converted-space">      </span>method: 'POST',</p>
<p class="p1"><span class="Apple-converted-space">      </span>headers: { 'Content-Type': 'application/json' },</p>
<p class="p1"><span class="Apple-converted-space">      </span>body: JSON.stringify({ messages: newMessages })</p>
<p class="p1"><span class="Apple-converted-space">    </span>});</p>
<p class="p1"><span class="Apple-converted-space">    </span>const data = await response.json();</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>setMessages([...newMessages, { role: 'assistant', content: data.reply }]);</p>
<p class="p1"><span class="Apple-converted-space">    </span>setLoading(false);</p>
<p class="p1"><span class="Apple-converted-space">  </span>};</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const handleToggle = (side) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (side === 'left') {</p>
<p class="p1"><span class="Apple-converted-space">      </span>setShowLeft((prev) =&gt; !prev);</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if (side === 'right') {</p>
<p class="p1"><span class="Apple-converted-space">      </span>setShowRight((prev) =&gt; !prev);</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>};</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const handleDragStart = (e, side) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>e.preventDefault();</p>
<p class="p1"><span class="Apple-converted-space">    </span>let startX = e.clientX;</p>
<p class="p1"><span class="Apple-converted-space">    </span>const onMouseMove = (moveEvent) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">      </span>const deltaX = moveEvent.clientX - startX;</p>
<p class="p1"><span class="Apple-converted-space">      </span>if (side === 'left') {</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (deltaX &lt; -30) setShowLeft(false);</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (deltaX &gt; 30) setShowLeft(true);</p>
<p class="p1"><span class="Apple-converted-space">      </span>} else if (side === 'right') {</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (deltaX &gt; 30) setShowRight(false);</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (deltaX &lt; -30) setShowRight(true);</p>
<p class="p1"><span class="Apple-converted-space">      </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><span class="Apple-converted-space">    </span>const onMouseUp = () =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">      </span>window.removeEventListener('mousemove', onMouseMove);</p>
<p class="p1"><span class="Apple-converted-space">      </span>window.removeEventListener('mouseup', onMouseUp);</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><span class="Apple-converted-space">    </span>window.addEventListener('mousemove', onMouseMove);</p>
<p class="p1"><span class="Apple-converted-space">    </span>window.addEventListener('mouseup', onMouseUp);</p>
<p class="p1"><span class="Apple-converted-space">  </span>};</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>return (</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;div className="w-[1440px] h-[1024px] mx-auto flex flex-col relative"&gt;</p>
<p class="p1"><span class="Apple-converted-space">      </span>&lt;header className="h-16 px-6 flex items-center justify-between border-b text-lg font-bold z-30 relative"&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;span&gt;Reorb&lt;/span&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;nav className="flex gap-6 text-sm"&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>&lt;a href="#"&gt;構造ログ&lt;/a&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>&lt;a href="#"&gt;チーム&lt;/a&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>&lt;a href="#"&gt;履歴&lt;/a&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>&lt;a href="#"&gt;申請&lt;/a&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>&lt;a href="#"&gt;連携&lt;/a&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/nav&gt;</p>
<p class="p1"><span class="Apple-converted-space">      </span>&lt;/header&gt;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">      </span>&lt;main className="flex flex-1 overflow-visible relative z-10"&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;section className="absolute top-0 bottom-0 left-0 right-0 z-0 bg-white flex items-center justify-center"&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>&lt;span className="text-gray-300 text-xl"&gt;3Dオーブエリア（動的拡縮）&lt;/span&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/section&gt;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;section className={`absolute left-0 top-16 bottom-4 z-30 flex flex-col items-start transition-all duration-300 ${showLeft ? 'w-[440px]' : 'w-[16px]'}`}&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>&lt;div className="absolute top-0 left-0 right-0 bottom-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] rounded-[8px]"&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;div</p>
<p class="p1"><span class="Apple-converted-space">              </span>className="absolute top-0 bottom-0 right-[-4px] w-6 z-40 cursor-ew-resize"</p>
<p class="p1"><span class="Apple-converted-space">              </span>ref={leftDragRef}</p>
<p class="p1"><span class="Apple-converted-space">              </span>onMouseDown={(e) =&gt; handleDragStart(e, 'left')}</p>
<p class="p1"><span class="Apple-converted-space">              </span>onClick={() =&gt; handleToggle('left')}</p>
<p class="p1"><span class="Apple-converted-space">            </span>&gt;</p>
<p class="p1"><span class="Apple-converted-space">              </span>&lt;div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-20 bg-[#00A3FF] rounded-[16px]" /&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>{showLeft &amp;&amp; (</p>
<p class="p1"><span class="Apple-converted-space">              </span>&lt;div className="p-4 h-full flex flex-col justify-end"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;div className="space-y-2"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                  </span>{messages.map((m, i) =&gt; (</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}&gt;</p>
<p class="p1"><span class="Apple-converted-space">                      </span>&lt;span className={`block p-2 rounded whitespace-pre-wrap ${m.role === 'user' ? 'bg-[#D2F0FF]' : 'bg-gray-100'}`}&gt;{m.content}&lt;/span&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">                  </span>))}</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;div className="mt-2"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                  </span>&lt;div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full h-12"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;textarea</p>
<p class="p1"><span class="Apple-converted-space">                      </span>placeholder={`どんなことでも構いません。\n違和感、もやもや、気づいたことをReorbにどうぞ`}</p>
<p class="p1"><span class="Apple-converted-space">                      </span>value={input}</p>
<p class="p1"><span class="Apple-converted-space">                      </span>onChange={e =&gt; setInput(e.target.value)}</p>
<p class="p1"><span class="Apple-converted-space">                      </span>disabled={loading}</p>
<p class="p1"><span class="Apple-converted-space">                      </span>className="text-sm h-full leading-tight whitespace-pre-wrap resize-none w-full bg-transparent focus:outline-none"</p>
<p class="p1"><span class="Apple-converted-space">                    </span>/&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;button onClick={handleSend} disabled={loading} className="ml-2 w-6 h-6" aria-label="送信"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                      </span>&lt;img src="https://img.icons8.com/ios-filled/50/00A3FF/rocket.png" width="24" height="24" alt="" /&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;/button&gt;</p>
<p class="p1"><span class="Apple-converted-space">                  </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">              </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>)}</p>
<p class="p1"><span class="Apple-converted-space">          </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/section&gt;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;section className={`absolute right-0 top-16 bottom-4 z-30 flex flex-col items-end transition-all duration-300 ${showRight ? 'w-[360px]' : 'w-[16px]'}`}&gt;</p>
<p class="p1"><span class="Apple-converted-space">          </span>&lt;div className="absolute top-0 left-0 right-0 bottom-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] rounded-[8px]"&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;div</p>
<p class="p1"><span class="Apple-converted-space">              </span>className="absolute top-0 bottom-0 left-[-4px] w-6 z-40 cursor-ew-resize"</p>
<p class="p1"><span class="Apple-converted-space">              </span>ref={rightDragRef}</p>
<p class="p1"><span class="Apple-converted-space">              </span>onMouseDown={(e) =&gt; handleDragStart(e, 'right')}</p>
<p class="p1"><span class="Apple-converted-space">              </span>onClick={() =&gt; handleToggle('right')}</p>
<p class="p1"><span class="Apple-converted-space">            </span>&gt;</p>
<p class="p1"><span class="Apple-converted-space">              </span>&lt;div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-20 bg-[#00A3FF] rounded-[16px]" /&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>{showRight &amp;&amp; (</p>
<p class="p1"><span class="Apple-converted-space">              </span>&lt;div className="p-4 space-y-2 text-sm overflow-y-auto h-full"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;div className="font-semibold text-base"&gt;関連タスク&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>{[...Array(6)].map((_, i) =&gt; (</p>
<p class="p1"><span class="Apple-converted-space">                  </span>&lt;Card key={i}&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;CardContent className="p-2"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                      </span>&lt;div className="text-xs text-gray-400 mb-1"&gt;UX改善　TO DO　2025/04/22&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">                      </span>&lt;div className="text-sm"&gt;操作導線のレビューを事前に実施&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;/CardContent&gt;</p>
<p class="p1"><span class="Apple-converted-space">                  </span>&lt;/Card&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>))}</p>
<p class="p1"><span class="Apple-converted-space">              </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>)}</p>
<p class="p1"><span class="Apple-converted-space">          </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/section&gt;</p>
<p class="p1"><span class="Apple-converted-space">      </span>&lt;/main&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">  </span>);</p>
<p class="p1">}</p>
</body>
</html>
