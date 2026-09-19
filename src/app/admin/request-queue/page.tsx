'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AccommodationRequest } from '@/lib/types';
import {
  Inbox,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Building,
  ArrowLeft,
  XCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function AccommodationRequestQueuePage() {
  const [requests, setRequests] = useState<AccommodationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/triage');
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // Auto-refresh countdown every 30 seconds
    const interval = setInterval(fetchRequests, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (action: string, requestId: string, reason?: string) => {
    try {
      const res = await fetch('/api/admin/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, requestId, reason })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionFeedback(data.message);
        fetchRequests();
      } else {
        alert(data.error || 'Action failed');
      }
    } catch (err: any) {
      alert(err.message || 'Action failed');
    }
  };

  // Helper to compute SLA countdown and urgency state
  const getSlaStatus = (createdAtStr: string, slaDeadlineStr: string) => {
    const now = Date.now();
    const created = new Date(createdAtStr).getTime();
    const elapsedHours = (now - created) / (1000 * 60 * 60);
    const deadline = new Date(slaDeadlineStr).getTime();
    const remainingMs = deadline - now;
    const remainingHours = Math.max(0, Math.floor(remainingMs / (1000 * 60 * 60)));
    const remainingMins = Math.max(0, Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60)));

    if (elapsedHours < 12) {
      return {
        level: 'GREEN',
        badgeClass: 'badge-emerald',
        label: `${remainingHours}h ${remainingMins}m remaining (On Track)`,
        pulsing: false
      };
    } else if (elapsedHours < 20) {
      return {
        level: 'AMBER',
        badgeClass: 'badge-amber',
        label: `${remainingHours}h ${remainingMins}m remaining (Approaching SLA)`,
        pulsing: false
      };
    } else {
      return {
        level: 'RED',
        badgeClass: 'badge-crimson',
        label: remainingMs > 0 ? `${remainingHours}h ${remainingMins}m remaining (Urgent)` : 'SLA Breached',
        pulsing: true
      };
    }
  };

  return (
    <div style={{ background: '#f5f6f8', minHeight: '85vh', paddingBottom: '80px' }}>
      {/* Top Bar */}
      <div style={{ background: 'var(--obsidian)', color: '#ffffff', padding: '24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Link href="/admin" style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <ArrowLeft size={14} /> Back to Operations Hub
            </Link>
            <h1 className="heading-title" style={{ fontSize: '1.6rem', color: '#ffffff' }}>
              Accommodation Triage Queue & SLA Monitor
            </h1>
          </div>

          <button onClick={fetchRequests} className="btn btn-obsidian btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} /> Refresh Queue
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '32px' }}>
        {/* SLA Policy Notice */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '18px 24px',
          border: '1px solid var(--sand-border)',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={24} color="var(--gold-primary)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Guaranteed 24-Hour Availability Confirmation SLA</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                All room requests must be verified with lodge reservations within 24 hours. Rate quoted to the traveler is legally locked.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem' }}>
            <span className="badge badge-emerald">Green: &lt;12h</span>
            <span className="badge badge-amber">Amber: 12-20h</span>
            <span className="badge badge-crimson pulse-urgent">Red: &gt;20h Urgent</span>
          </div>
        </div>

        {actionFeedback && (
          <div style={{ background: 'var(--emerald-bg)', border: '1px solid var(--emerald)', color: 'var(--emerald)', padding: '14px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>✓ {actionFeedback}</span>
            <button onClick={() => setActionFeedback(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--emerald)' }}>
              &times;
            </button>
          </div>
        )}

        {/* Requests Table / Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {requests.length === 0 ? (
            <div className="card-luxury" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Inbox size={40} color="var(--gold-primary)" style={{ margin: '0 auto 12px' }} />
              <h3>No accommodation requests in the queue</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '6px' }}>All requests have been processed within SLA.</p>
            </div>
          ) : (
            requests.map(req => {
              const sla = getSlaStatus(req.createdAt, req.slaDeadline);

              return (
                <div key={req.id} className="card-luxury" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--sand-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{req.partnerName}</span>
                        <span className={`badge ${sla.badgeClass} ${sla.pulsing ? 'pulse-urgent' : ''}`}>
                          <Clock size={12} />
                          {sla.label}
                        </span>
                        <span className={`badge ${req.status === 'CONFIRMED' ? 'badge-emerald' : req.status === 'DECLINED' ? 'badge-crimson' : 'badge-gold'}`}>
                          {req.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Request ID: <strong>{req.id}</strong> • Submitted {new Date(req.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Locked Quoted Rate</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold-hover)' }}>
                        ${req.quotedRateUSD} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)' }}>USD</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '0.88rem', marginBottom: '20px' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Room Selected</span>
                      <strong>{req.roomType}</strong> ({req.numGuests} Guests)
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Stay Dates</span>
                      <strong>{req.checkInDate}</strong> to <strong>{req.checkOutDate}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Lead Guest</span>
                      <strong>{req.travellerName}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Payment Path</span>
                      <strong>{req.paymentPath === 'PAY_NOW' ? '💳 Pay Now (Pre-Auth Hold)' : '🏨 Pay at Property'}</strong>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  {req.status === 'PENDING' && (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', borderTop: '1px solid var(--sand-border)', paddingTop: '16px', alignItems: 'center' }}>
                      {req.paymentPath === 'PAY_NOW' ? (
                        <>
                          <button
                            onClick={() => handleAction('CONFIRM_PAY_NOW', req.id)}
                            className="btn btn-primary btn-sm"
                          >
                            Confirm & Capture Payment ($ {req.quotedRateUSD})
                          </button>
                          <button
                            onClick={() => handleAction('SIMULATE_CAPTURE_FAILURE', req.id)}
                            className="btn btn-obsidian btn-sm"
                            title="Tests the 48-hour recovery link and auto-revert fallback"
                          >
                            Simulate Capture Failure (Generates 48h Link)
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleAction('CONFIRM_PAY_AT_PROPERTY', req.id)}
                          className="btn btn-primary btn-sm"
                        >
                          Confirm (Pay at Property & Auto-Invoice)
                        </button>
                      )}

                      <button
                        onClick={() => {
                          const reason = prompt('Enter decline reason (e.g. Lodge fully booked):');
                          if (reason) handleAction('DECLINE', req.id, reason);
                        }}
                        className="btn btn-outline btn-sm"
                        style={{ color: 'var(--crimson)', borderColor: 'var(--crimson)' }}
                      >
                        Decline
                      </button>
                    </div>
                  )}

                  {req.status === 'CONFIRMED' && (
                    <div style={{ borderTop: '1px solid var(--sand-border)', paddingTop: '12px', fontSize: '0.84rem', color: 'var(--emerald)', fontWeight: 600 }}>
                      ✓ Confirmed at {new Date(req.confirmedAt || req.createdAt).toLocaleString()}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
