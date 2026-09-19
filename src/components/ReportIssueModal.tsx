'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageUrl?: string;
  pageType?: 'ACTIVITY' | 'HOTEL' | 'GENERAL';
  pageRefId?: string;
}

export function ReportIssueModal({
  isOpen,
  onClose,
  pageUrl = typeof window !== 'undefined' ? window.location.href : '',
  pageType = 'GENERAL',
  pageRefId
}: ReportIssueModalProps) {
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/issue-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageUrl,
          pageType,
          pageRefId,
          description,
          reporterEmail: email
        })
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setDescription('');
    setEmail('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '32px' }}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={22} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={48} color="var(--emerald)" style={{ margin: '0 auto 16px' }} />
            <h3 className="heading-title" style={{ marginBottom: '12px' }}>Report Received</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
              Thank you for helping us maintain flawless information. Our Victoria Falls operations team has been notified.
            </p>
            <button className="btn btn-primary" onClick={handleClose}>Done</button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <AlertCircle size={24} color="var(--gold-primary)" />
              <h3 className="heading-title" style={{ fontSize: '1.4rem' }}>Report an Issue or Correction</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.5' }}>
              Spotted a typo, inaccurate pricing, or broken link? Send direct feedback to our ground operations team.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  What needs fixing? <span style={{ color: 'var(--crimson)' }}>*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the issue, outdated detail, or technical error..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--sand-border)',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Your Email (Optional, for follow-up)
                </label>
                <input
                  type="email"
                  placeholder="traveler@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--sand-border)',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn btn-outline" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
