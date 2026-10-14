'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when scrolled down 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position on mount
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 99998,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transform: isVisible
          ? isHovered
            ? 'translateY(-4px) scale(1.05)'
            : 'translateY(0) scale(1)'
          : 'translateY(16px) scale(0.85)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        fontFamily: 'Poppins, sans-serif',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Scroll to top"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0e1828 0%, #152238 100%)',
          border: isHovered ? '1.5px solid #4285F4' : '1px solid #233754',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isHovered
            ? '0 12px 32px rgba(66, 133, 244, 0.35), 0 0 0 2px rgba(66, 133, 244, 0.25)'
            : '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(66, 133, 244, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'all 0.25s ease',
          outline: 'none',
          padding: 0,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isHovered ? '#4285F4' : '#ffffff'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'stroke 0.2s ease, transform 0.2s ease',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          <path d="M12 19V5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>

      {/* Optional subtle hover pill */}
      {isHovered && (
        <span
          style={{
            background: 'rgba(14, 24, 40, 0.95)',
            border: '1px solid #233754',
            color: '#8ab4f8',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '12px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          Top ↑
        </span>
      )}
    </div>
  );
}
