'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IssueReport } from '@/lib/types';
import {
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  RefreshCw,
  Mail
} from 'lucide-react';

export default function IssueReportsQueuePage() {
  const [reports, setReports] = useState<IssueReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/issue-reports');
      const data = await res.json();
      setReports(data.reports || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div style={{ background: '#f5f6f8', minHeight: '85vh', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ background: 'var(--obsidian)', color: '#ffffff', padding: '24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Link href="/admin" style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <ArrowLeft size={14} /> Back to Operations Hub
            </Link>
            <h1 className="heading-title" style={{ fontSize: '1.6rem', color: '#ffffff' }}>
              Traveler Issue & Error Reports
            </h1>
          </div>

          <button onClick={fetchReports} className="btn btn-obsidian btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} /> Refresh Reports
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '32px' }}>
        <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '20px 24px', border: '1px solid var(--sand-border)', marginBottom: '28px' }}>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>
            On-Page Issue Reporting Utility Protocol:
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.5' }}>
            Every public activity, hotel, and guide page includes a "Report Issue" link in the header and footer. Issues submitted by users appear here immediately for operations triage.
          </p>
        </div>

        <div className="card-luxury" style={{ padding: '24px' }}>
          {reports.length === 0 ? (
            <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={40} color="var(--emerald)" style={{ margin: '0 auto 12px' }} />
              <h3>Zero Open Issues Reported</h3>
              <p style={{ fontSize: '0.88rem', marginTop: '6px' }}>All traveler reported bugs or data discrepancies have been resolved.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reports.map(rep => (
                <div key={rep.id} style={{ padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--sand-border)', background: '#faf9f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={18} color="var(--gold-primary)" />
                      <strong>{rep.pageType} Page Issue</strong>
                      <span className="badge badge-gold" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                        {rep.status}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {new Date(rep.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: '1.5', margin: '8px 0' }}>
                    "{rep.description}"
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', borderTop: '1px solid var(--sand-border)', paddingTop: '10px', marginTop: '10px' }}>
                    <span>Reported Page: <code style={{ color: 'var(--gold-hover)' }}>{rep.pageUrl}</code></span>
                    {rep.reporterEmail && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={13} /> {rep.reporterEmail}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
