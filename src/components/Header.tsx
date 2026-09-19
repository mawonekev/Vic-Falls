'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, MapPin, ShieldCheck, LifeBuoy, Menu, X, Hotel } from 'lucide-react';
import { ReportIssueModal } from './ReportIssueModal';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);

  return (
    <>
      <header className="header-glass">
        {/* Top utility bar */}
        <div style={{ background: 'rgba(0, 0, 0, 0.35)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '6px 0', fontSize: '0.8rem', color: 'var(--text-light-muted)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={13} color="var(--gold-primary)" />
                Victoria Falls (ZW) • Livingstone (ZM) • Chobe (BW)
              </span>
              <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ShieldCheck size={13} color="var(--emerald)" />
                Instant Confirmation & Rate Protection Guarantee
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontWeight: 600, color: 'var(--gold-primary)' }}>USD ($)</span>
              <button
                onClick={() => setIssueModalOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-light-muted)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <LifeBuoy size={12} />
                Report Issue
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--gold-primary), hsl(38, 80%, 35%))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-gold)'
            }}>
              <Compass size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                VIC FALLS
              </div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 600 }}>
                Livingstone • Chobe
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            <Link href="/activities" style={{ color: 'var(--text-light)', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}>
              Activities & Tours
            </Link>
            <Link href="/hotels" style={{ color: 'var(--text-light)', fontWeight: 500, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Hotel size={16} color="var(--gold-primary)" />
              Hotels & Interactive Map
            </Link>
            <Link href="/guide" style={{ color: 'var(--text-light)', fontWeight: 500, fontSize: '0.95rem' }}>
              Visa & Border Guide
            </Link>
            <Link href="/admin" style={{ color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.9rem', padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid hsla(38, 74%, 50%, 0.4)', background: 'var(--gold-subtle)' }}>
              Operations Portal
            </Link>
          </nav>

          <div style={{ display: 'none', alignItems: 'center', gap: '16px' }} className="desktop-cta">
            <Link href="/activities/helicopter-flight-of-angels" className="btn btn-primary btn-sm">
              Book Helicopter Flight
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'block',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--obsidian)',
            borderTop: '1px solid var(--obsidian-border)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <Link href="/activities" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 500 }}>
              Activities & Tours
            </Link>
            <Link href="/hotels" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 500 }}>
              Hotels & Interactive Map
            </Link>
            <Link href="/guide" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 500 }}>
              Visa & Border Guide
            </Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--gold-primary)', fontSize: '1.05rem', fontWeight: 600 }}>
              Operations Portal
            </Link>
            <Link href="/activities/helicopter-flight-of-angels" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              Book Helicopter Flight
            </Link>
          </div>
        )}
      </header>

      <ReportIssueModal isOpen={issueModalOpen} onClose={() => setIssueModalOpen(false)} />

      <style jsx>{`
        @media (min-width: 900px) {
          :global(.desktop-nav), :global(.desktop-cta) {
            display: flex !important;
          }
          :global(.mobile-toggle) {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
