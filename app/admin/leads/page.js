'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminLeadsPage() {
  const [passcode, setPasscode] = useState('');
  const [token, setToken] = useState('');
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time'); // 'All Time', 'Today', 'Yesterday', 'This Week', 'This Month'
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('appmotive_admin_token');
    if (savedToken) {
      setToken(savedToken);
      fetchLeads(savedToken);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        sessionStorage.setItem('appmotive_admin_token', data.token);
        fetchLeads(data.token);
      } else {
        setAuthError(data.error || 'Invalid Admin Passcode');
      }
    } catch (err) {
      setAuthError('Authentication network error');
    }
  };

  const fetchLeads = async (authToken = token) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
      } else if (data.error === 'Unauthorized') {
        sessionStorage.removeItem('appmotive_admin_token');
        setToken('');
      }
    } catch (err) {
      console.error('Fetch leads error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ leadId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((item) => (item._id === leadId ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Update lead error:', err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('appmotive_admin_token');
    setToken('');
    setPasscode('');
    setLeads([]);
  };

  const exportCSV = () => {
    if (filteredLeads.length === 0) return;
    const headers = ['Date', 'Time', 'Client Name', 'Email', 'Contact Number', 'Service', 'Status', 'Message'];
    const rows = filteredLeads.map((l) => {
      const { dateFormatted, timeStr } = formatLeadDate(l.createdAt);
      return [
        `"${dateFormatted}"`,
        `"${timeStr}"`,
        `"${l.name.replace(/"/g, '""')}"`,
        `"${l.email.replace(/"/g, '""')}"`,
        `"${(l.phone || '').replace(/"/g, '""')}"`,
        `"${(l.service || 'General').replace(/"/g, '""')}"`,
        `"${l.status}"`,
        `"${(l.message || '').replace(/"/g, '""')}"`,
      ];
    });
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AppMotive_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const matchesDateFilter = (createdAt, filter) => {
    if (filter === 'All Time') return true;
    if (!createdAt) return true;
    const leadDate = new Date(createdAt);
    if (isNaN(leadDate.getTime())) return true;
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    if (filter === 'Today') {
      return leadDate >= startOfToday;
    }
    if (filter === 'Yesterday') {
      return leadDate >= startOfYesterday && leadDate < startOfToday;
    }
    if (filter === 'This Week') {
      return leadDate >= startOfWeek;
    }
    if (filter === 'This Month') {
      return leadDate >= startOfMonth;
    }
    return true;
  };

  const filteredLeads = leads.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      (item.phone && item.phone.toLowerCase().includes(search.toLowerCase())) ||
      (item.message && item.message.toLowerCase().includes(search.toLowerCase())) ||
      (item.service && item.service.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesDate = matchesDateFilter(item.createdAt, dateFilter);
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const contactedCount = leads.filter((l) => l.status === 'Contacted').length;
  const closedCount = leads.filter((l) => l.status === 'Closed' || l.status === 'In Progress').length;
  const junkCount = leads.filter((l) => l.status === 'Junk').length;

  if (!token) {
    return (
      <div style={styles.authWrapper}>
        <div style={styles.authCard}>
          <div style={styles.authLogo}>
            <img src="/web-logo.webp" alt="AppMotive" style={{ width: '42px', height: '42px' }} />
            <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff', marginLeft: '12px' }}>
              App<span style={{ color: '#4285F4' }}>Motive</span> Technologies Admin
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginTop: '16px', marginBottom: '8px' }}>
            Leads Management Portal
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#9aa0a6', marginBottom: '24px' }}>
            Enter your admin passcode to access client project inquiries.
          </p>

          <form onSubmit={handleLogin}>
            {authError && <div style={styles.errorAlert}>{authError}</div>}
            <div style={{ marginBottom: '20px' }}>
              <label style={styles.label}>Admin Passcode</label>
              <input
                type="password"
                required
                placeholder="Enter Passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.primaryBtn}>
              Unlock Leads Dashboard ↗
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link href="/" style={{ color: '#4285F4', textDecoration: 'none', fontSize: '0.85rem' }}>
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.dashboardWrapper}>
      <header style={styles.dashboardHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/web-logo.webp" alt="AppMotive" style={{ width: '36px', height: '36px' }} />
          <div>
            <h1 style={{ fontSize: '1.2rem', color: '#fff', margin: 0, fontWeight: 700 }}>
              AppMotive <em>Leads Engine</em>
            </h1>
            <span style={{ fontSize: '0.78rem', color: '#34A853', fontWeight: 600 }}>Connected • Showing All Inquiries</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link
            href="/admin/blogs"
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: '#4285F4',
              color: '#fff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ✍️ Blog Manager (SEO)
          </Link>
          <button onClick={() => fetchLeads()} style={styles.secondaryBtn}>
            🔄 Refresh
          </button>
          <button onClick={exportCSV} style={styles.exportBtn}>
            📥 Export CSV ({filteredLeads.length})
          </button>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Exit Admin
          </button>
        </div>
      </header>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <span style={styles.statTitle}>Total All-Time Leads</span>
          <strong style={{ ...styles.statNum, color: '#fff' }}>{totalLeads}</strong>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statTitle}>New Enquiries</span>
          <strong style={{ ...styles.statNum, color: '#4285F4' }}>{newLeadsCount}</strong>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statTitle}>In Contact</span>
          <strong style={{ ...styles.statNum, color: '#FBBC05' }}>{contactedCount}</strong>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statTitle}>In Progress / Closed</span>
          <strong style={{ ...styles.statNum, color: '#34A853' }}>{closedCount}</strong>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statTitle}>Junk / Spam</span>
          <strong style={{ ...styles.statNum, color: '#EA4335' }}>{junkCount}</strong>
        </div>
      </div>

      <div style={styles.controlsBar}>
        <input
          type="text"
          placeholder="🔍 Search leads by name, email, phone, service, keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Date Filter */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#9aa0a6', fontWeight: 600 }}>📅 Date:</span>
            {['All Time', 'Today', 'Yesterday', 'This Week', 'This Month'].map((df) => (
              <button
                key={df}
                onClick={() => setDateFilter(df)}
                style={{
                  ...styles.filterPill,
                  ...(dateFilter === df ? styles.activeDatePill : {}),
                }}
              >
                {df}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#9aa0a6', fontWeight: 600 }}>🏷️ Status:</span>
            {['All', 'New', 'Contacted', 'In Progress', 'Closed', 'Junk'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  ...styles.filterPill,
                  ...(statusFilter === st ? styles.activePill : {}),
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.tableContainer}>
          {loading ? (
            <div style={styles.emptyState}>Fetching all client inquiries...</div>
          ) : filteredLeads.length === 0 ? (
            <div style={styles.emptyState}>
              No inquiries found for selected filters ({dateFilter}, Status: {statusFilter}).
              <button onClick={() => { setSearch(''); setStatusFilter('All'); setDateFilter('All Time'); }} style={{ display: 'block', margin: '12px auto 0', color: '#4285F4', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date & Time</th>
                  <th style={styles.th}>Client Name</th>
                  <th style={styles.th}>Service / Subject</th>
                  <th style={styles.th}>Email Address</th>
                  <th style={styles.th}>Contact Number</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  const { dateFormatted, timeStr, dayTag } = formatLeadDate(lead.createdAt);
                  return (
                    <tr
                      key={lead._id}
                      style={{
                        ...styles.tr,
                        ...(selectedLead?._id === lead._id ? styles.selectedTr : {}),
                      }}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td style={styles.td}>
                        <div style={{ fontWeight: 600, color: '#e8eaed' }}>{dateFormatted}</div>
                        <div style={{ fontSize: '0.78rem', color: '#9aa0a6', marginTop: '2px' }}>
                          {timeStr} <span style={{ color: dayTag.includes('Today') ? '#34A853' : '#FBBC05', fontWeight: 700 }}>{dayTag}</span>
                        </div>
                      </td>
                      <td style={{ ...styles.td, fontWeight: '600', color: '#fff' }}>{lead.name}</td>
                      <td style={styles.td}>
                        <span style={styles.serviceTag}>
                          {lead.service || 'General Inquiry'}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <a href={`mailto:${lead.email}`} style={{ color: '#4285F4', textDecoration: 'none' }}>
                          {lead.email}
                        </a>
                      </td>
                      <td style={{ ...styles.td, color: '#34A853', fontWeight: '500' }}>
                        <a href={`tel:${lead.phone}`} style={{ color: '#34A853', textDecoration: 'none' }}>
                          📞 {lead.phone || 'N/A'}
                        </a>
                      </td>
                      <td style={styles.td} onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          style={getStatusStyle(lead.status)}
                        >
                          <option value="New">🟢 New</option>
                          <option value="Contacted">🟡 Contacted</option>
                          <option value="In Progress">🔵 In Progress</option>
                          <option value="Closed">⚪ Closed</option>
                          <option value="Junk">🔴 Junk</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {selectedLead && (
          <div style={styles.detailCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#4285F4', fontWeight: 600 }}>INQUIRY DETAILS</span>
              <button onClick={() => setSelectedLead(null)} style={styles.closeBtn}>
                ✕
              </button>
            </div>

            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: '8px', marginBottom: '4px' }}>
              {selectedLead.name}
            </h3>

            <div style={{ marginBottom: '12px' }}>
              <span style={styles.serviceTag}>{selectedLead.service || 'General Inquiry'}</span>
            </div>

            <a
              href={`mailto:${selectedLead.email}`}
              style={{ color: '#4285F4', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}
            >
              ✉ {selectedLead.email}
            </a>

            {selectedLead.phone && (
              <a
                href={`tel:${selectedLead.phone}`}
                style={{ color: '#34A853', fontSize: '0.9rem', display: 'block', marginBottom: '16px', fontWeight: 500 }}
              >
                📞 {selectedLead.phone}
              </a>
            )}

            <div style={{ marginTop: '12px' }}>
              <span style={styles.detailLabel}>Received Timestamp</span>
              <span style={{ fontSize: '0.85rem', color: '#bdc1c6', display: 'block' }}>
                {new Date(selectedLead.createdAt).toLocaleString()}
              </span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <span style={styles.detailLabel}>Project Overview / Message</span>
              <div style={styles.messageBox}>{selectedLead.message || '(No optional message provided)'}</div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={`mailto:${selectedLead.email}?subject=AppMotive%20Project%20Inquiry`}
                style={styles.replyBtn}
              >
                Reply via Email ✉
              </a>
              {selectedLead.phone && (
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...styles.replyBtn, background: '#25D366' }}
                >
                  WhatsApp 💬
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatLeadDate(dateStr) {
  if (!dateStr) return { dateFormatted: 'N/A', timeStr: '', dayTag: '' };
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { dateFormatted: 'N/A', timeStr: '', dayTag: '' };

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  let dayTag = '';
  if (d >= startOfToday) {
    dayTag = '• Today';
  } else if (d >= startOfYesterday && d < startOfToday) {
    dayTag = '• Yesterday';
  }

  const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateFormatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return { dateFormatted, timeStr, dayTag };
}

function getStatusStyle(status) {
  const base = {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.78rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  };
  switch (status) {
    case 'New':
      return { ...base, background: 'rgba(54, 150, 245, 0.2)', color: '#4285F4' };
    case 'Contacted':
      return { ...base, background: 'rgba(251, 188, 5, 0.2)', color: '#FBBC05' };
    case 'In Progress':
      return { ...base, background: 'rgba(52, 168, 83, 0.2)', color: '#34A853' };
    case 'Closed':
      return { ...base, background: 'rgba(154, 160, 166, 0.2)', color: '#9aa0a6' };
    case 'Junk':
      return { ...base, background: 'rgba(234, 67, 53, 0.2)', color: '#EA4335' };
    default:
      return { ...base, background: '#202124', color: '#fff' };
  }
}

const styles = {
  authWrapper: {
    minHeight: '100vh',
    background: '#07101d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  authCard: {
    width: '100%',
    maxWidth: '420px',
    background: '#0e1a2b',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '36px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
  },
  authLogo: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#bdc1c6',
    marginBottom: '6px',
    fontWeight: 500,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: '#162438',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  primaryBtn: {
    width: '100%',
    padding: '12px 20px',
    background: '#4285F4',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  errorAlert: {
    padding: '10px 14px',
    background: 'rgba(234, 67, 53, 0.15)',
    border: '1px solid #EA4335',
    borderRadius: '8px',
    color: '#EA4335',
    fontSize: '0.85rem',
    marginBottom: '16px',
  },
  dashboardWrapper: {
    minHeight: '100vh',
    background: '#07101d',
    color: '#e8eaed',
    padding: '24px 36px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  dashboardHeader: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    marginBottom: '24px',
  },
  secondaryBtn: {
    padding: '8px 16px',
    background: '#162438',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  exportBtn: {
    padding: '8px 16px',
    background: 'rgba(52, 168, 83, 0.2)',
    border: '1px solid #34A853',
    borderRadius: '8px',
    color: '#34A853',
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  logoutBtn: {
    padding: '8px 16px',
    background: 'rgba(234, 67, 53, 0.15)',
    border: '1px solid rgba(234, 67, 53, 0.3)',
    borderRadius: '8px',
    color: '#EA4335',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  statCard: {
    background: '#0e1a2b',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '20px',
  },
  statTitle: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#9aa0a6',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '6px',
  },
  statNum: {
    fontSize: '1.8rem',
    fontWeight: 700,
  },
  controlsBar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    background: '#0e1a2b',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '24px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 16px',
    background: '#162438',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
  },
  filterPill: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '500',
    background: '#162438',
    color: '#9aa0a6',
    border: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
  },
  activePill: {
    background: '#4285F4',
    color: '#fff',
    borderColor: '#4285F4',
    fontWeight: '600',
  },
  activeDatePill: {
    background: '#34A853',
    color: '#fff',
    borderColor: '#34A853',
    fontWeight: '600',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '24px',
    alignItems: 'start',
  },
  tableContainer: {
    background: '#0e1a2b',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  emptyState: {
    padding: '60px',
    textAlign: 'center',
    color: '#9aa0a6',
    fontSize: '0.95rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '14px 18px',
    fontSize: '0.78rem',
    color: '#9aa0a6',
    fontWeight: 600,
    textTransform: 'uppercase',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: '#122035',
  },
  tr: {
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
  selectedTr: {
    background: 'rgba(66, 133, 244, 0.12)',
  },
  td: {
    padding: '14px 18px',
    fontSize: '0.88rem',
  },
  serviceTag: {
    display: 'inline-block',
    padding: '3px 8px',
    borderRadius: '6px',
    background: 'rgba(255, 255, 255, 0.06)',
    color: '#bdc1c6',
    fontSize: '0.78rem',
    fontWeight: 500,
  },
  deleteBtn: {
    padding: '4px 8px',
    background: 'rgba(234, 67, 53, 0.15)',
    border: '1px solid rgba(234, 67, 53, 0.3)',
    borderRadius: '6px',
    color: '#EA4335',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  detailCard: {
    width: '340px',
    background: '#0e1a2b',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '24px',
    position: 'sticky',
    top: '24px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#9aa0a6',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  detailLabel: {
    display: 'block',
    fontSize: '0.75rem',
    color: '#9aa0a6',
    textTransform: 'uppercase',
    marginBottom: '4px',
    fontWeight: 600,
  },
  messageBox: {
    background: '#162438',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '0.85rem',
    color: '#e8eaed',
    whiteSpace: 'pre-wrap',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  replyBtn: {
    flex: 1,
    padding: '10px 14px',
    background: '#4285F4',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.82rem',
    fontWeight: 600,
    textDecoration: 'none',
    textAlign: 'center',
    display: 'inline-block',
  },
};
