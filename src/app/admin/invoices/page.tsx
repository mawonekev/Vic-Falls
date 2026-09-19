'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PartnerInvoice } from '@/lib/types';
import {
  Receipt,
  CheckCircle2,
  ArrowLeft,
  DollarSign,
  Building,
  RefreshCw
} from 'lucide-react';

export default function PartnerInvoicesPage() {
  const [invoices, setInvoices] = useState<PartnerInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/invoices');
      const data = await res.json();
      setInvoices(data.invoices || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleMarkPaid = async (invoiceId: string) => {
    try {
      const res = await fetch('/api/admin/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'MARK_PAID', invoiceId })
      });
      if (res.ok) {
        fetchInvoices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalCommissionsUSD = invoices.reduce((sum, inv) => sum + inv.commissionAmountUSD, 0);

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
              Partner Commission Invoicing Dashboard
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-light-muted)', textTransform: 'uppercase' }}>Total Invoiced Commissions</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
              ${totalCommissionsUSD} USD
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '32px' }}>
        {/* Automated Commission Math Banner */}
        <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '20px 24px', border: '1px solid var(--sand-border)', marginBottom: '28px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '6px' }}>
            Automated Commission Formula Execution:
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.5' }}>
            Per <strong style={{ color: 'var(--text-main)' }}>Rules.md Section 2.4</strong>, partner commission values are never stored as unparsed text. For every Pay-at-Property booking confirmed by staff, the system calculates:
            <br />
            <code>commissionAmountUSD = quotedRateUSD × (commissionValue / 100)</code>
          </p>
        </div>

        {/* Invoices Table */}
        <div className="card-luxury" style={{ padding: '24px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid var(--sand-border)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 14px' }}>Invoice ID</th>
                  <th style={{ padding: '12px 14px' }}>Partner Lodge</th>
                  <th style={{ padding: '12px 14px' }}>Guest & Stay Dates</th>
                  <th style={{ padding: '12px 14px' }}>Gross Booking</th>
                  <th style={{ padding: '12px 14px' }}>Commission Due</th>
                  <th style={{ padding: '12px 14px' }}>Status</th>
                  <th style={{ padding: '12px 14px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No invoices generated yet.
                    </td>
                  </tr>
                ) : (
                  invoices.map(inv => (
                    <tr key={inv.id} style={{ borderBottom: '1px solid var(--sand-border)' }}>
                      <td style={{ padding: '14px', fontFamily: 'monospace', fontWeight: 600 }}>
                        {inv.id}
                      </td>

                      <td style={{ padding: '14px' }}>
                        <div style={{ fontWeight: 600 }}>{inv.partnerName}</div>
                      </td>

                      <td style={{ padding: '14px' }}>
                        <div>{inv.guestName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{inv.stayDates}</div>
                      </td>

                      <td style={{ padding: '14px' }}>
                        ${inv.grossBookingUSD} USD
                      </td>

                      <td style={{ padding: '14px', fontWeight: 700, color: 'var(--emerald)' }}>
                        ${inv.commissionAmountUSD} USD
                      </td>

                      <td style={{ padding: '14px' }}>
                        <span className={`badge ${inv.status === 'PAID' ? 'badge-emerald' : 'badge-gold'}`}>
                          {inv.status}
                        </span>
                      </td>

                      <td style={{ padding: '14px' }}>
                        {inv.status !== 'PAID' && (
                          <button
                            onClick={() => handleMarkPaid(inv.id)}
                            className="btn btn-primary btn-sm"
                            style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
