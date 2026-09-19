'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, LifeBuoy, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { ReportIssueModal } from './ReportIssueModal';

export function Footer() {
  const [issueModalOpen, setIssueModalOpen] = useState(false);

  return (
    <>
      <footer style={{ background: 'var(--obsidian)', color: 'var(--text-light)', marginTop: 'auto', borderTop: '1px solid var(--obsidian-border)' }}>
        {/* Main Footer Links */}
        <div className="container" style={{ padding: '64px 24px 48px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}>
            {/* Brand column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--gold-primary), hsl(38, 80%, 35%))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Compass size={20} color="#ffffff" />
                </div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>
                  VIC FALLS
                </span>
              </div>
              <p style={{ color: 'var(--text-light-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                The premier Destination Management Platform for the Southern African Golden Triangle: Victoria Falls (Zimbabwe), Livingstone (Zambia), and Chobe (Botswana).
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-light-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={15} color="var(--gold-primary)" />
                  Stand 412, Parkway Drive, Victoria Falls, Zimbabwe
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={15} color="var(--gold-primary)" />
                  +263 13 44471 / +263 77 210 0110
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={15} color="var(--gold-primary)" />
                  reservations@vicfallstourism.com
                </div>
              </div>
            </div>

            {/* Popular Experiences */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '18px', letterSpacing: '0.02em' }}>
                Curated Experiences
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                <li>
                  <Link href="/activities/helicopter-flight-of-angels" style={{ color: 'var(--text-light-muted)', transition: 'color 0.2s' }}>
                    Flight of Angels (12–13 min)
                  </Link>
                </li>
                <li>
                  <Link href="/activities/zambezi-spectacular-25min-helicopter" style={{ color: 'var(--text-light-muted)' }}>
                    Zambezi Spectacular (25 min)
                  </Link>
                </li>
                <li>
                  <Link href="/activities/batoka-gorge-white-water-rafting" style={{ color: 'var(--text-light-muted)' }}>
                    Batoka Gorge White Water Rafting
                  </Link>
                </li>
                <li>
                  <Link href="/activities/victoria-falls-bridge-bungee-jump" style={{ color: 'var(--text-light-muted)' }}>
                    Victoria Falls Bridge 111m Bungee
                  </Link>
                </li>
                <li>
                  <Link href="/activities/riversong-luxury-sunset-cruise" style={{ color: 'var(--text-light-muted)' }}>
                    Riversong Luxury Sunset Cruise
                  </Link>
                </li>
                <li>
                  <Link href="/activities/chobe-national-park-day-trip-safari" style={{ color: 'var(--text-light-muted)' }}>
                    Chobe National Park Day Trip
                  </Link>
                </li>
              </ul>
            </div>

            {/* Accommodation & Regions */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '18px', letterSpacing: '0.02em' }}>
                Accommodation & Map
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                <li>
                  <Link href="/hotels" style={{ color: 'var(--text-light-muted)' }}>
                    Interactive Regional Hotel Map
                  </Link>
                </li>
                <li>
                  <Link href="/hotels?tab=explorers" style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>
                    ★ Shearwater Explorers Village (Book Direct)
                  </Link>
                </li>
                <li>
                  <Link href="/hotels?dest=LIVINGSTONE" style={{ color: 'var(--text-light-muted)' }}>
                    Livingstone Luxury River Lodges
                  </Link>
                </li>
                <li>
                  <Link href="/hotels?dest=CHOBE" style={{ color: 'var(--text-light-muted)' }}>
                    Chobe & Kasane Safari Lodges
                  </Link>
                </li>
                <li>
                  <Link href="/guide" style={{ color: 'var(--text-light-muted)' }}>
                    KAZA Univisa & Border Logistics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Traveler Trust & SLA */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '18px', letterSpacing: '0.02em' }}>
                Traveler Assurance
              </h4>
              <div style={{ background: 'var(--obsidian-surface)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--obsidian-border)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px' }}>
                  <ShieldCheck size={18} />
                  24-Hour SLA Guarantee
                </div>
                <p style={{ color: 'var(--text-light-muted)', fontSize: '0.82rem', lineHeight: '1.5' }}>
                  All lodging requests are verified directly with lodge managers within 24 hours. Your quoted rate is 100% price-protected upon submission.
                </p>
              </div>
              <button
                onClick={() => setIssueModalOpen(true)}
                className="btn btn-obsidian btn-sm"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <LifeBuoy size={14} />
                Report an Issue on this Page
              </button>
            </div>
          </div>

          {/* Bottom copyright */}
          <div style={{
            borderTop: '1px solid var(--obsidian-border)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.82rem',
            color: 'var(--text-light-muted)',
            gap: '12px'
          }}>
            <div>
              © {new Date().getFullYear()} Victoria Falls, Livingstone & Chobe Tourism Platform. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/admin" style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>Staff Admin Portal</Link>
              <span>•</span>
              <Link href="/guide" style={{ color: 'var(--text-light-muted)' }}>Border & Visa Rules</Link>
              <span>•</span>
              <span>USD Currency Standard</span>
            </div>
          </div>
        </div>
      </footer>

      <ReportIssueModal isOpen={issueModalOpen} onClose={() => setIssueModalOpen(false)} />
    </>
  );
}
