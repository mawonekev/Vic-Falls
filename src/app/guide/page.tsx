'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  FileText,
  MapPin,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';

export default function BorderAndVisaGuidePage() {
  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(rgba(14, 18, 24, 0.75), rgba(14, 18, 24, 0.9)), url("/images/destinations/victoria-falls-cataract.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        padding: '70px 0 50px'
      }}>
        <div className="container">
          <div style={{ maxWidth: '820px' }}>
            <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
              International Traveler Reference
            </div>
            <h1 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '14px' }}>
              Visa, Border & Logistics Guide
            </h1>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Everything you need to navigate border posts between Zimbabwe, Zambia, and Botswana without anxiety. Clear advice on the KAZA Univisa, national park fees, and seasonal water levels.
            </p>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          {/* 1. KAZA Univisa */}
          <div className="card-luxury" style={{ padding: '36px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={22} color="var(--gold-primary)" />
              </div>
              <h2 className="heading-title" style={{ fontSize: '1.5rem' }}>
                1. The KAZA Univisa ($50 USD)
              </h2>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
              The <strong>KAZA Univisa</strong> is the ultimate travel permit for tourists exploring the Golden Triangle. It allows unlimited cross-border travel between <strong>Zimbabwe</strong> and <strong>Zambia</strong> for up to 30 days, and includes day trips across the border into <strong>Botswana</strong> through Kazungula.
            </p>

            <div style={{ background: 'var(--sand-bg)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--sand-border)', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>Key Univisa Conditions:</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Cost:</strong> Exactly $50 USD (payable by Visa/Mastercard or crisp post-2013 USD cash).</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Available Ports of Entry:</strong> Victoria Falls Airport (VFA), Harare Airport (HRE), Victoria Falls Border Post, Harry Mwaanga Nkumbula Airport Livingstone (LVI), and Victoria Falls Bridge (Zambian side).</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Eligible Nationalities:</strong> Citizens of USA, UK, Canada, EU Schengen countries, Australia, New Zealand, Japan, and over 40 other nations.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Victoria Falls Bridge Border Logistics */}
          <div className="card-luxury" style={{ padding: '36px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={22} color="var(--gold-primary)" />
              </div>
              <h2 className="heading-title" style={{ fontSize: '1.5rem' }}>
                2. Crossing the Victoria Falls Bridge
              </h2>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
              The historic 1905 bridge spans the Batoka Gorge, physically joining Zimbabwe and Zambia.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div style={{ border: '1px solid var(--sand-border)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '8px', color: 'var(--gold-hover)' }}>
                  For Bridge Activities (Bungee / Slide):
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  You do <strong>not</strong> need a visa to jump off the bridge! Simply present your passport at the immigration desk and request a free "Bridge Pass".
                </p>
              </div>

              <div style={{ border: '1px solid var(--sand-border)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '8px', color: 'var(--emerald)' }}>
                  For Excursions (Devil's Pool / Island):
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Our transfer operators will pick you up in town, facilitate border manifest clearance, and transfer you directly to the Livingstone Island launch jetty.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Chobe Day Trip (Botswana) Crossing */}
          <div className="card-luxury" style={{ padding: '36px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={22} color="var(--gold-primary)" />
              </div>
              <h2 className="heading-title" style={{ fontSize: '1.5rem' }}>
                3. Chobe Safari Day Trips (Kazungula Border)
              </h2>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
              Kasane and Chobe National Park sit just 70 km west of Victoria Falls. The state-of-the-art <strong>Kazungula Bridge</strong> links Zimbabwe/Zambia directly to Botswana across the Zambezi.
            </p>

            <div style={{ background: '#faf9f6', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-border)', fontSize: '0.9rem' }}>
              <strong>Important Day Trip Checklist:</strong>
              <ul style={{ marginTop: '8px', paddingLeft: '20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Your passport must have at least 6 months remaining validity.</li>
                <li>Botswana does not charge visa fees for most Western nationalities (USA, UK, EU, AU, CA).</li>
                <li>KAZA Univisa allows you to exit Zimbabwe/Zambia into Botswana and re-enter on the same day with no additional visa fee.</li>
              </ul>
            </div>
          </div>

          {/* 4. Seasonal Water Levels (Devil's Pool Timings) */}
          <div className="card-luxury" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={22} color="var(--gold-primary)" />
              </div>
              <h2 className="heading-title" style={{ fontSize: '1.5rem' }}>
                4. Seasonal Water Levels & Best Time to Visit
              </h2>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
              The flow of the Zambezi River varies dramatically throughout the year:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'var(--sand-bg)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                  High Water (February – May)
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Peak flood season. The spray column rises 400m into the sky. Incredible from the air (Flight of Angels); the rainforest trail will drench you in seconds. Devil's Pool is CLOSED due to raging currents.
                </p>
              </div>

              <div style={{ background: 'var(--sand-bg)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--gold-hover)', marginBottom: '6px' }}>
                  Low Water & Devil's Pool (August – January)
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  The rock face of the Falls is exposed with crystal-clear aerial visibility. White water rafting is world-class. <strong>Devil's Pool on Livingstone Island is OPEN</strong> during these months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
