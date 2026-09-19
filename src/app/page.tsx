'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  Hotel
} from 'lucide-react';
import { INITIAL_ACTIVITIES } from '@/lib/seed-data';

export default function HomePage() {
  const [selectedDest, setSelectedDest] = useState<'ALL' | 'VICTORIA_FALLS' | 'LIVINGSTONE' | 'CHOBE'>('ALL');

  const filteredActivities = selectedDest === 'ALL'
    ? INITIAL_ACTIVITIES
    : INITIAL_ACTIVITIES.filter(a => a.destination === selectedDest);

  return (
    <div>
      {/* Editorial Luxury Hero Stage */}
      <section style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(14, 18, 24, 0.4) 0%, rgba(14, 18, 24, 0.85) 100%), url("/images/destinations/victoria-falls-panoramic.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        padding: '100px 0 80px'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '24px' }}>
              <Sparkles size={16} color="var(--gold-primary)" />
              <span style={{ fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>
                The Golden Triangle of Southern Africa
              </span>
            </div>

            <h1 className="heading-display" style={{ marginBottom: '24px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Witness the Smoke that Thunders From Sky, River & Wild.
            </h1>

            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.28rem)', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', marginBottom: '40px', fontWeight: 300, maxWidth: '700px' }}>
              Specialized regional travel coordinator for Victoria Falls, Livingstone, and Chobe. Instant helicopter bookings, river expeditions, and partner lodges with zero hidden fees.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Link href="/activities/helicopter-flight-of-angels" className="btn btn-primary btn-lg">
                Book Flight of Angels ($150)
                <ArrowRight size={18} />
              </Link>
              <Link href="/hotels" className="btn btn-obsidian btn-lg" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Hotel size={18} color="var(--gold-primary)" />
                Explore Lodges & Hotel Map
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Trust Metrics Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(18, 22, 29, 0.85)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 0'
        }}>
          <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--gold-primary)" />
              <span><strong>Bubble-Window Guaranteed</strong> on All Scenic Flights</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="var(--emerald)" />
              <span><strong>Transparent Park Fees</strong> — No Arrival Surprise Charges</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="var(--gold-primary)" />
              <span><strong>24-Hour SLA Confirmation</strong> on Accommodation Requests</span>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Selector & Featured Activities */}
      <section style={{ padding: '80px 0', background: 'var(--sand-bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', gap: '24px' }}>
            <div>
              <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
                Handpicked Bucket-List Tours
              </div>
              <h2 className="heading-title">Iconic Experiences of the Golden Triangle</h2>
            </div>

            {/* Destination filter buttons */}
            <div style={{ display: 'flex', gap: '8px', background: '#ffffff', padding: '6px', borderRadius: 'var(--radius-full)', border: '1px solid var(--sand-border)' }}>
              {[
                { id: 'ALL', label: 'All Regions' },
                { id: 'VICTORIA_FALLS', label: 'Victoria Falls (ZW)' },
                { id: 'LIVINGSTONE', label: 'Livingstone (ZM)' },
                { id: 'CHOBE', label: 'Chobe (BW)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDest(tab.id as any)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: selectedDest === tab.id ? 'var(--obsidian)' : 'transparent',
                    color: selectedDest === tab.id ? 'var(--gold-primary)' : 'var(--text-muted)'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px'
          }}>
            {filteredActivities.map(activity => (
              <div key={activity.id} className="card-luxury" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden' }}>
                  <img
                    src={activity.photos[0]}
                    alt={activity.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span className="badge badge-obsidian">
                      {activity.durationLabel}
                    </span>
                    {activity.destination === 'VICTORIA_FALLS' && (
                      <span className="badge badge-gold">Zimbabwe</span>
                    )}
                    {activity.destination === 'LIVINGSTONE' && (
                      <span className="badge badge-gold">Zambia</span>
                    )}
                    {activity.destination === 'CHOBE' && (
                      <span className="badge badge-gold">Botswana</span>
                    )}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                    padding: '24px 16px 12px',
                    color: '#fff',
                    fontSize: '0.8rem',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>Pickup: {activity.pickupIncluded ? 'Included' : 'Not included'}</span>
                    <span>Rating: ★ {activity.rating} ({activity.reviewCount})</span>
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px', minHeight: '56px' }}>
                    {activity.name}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.55', marginBottom: '20px', flex: 1 }}>
                    {activity.shortDescription}
                  </p>

                  <div style={{
                    borderTop: '1px solid var(--sand-border)',
                    paddingTop: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        From (per person)
                      </div>
                      <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        ${activity.grossPriceUSD}
                        <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)' }}> USD</span>
                      </div>
                      {activity.parkFeeUSD > 0 && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', fontWeight: 600 }}>
                          + ${activity.parkFeeUSD} Nat. Park fee itemized
                        </div>
                      )}
                    </div>

                    <Link href={`/activities/${activity.slug}`} className="btn btn-primary btn-sm">
                      View Experience
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Partner Lodge Spotlight: Shearwater Explorers Village */}
      <section style={{ padding: '80px 0', background: '#ffffff', borderTop: '1px solid var(--sand-border)', borderBottom: '1px solid var(--sand-border)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                height: '420px'
              }}>
                <img
                  src="/images/explorers-village/deluxe-room.jpg"
                  alt="Shearwater Explorers Village Deluxe Room"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '180px',
                height: '140px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '4px solid #ffffff',
                display: 'none'
              }}>
                <img
                  src="/images/explorers-village/village-grounds.jpg"
                  alt="Village Grounds"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div>
              <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
                Direct Partner Property
              </div>
              <h2 className="heading-title" style={{ marginBottom: '18px' }}>
                Shearwater Explorers Village
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.65', marginBottom: '24px' }}>
                Nestled within walking distance of Victoria Falls and town centre, Explorers Village offers a relaxed safari atmosphere with sparkling swimming pools, lush gardens, and options ranging from deluxe air-conditioned chalets to safari chalets and camping.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="var(--gold-primary)" />
                  <span>200m Walk to Town Center</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="var(--gold-primary)" />
                  <span>Two Sparkling Pools</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="var(--gold-primary)" />
                  <span>Guaranteed Quoted Rates</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="var(--gold-primary)" />
                  <span>24h Availability SLA</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <Link href="/hotels" className="btn btn-primary">
                  Request to Book from $110/night
                  <ArrowRight size={18} />
                </Link>
                <Link href="/hotels" className="btn btn-outline">
                  View On Hotel Map
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Golden Triangle Cross-Border Value Proposition */}
      <section style={{ padding: '80px 0', background: 'var(--sand-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
            <div className="badge badge-obsidian" style={{ marginBottom: '14px' }}>
              Cross-Border Seamless Travel
            </div>
            <h2 className="heading-title" style={{ marginBottom: '16px' }}>
              One Seamless Trip Across Three Legendary Countries
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.6' }}>
              Why restrict your African journey to a single border? We coordinate the entire Golden Triangle so you can experience everything with zero logistics headache.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {/* Zimbabwe */}
            <div className="card-luxury" style={{ padding: '32px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Compass size={24} color="var(--gold-primary)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '12px' }}>
                Victoria Falls (Zimbabwe)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Hosts 75% of the waterfall’s viewing points and the greatest perennial water flow. The flight hub for scenic helicopter journeys and Batoka white water rafting.
              </p>
              <Link href="/activities?destination=VICTORIA_FALLS" style={{ color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Explore Zimbabwe Tours <ChevronRight size={14} />
              </Link>
            </div>

            {/* Zambia */}
            <div className="card-luxury" style={{ padding: '32px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MapPin size={24} color="var(--gold-primary)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '12px' }}>
                Livingstone (Zambia)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Swim on the precipice at Devil’s Pool on Livingstone Island, discover colonial bridge heritage, and relax in five-star Zambezi riverside luxury lodges.
              </p>
              <Link href="/activities?destination=LIVINGSTONE" style={{ color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Explore Zambia Tours <ChevronRight size={14} />
              </Link>
            </div>

            {/* Botswana */}
            <div className="card-luxury" style={{ padding: '32px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Award size={24} color="var(--gold-primary)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '12px' }}>
                Chobe & Kasane (Botswana)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Just 70 km away via the Kazungula Bridge. Home to over 120,000 African elephants. Witness wildlife directly from specialized safari boats on the Chobe River.
              </p>
              <Link href="/activities?destination=CHOBE" style={{ color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Explore Chobe Safaris <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--obsidian), var(--obsidian-surface))',
        color: '#ffffff',
        padding: '70px 0',
        borderTop: '1px solid var(--obsidian-border)'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <h2 className="heading-title" style={{ fontSize: '2.2rem', marginBottom: '16px', color: '#fff' }}>
            Ready to Plan Your Victoria Falls Journey?
          </h2>
          <p style={{ color: 'var(--text-light-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px' }}>
            Instant bookings with guaranteed payment authority, real-time scarce capacity protection, and complete border crossing advice.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/activities" className="btn btn-primary btn-lg">
              Browse All Activities
            </Link>
            <Link href="/guide" className="btn btn-obsidian btn-lg">
              Read Visa & Border Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
