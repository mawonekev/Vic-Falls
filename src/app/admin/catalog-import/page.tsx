'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Download,
  Check,
  RefreshCw
} from 'lucide-react';

export default function CatalogImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [diffs, setDiffs] = useState<any[]>([]);
  const [commitSuccess, setCommitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setDiffs([]);
      setCommitSuccess(false);
      setErrorMessage(null);
    }
  };

  const handleParseAndPreview = async () => {
    if (!file) return;
    setParsing(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('commit', 'false');

      const res = await fetch('/api/admin/catalog-import', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to parse Excel file');
      } else {
        setDiffs(data.diffs || []);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error processing workbook');
    } finally {
      setParsing(false);
    }
  };

  const handleCommit = async () => {
    if (!file) return;
    setParsing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('commit', 'true');

      const res = await fetch('/api/admin/catalog-import', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCommitSuccess(true);
      } else {
        setErrorMessage(data.error || 'Failed to commit updates');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Commit failed');
    } finally {
      setParsing(false);
    }
  };

  // Generate and download a sample two-tab starter Excel sheet
  const handleDownloadTemplate = () => {
    const activitiesData = [
      {
        slug: 'helicopter-flight-of-angels',
        name: 'Flight of Angels — 12-13 Min Helicopter Scenic Flight',
        destination: 'VICTORIA_FALLS',
        category: 'AIR',
        grossPriceUSD: 150,
        nettPriceUSD: 120,
        parkFeeUSD: 15,
        durationMinutes: 13
      },
      {
        slug: 'zambezi-spectacular-25min-helicopter',
        name: 'Zambezi Spectacular — 25 Min Extended Helicopter Flight',
        destination: 'VICTORIA_FALLS',
        category: 'AIR',
        grossPriceUSD: 285,
        nettPriceUSD: 230,
        parkFeeUSD: 15,
        durationMinutes: 25
      },
      {
        slug: 'batoka-gorge-white-water-rafting',
        name: 'Batoka Gorge White Water Rafting — Full Day Adrenaline',
        destination: 'VICTORIA_FALLS',
        category: 'WATER',
        grossPriceUSD: 130,
        nettPriceUSD: 100,
        parkFeeUSD: 10,
        durationMinutes: 420
      }
    ];

    const addOnsData = [
      {
        activitySlug: 'helicopter-flight-of-angels',
        name: 'VIP Co-Pilot Front Seat Upgrade',
        description: 'Sit in the front co-pilot seat alongside the captain.',
        grossPriceUSD: 35,
        nettPriceUSD: 25,
        capacityLimit: 1 // Cap of 1
      },
      {
        activitySlug: 'helicopter-flight-of-angels',
        name: 'HD 4K Souvenir Cockpit & Tail Video (USB Drive)',
        description: 'External camera digital recording of your flight.',
        grossPriceUSD: 40,
        nettPriceUSD: 20,
        capacityLimit: null // Unlimited
      },
      {
        activitySlug: 'zambezi-spectacular-25min-helicopter',
        name: 'VIP Co-Pilot Front Seat Upgrade',
        description: 'Unmatched 180-degree view beside the captain.',
        grossPriceUSD: 45,
        nettPriceUSD: 30,
        capacityLimit: 1
      }
    ];

    const wb = XLSX.utils.book_new();
    const wsActivities = XLSX.utils.json_to_sheet(activitiesData);
    const wsAddOns = XLSX.utils.json_to_sheet(addOnsData);

    XLSX.utils.book_append_sheet(wb, wsActivities, 'Activities');
    XLSX.utils.book_append_sheet(wb, wsAddOns, 'AddOns');

    XLSX.writeFile(wb, 'Victoria_Falls_Catalog_Template.xlsx');
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
              Excel Catalog Importer & Diff Auditor
            </h1>
          </div>

          <button onClick={handleDownloadTemplate} className="btn btn-obsidian btn-sm" style={{ background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Download size={14} /> Download Starter .xlsx Template
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '32px' }}>
        {/* Instructions */}
        <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '20px 24px', border: '1px solid var(--sand-border)', marginBottom: '28px' }}>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '6px' }}>
            Two-Tab Excel Structure Protocol:
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
            The uploaded workbook must contain two structured worksheets: <strong>Activities</strong> (defining slugs, names, gross/nett pricing, park fees) and <strong>AddOns</strong> (linking to activities via <code>activitySlug</code> with optional <code>capacityLimit</code>). Uploading generates a side-by-side diff preview for your sign-off before committing to PostgreSQL.
          </p>
        </div>

        {errorMessage && (
          <div style={{ background: 'var(--crimson-bg)', color: 'var(--crimson)', padding: '14px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', border: '1px solid var(--crimson)' }}>
            ⚠ {errorMessage}
          </div>
        )}

        {commitSuccess && (
          <div style={{ background: 'var(--emerald-bg)', color: 'var(--emerald)', padding: '14px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', border: '1px solid var(--emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={20} />
            <span><strong>Catalog Updated!</strong> All approved changes have been successfully committed to the database.</span>
          </div>
        )}

        {/* Upload Stage */}
        <div className="card-luxury" style={{ padding: '32px', textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            border: '2px dashed var(--sand-border)',
            borderRadius: 'var(--radius-md)',
            padding: '36px 20px',
            background: '#faf9f6'
          }}>
            <FileSpreadsheet size={48} color="var(--gold-primary)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
              Select Excel Catalog File (.xlsx)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
              Drag and drop your spreadsheet here or click to browse
            </p>

            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="excel-file-input"
            />
            <label htmlFor="excel-file-input" className="btn btn-obsidian btn-sm" style={{ cursor: 'pointer' }}>
              <UploadCloud size={16} /> Choose File
            </label>

            {file && (
              <div style={{ marginTop: '16px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Selected: {file.name} ({Math.round(file.size / 1024)} KB)
              </div>
            )}
          </div>

          {file && (
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={handleParseAndPreview}
                className="btn btn-primary"
                disabled={parsing}
              >
                {parsing ? 'Parsing Workbook...' : 'Preview Side-by-Side Diffs'}
              </button>
            </div>
          )}
        </div>

        {/* Diffs Preview Table */}
        {diffs.length > 0 && (
          <div className="card-luxury" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 className="heading-title" style={{ fontSize: '1.3rem' }}>
                  Catalog Differences ({diffs.length} items parsed)
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Review price updates and new products below before admin sign-off.
                </p>
              </div>

              <button
                onClick={handleCommit}
                disabled={parsing || commitSuccess}
                className="btn btn-primary"
                style={{ minWidth: '180px' }}
              >
                {parsing ? 'Committing...' : commitSuccess ? 'Committed ✓' : 'Sign-Off & Commit to Live'}
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '2px solid var(--sand-border)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px' }}>Status</th>
                    <th style={{ padding: '12px 14px' }}>Activity Name / Slug</th>
                    <th style={{ padding: '12px 14px' }}>Current Gross</th>
                    <th style={{ padding: '12px 14px' }}>New Gross</th>
                    <th style={{ padding: '12px 14px' }}>New Nett</th>
                    <th style={{ padding: '12px 14px' }}>Park Fee</th>
                    <th style={{ padding: '12px 14px' }}>Add-Ons Linked</th>
                  </tr>
                </thead>
                <tbody>
                  {diffs.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--sand-border)', background: item.status === 'MODIFIED' ? 'var(--amber-sla-bg)' : item.status === 'NEW' ? 'var(--emerald-bg)' : '#ffffff' }}>
                      <td style={{ padding: '12px 14px' }}>
                        <span className={`badge ${item.status === 'MODIFIED' ? 'badge-amber' : item.status === 'NEW' ? 'badge-emerald' : 'badge-obsidian'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <strong>{item.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{item.slug}</div>
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>
                        {item.existingPrice !== null ? `$${item.existingPrice}` : '—'}
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: item.status === 'MODIFIED' ? 'var(--gold-hover)' : 'inherit' }}>
                        ${item.newPrice}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        ${item.newNett}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        ${item.newParkFee}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        {item.addOnCount} Add-Ons
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
