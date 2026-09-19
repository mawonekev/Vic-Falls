'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Inbox,
  FileSpreadsheet,
  MapPin,
  Receipt,
  AlertCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Building,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    pendingRequests: 2,
    totalActivities: 7,
    unverifiedPins: 2,
    issuedInvoices: 1,
    openIssues: 0
  });

  useEffect(() => {
    // Fetch stats from APIs
    Promise.all([
      fetch('/api/admin/triage').then(r => r.json()).catch(() => ({ requests: [] })),
      fetch('/api/admin/map-verify').then(r => r.json()).catch(() => ({ properties: [] })),
      fetch('/api/admin/invoices').then(r => r.json()).catch(() => ({ invoices: [] })),
      fetch('/api/issue-reports').then(r => r.json()).catch(() => ({ reports: [] }))
    ]).then(([triageData, mapData, invoiceData, issueData]) => {
      const pending = triageData.requests ? triageData.requests.filter((r: any) => r.status === 'PENDING').length : 0;
      const unverified = mapData.properties ? mapData.properties.filter((p: any) => !p.locationVerifiedByStaff).length : 0;
      const issued = invoiceData.invoices ? invoiceData.invoices.filter((i: any) => i.status === 'ISSUED').length : 0;
      const issues = issueData.reports ? issueData.reports.filter((r: any) => r.status === 'OPEN').length : 0;

      setStats(prev => ({
        ...prev,
        pendingRequests: pending,
        unverifiedPins: unverified,
        issuedInvoices: issued,
        openIssues: issues
      }));
    });
  }, []);

  return (
    <div style={{ background: '#f5f6f8', minHeight: '85vh', paddingBottom: '80px' }}>
      {/* Top Admin Header */}
      <div style={{ background: 'var(--obsidian)', color: '#ffffff', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-gold" style={{ fontSize: '0.75rem', padding: '2px 10px' }}>Staff Back-Office</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-light-muted)' }}>Victoria Falls Hub</span>
            </div>
            <h1 className="heading-title" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
              Operations & Fulfillment Portal
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="/" className="btn btn-obsidian btn-sm" style={{ background: 'rgba(255,255,255,0.1)' }}>
              View Public Website
            </Link>
          </div>
        </div>
      </div>

      {/* Main Admin Content */}
      <div className="container" style={{ marginTop: '36px' }}>
        {/* KPI Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          <div className="card-luxury" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Pending Accommodation Requests
              </span>
              <Clock size={20} color="var(--gold-primary)" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: stats.pendingRequests > 0 ? 'var(--amber-sla)' : 'var(--text-main)' }}>
              {stats.pendingRequests}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Requires availability check within 24h SLA
            </div>
          </div>

          <div className="card-luxury" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Unverified Hotel Pins
              </span>
              <MapPin size={20} color="var(--gold-primary)" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: stats.unverifiedPins > 0 ? 'var(--crimson)' : 'var(--emerald)' }}>
              {stats.unverifiedPins}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Awaiting satellite coordinate verification
            </div>
          </div>

          <div className="card-luxury" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Unpaid Partner Invoices
              </span>
              <Receipt size={20} color="var(--gold-primary)" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {stats.issuedInvoices}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Auto-calculated Pay-at-Property commissions
            </div>
          </div>

          <div className="card-luxury" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Open Traveler Issue Reports
              </span>
              <AlertCircle size={20} color="var(--gold-primary)" />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {stats.openIssues}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Feedback submitted via on-page utility
            </div>
          </div>
        </div>

        {/* Operational Modules Navigation Grid */}
        <h2 className="heading-title" style={{ fontSize: '1.4rem', marginBottom: '20px' }}>
          Operations Command Modules
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* 1. Request Triage Queue */}
          <Link href="/admin/request-queue" className="card-luxury" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Inbox size={24} color="var(--gold-primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Accommodation Triage Queue</h3>
                <span className="badge badge-amber" style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                  Live 24h SLA Countdown
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
              Review room requests with local lodge managers. Capture 7-day pre-authorizations, trigger automated partner commission invoices, or generate 48h expiring payment recovery links.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-hover)', fontWeight: 600, fontSize: '0.9rem' }}>
              Open Triage Queue <ChevronRight size={16} />
            </div>
          </Link>

          {/* 2. Excel Catalog Importer */}
          <Link href="/admin/catalog-import" className="card-luxury" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileSpreadsheet size={24} color="var(--gold-primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Excel Catalog Importer</h3>
                <span className="badge badge-obsidian" style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                  Two-Tab Workbook (Activities & AddOns)
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
              Upload rate sheet workbooks (`.xlsx`), preview side-by-side price diffs, inspect capacity ceilings, and sign-off updates to the live production database.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-hover)', fontWeight: 600, fontSize: '0.9rem' }}>
              Import Spreadsheet <ChevronRight size={16} />
            </div>
          </Link>

          {/* 3. Hotel Coordinate Verifier */}
          <Link href="/admin/map-verify" className="card-luxury" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} color="var(--gold-primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Hotel Coordinate Verifier</h3>
                <span className="badge badge-emerald" style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                  Verification Gate Enforcement
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
              Visually confirm latitude and longitude coordinates for mapped hotels against satellite maps. Enforce staff sign-off before linking any property to a commercial partner.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-hover)', fontWeight: 600, fontSize: '0.9rem' }}>
              Verify Pin Coordinates <ChevronRight size={16} />
            </div>
          </Link>

          {/* 4. Partner Invoicing Dashboard */}
          <Link href="/admin/invoices" className="card-luxury" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Receipt size={24} color="var(--gold-primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Partner Commission Invoices</h3>
                <span className="badge badge-gold" style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                  Auto-Computed Math
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
              Track commissions for Pay-at-Property stays calculated automatically via `quotedRateUSD * (commissionValue / 100)`. Manage billing and payment reconciliation.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-hover)', fontWeight: 600, fontSize: '0.9rem' }}>
              View Invoices <ChevronRight size={16} />
            </div>
          </Link>

          {/* 5. Issue Reports Queue */}
          <Link href="/admin/issues" className="card-luxury" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={24} color="var(--gold-primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Traveler Issue Reports</h3>
                <span className="badge badge-obsidian" style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                  Live Feedback Feed
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
              Review reports flagged by international guests using the on-page utility button across activity and hotel pages to rapidly fix errors.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-hover)', fontWeight: 600, fontSize: '0.9rem' }}>
              View Reports <ChevronRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
