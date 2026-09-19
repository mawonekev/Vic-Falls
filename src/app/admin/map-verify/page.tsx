'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MappedProperty, Partner } from '@/lib/types';
import {
  MapPin,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Building,
  RefreshCw
} from 'lucide-react';

export default function MapVerificationPage() {
  const [properties, setProperties] = useState<MappedProperty[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/map-verify');
      const data = await res.json();
      setProperties(data.properties || []);
      setPartners(data.partners || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleVerified = async (propertyId: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/map-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'TOGGLE_VERIFIED',
          propertyId,
          verified: !currentStatus
        })
      });
      if (res.ok) {
        setFeedback(`Property verification status updated.`);
        fetchData();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLinkPartner = async (propertyId: string, partnerId: string) => {
    if (!partnerId) return;
    try {
      const res = await fetch('/api/admin/map-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'LINK_PARTNER',
          propertyId,
          partnerId
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback(data.message);
        fetchData();
      } else {
        alert(data.error || 'Linking failed. Remember location must be verified first!');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

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
              Hotel Pin Coordinate Verifier & Partner Linker
            </h1>
          </div>

          <button onClick={fetchData} className="btn btn-obsidian btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} /> Refresh Pins
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '32px' }}>
        {/* Verification Gate Rule Banner */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '20px 24px',
          border: '1px solid var(--sand-border)',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <ShieldCheck size={28} color="var(--emerald)" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              Location Verification Gate Protocol:
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.5' }}>
              Per <strong style={{ color: 'var(--text-main)' }}>Rules.md Section 2.3</strong>, a hotel map pin <strong>CANNOT</strong> be assigned to a revenue-generating partner or enabled for online booking unless <code>locationVerifiedByStaff == true</code>. Staff must verify GPS latitude & longitude against satellite imagery before linking partners.
            </p>
          </div>
        </div>

        {feedback && (
          <div style={{ background: 'var(--emerald-bg)', color: 'var(--emerald)', padding: '12px 18px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <span>✓ {feedback}</span>
            <button onClick={() => setFeedback(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--emerald)' }}>&times;</button>
          </div>
        )}

        {/* Properties Table */}
        <div className="card-luxury" style={{ padding: '24px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid var(--sand-border)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 14px' }}>Property Name & Destination</th>
                  <th style={{ padding: '12px 14px' }}>Coordinates (Lat, Lng)</th>
                  <th style={{ padding: '12px 14px' }}>Satellite Check</th>
                  <th style={{ padding: '12px 14px' }}>Staff Verified</th>
                  <th style={{ padding: '12px 14px' }}>Partner Link Gate</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(prop => (
                  <tr key={prop.id} style={{ borderBottom: '1px solid var(--sand-border)' }}>
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{prop.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{prop.destination.replace('_', ' ')} • {prop.address}</div>
                    </td>

                    <td style={{ padding: '14px', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                      {prop.latitude.toFixed(4)}, {prop.longitude.toFixed(4)}
                    </td>

                    <td style={{ padding: '14px' }}>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${prop.latitude},${prop.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--gold-hover)', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        Inspect Map <ExternalLink size={12} />
                      </a>
                    </td>

                    <td style={{ padding: '14px' }}>
                      <button
                        onClick={() => handleToggleVerified(prop.id, prop.locationVerifiedByStaff)}
                        className={`btn btn-sm ${prop.locationVerifiedByStaff ? 'btn-primary' : 'btn-outline'}`}
                        style={{ fontSize: '0.78rem', padding: '4px 12px' }}
                      >
                        {prop.locationVerifiedByStaff ? '✓ Verified' : 'Mark Verified'}
                      </button>
                    </td>

                    <td style={{ padding: '14px' }}>
                      {prop.partnerId ? (
                        <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                          Linked to Partner
                        </span>
                      ) : prop.locationVerifiedByStaff ? (
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <select
                            id={`partner-select-${prop.id}`}
                            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--sand-border)', fontSize: '0.82rem' }}
                            defaultValue=""
                          >
                            <option value="" disabled>Choose Partner...</option>
                            {partners.map(p => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => {
                              const sel = document.getElementById(`partner-select-${prop.id}`) as HTMLSelectElement;
                              if (sel && sel.value) handleLinkPartner(prop.id, sel.value);
                            }}
                            className="btn btn-obsidian btn-sm"
                            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                          >
                            Link
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--crimson)', fontStyle: 'italic' }}>
                          Verification Required
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
