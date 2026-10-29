'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const QUICK_PROMPTS = [
  '💼 What services do you offer?',
  '💰 What is your pricing model?',
  '⏱️ How long does a project take?',
  '🚀 I want a free engineering consultation',
];

const INITIAL_MESSAGE = {
  role: 'assistant',
  content:
    "Hello! 👋 I'm **MotiveAI**, your engineering consultant from AppMotive Technologies.\n\nWhether you're looking to build a high-performance web app, mobile product, run high-ROI ads, or automate workflows with AI, I'm here to help. What are you looking to build?",
};

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Hide tooltip after 9 seconds if not clicked
    const timer = setTimeout(() => setShowTooltip(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply },
        ]);
        if (data.leadCaptured) {
          setLeadCaptured(true);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              data.reply ||
              "I'm here to assist! Reach our engineering team at info@appmotivetechnologies.com or call/WhatsApp +91 9837033948 / +91 9953286867.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm experiencing a brief network hiccup, but our senior engineers are ready to help! You can reach us directly at info@appmotivetechnologies.com or call/WhatsApp +91 9837033948 / +91 9953286867.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
    setLeadCaptured(false);
  };

  const renderContent = (content) => {
    return content.split('\n').map((line, idx) => {
      // Bold text formatting
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={idx} style={{ display: 'block', minHeight: line ? 'auto' : '8px' }}>
          {parts.map((p, i) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return <strong key={i} style={{ color: '#fff', fontWeight: 600 }}>{p.slice(2, -2)}</strong>;
            }
            return p;
          })}
        </span>
      );
    });
  };

  // Do not show on admin panels (e.g. /admin/blogs, /admin/leads)
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/leads')) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999, fontFamily: 'Poppins, sans-serif' }}>
      {/* Speech Bubble / Notification Tooltip */}
      {showTooltip && !isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: 'absolute',
            bottom: '72px',
            right: '0',
            background: 'linear-gradient(135deg, #0e1828, #152238)',
            border: '1px solid #233754',
            borderRadius: '16px',
            padding: '14px 18px',
            color: '#fff',
            width: '280px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
            cursor: 'pointer',
            fontSize: '0.86rem',
            lineHeight: 1.45,
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1rem' }}>👋</span>
            <strong style={{ color: '#4285F4', fontSize: '0.88rem' }}>MotiveAI Assistant</strong>
          </div>
          <p style={{ margin: 0, color: '#cbd5e1' }}>
            Have a project in mind? Ask me about our custom web apps, pricing, and timelines!
          </p>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Engineering Consultant Chatbot"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4285F4 0%, #1a73e8 100%)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(66, 133, 244, 0.45), 0 0 0 3px rgba(66, 133, 244, 0.15)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            position: 'relative',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {/* Active Pulsing Dot */}
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#34A853',
              border: '2px solid #07101d',
            }}
          />
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            width: 'clamp(320px, 92vw, 400px)',
            height: 'clamp(520px, 80vh, 620px)',
            background: '#07101d',
            border: '1px solid #1f2e45',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(66, 133, 244, 0.2)',
            animation: 'fadeInUp 0.25s ease',
          }}
        >
          {/* Header */}
          <header
            style={{
              background: 'linear-gradient(135deg, #0d1829 0%, #17253d 100%)',
              borderBottom: '1px solid #1e293b',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="/web-logo.webp"
                  alt="AppMotive"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#07101d', padding: '2px', border: '1px solid #233754' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#34A853',
                    border: '1.5px solid #07101d',
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>MotiveAI</span>
                  <span style={{ fontSize: '0.65rem', background: 'rgba(66, 133, 244, 0.2)', color: '#8ab4f8', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                    AI Consultant
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#34A853', fontWeight: 500 }}>
                  ● AppMotive Engineering • Online
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleClear}
                title="Restart Conversation"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8fa0b5',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  padding: '4px',
                }}
              >
                🔄
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8fa0b5',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '2px 6px',
                }}
              >
                ✕
              </button>
            </div>
          </header>

          {/* Lead Notification Banner */}
          {leadCaptured && (
            <div
              style={{
                background: 'rgba(52, 168, 83, 0.15)',
                borderBottom: '1px solid #34a85355',
                padding: '8px 14px',
                fontSize: '0.78rem',
                color: '#34A853',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>✓</span> Contact details recorded! Our team will reach out shortly.
            </div>
          )}

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: '#07101d',
            }}
          >
            {messages.map((msg, i) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '11px 15px',
                      borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: isUser
                        ? 'linear-gradient(135deg, #4285F4, #3367D6)'
                        : '#0e1828',
                      color: isUser ? '#fff' : '#cbd5e1',
                      border: isUser ? 'none' : '1px solid #1f2e45',
                      fontSize: '0.88rem',
                      lineHeight: '1.5',
                      wordBreak: 'break-word',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    {renderContent(msg.content)}
                  </div>
                </div>
              );
            })}

            {/* Typing Loader */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    background: '#0e1828',
                    border: '1px solid #1f2e45',
                    padding: '10px 16px',
                    borderRadius: '16px 16px 16px 4px',
                    color: '#8ab4f8',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '0.75rem' }}>MotiveAI is thinking</span>
                  <span style={{ animation: 'pulse 1s infinite' }}>...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (visible if conversation is short) */}
          {messages.length <= 2 && (
            <div
              style={{
                padding: '0 12px 10px',
                display: 'flex',
                flexWrap: 'nowrap',
                overflowX: 'auto',
                gap: '8px',
                background: '#07101d',
              }}
            >
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  style={{
                    whiteSpace: 'nowrap',
                    background: '#0e1828',
                    border: '1px solid #1f2e45',
                    color: '#8ab4f8',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#4285F4')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1f2e45')}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* WhatsApp Direct Option */}
          <div
            style={{
              padding: '6px 14px',
              background: '#0a1424',
              borderTop: '1px solid #182436',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.74rem',
              color: '#8fa0b5',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            <span>Need human engineer?</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/919837033948?text=Hello%20AppMotive%20Technologies%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (+91 9837033948)"
                style={{
                  color: '#25D366',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <span>💬</span> WhatsApp 1 ↗
              </a>
              <span style={{ color: '#334155' }}>|</span>
              <a
                href="https://wa.me/919953286867?text=Hello%20AppMotive%20Technologies%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (+91 9953286867)"
                style={{
                  color: '#25D366',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <span>💬</span> WhatsApp 2 ↗
              </a>
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              background: '#0e1828',
              borderTop: '1px solid #1f2e45',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about pricing, web apps, AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              style={{
                flex: 1,
                background: '#07101d',
                border: '1px solid #23344d',
                borderRadius: '10px',
                padding: '9px 14px',
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                background: '#4285F4',
                color: '#fff',
                border: 'none',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(66, 133, 244, 0.3)',
              }}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
