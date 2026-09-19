'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { INITIAL_ACTIVITIES } from '@/lib/seed-data';
import { Clock, MapPin, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

function ActivitiesDirectoryContent() {
  const searchParams = useSearchParams();
  const destQuery = searchParams.get('destination');
  const catQuery = searchParams.get('category');

  const [selectedDest, setSelectedDest] = useState<string>(destQuery || 'ALL');
  const [selectedCat, setSelectedCat] = useState<string>(catQuery || 'ALL');

  useEffect(() => {
    if (destQuery) setSelectedDest(destQuery);
    if (catQuery) setSelectedCat(catQuery);
  }, [destQuery, catQuery]);

  const filtered = INITIAL_ACTIVITIES.filter(a => {
    const destMatch = selectedDest === 'ALL' || a.destination === selectedDest;
    const catMatch = selectedCat === 'ALL' || a.category === selectedCat;
    return destMatch && catMatch;
  });

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(rgba(14, 18, 24, 0.75), rgba(14, 18, 24, 0.9)), url("/images/helicopter/hero-angels.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        padding: '70px 0 60px'
      }}>
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
              Golden Triangle Catalog
            </div>
            <h1 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>
              Activities & Excursions
            </h1>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Discover world-famous helicopter scenic flights, extreme white water rafting, luxury Zambezi river cruises, and premier Botswana safaris. Book instantly in USD with zero hidden park fees.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--sand-border)', padding: '20px 0', position: 'sticky', top: '76px', zIndex: 90 }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Destination tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'All Destinations' },
              { id: 'VICTORIA_FALLS', label: 'Victoria Falls (ZW)' },
              { id: 'LIVINGSTONE', label: 'Livingstone (ZM)' },
              { id: 'CHOBE', label: 'Chobe Safari (BW)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedDest(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderColor: selectedDest === tab.id ? 'var(--gold-primary)' : 'var(--sand-border)',
                  background: selectedDest === tab.id ? 'var(--obsidian)' : '#ffffff',
                  color: selectedDest === tab.id ? 'var(--gold-primary)' : 'var(--text-main)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              value={selectedCat}
              onChange={e => setSelectedCat(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--sand-border)',
                background: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 500,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Categories</option>
              <option value="AIR">Scenic Aerial Flights</option>
              <option value="WATER">River Excursions & Cruises</option>
              <option value="ADRENALINE">Adrenaline & Thrills</option>
              <option value="SAFARI_WILDLIFE">Wildlife & Game Safaris</option>
            </select>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section style={{ padding: '50px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filtered.length}</strong> available experiences
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {filtered.map(act => (
              <div key={act.id} className="card-luxury" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden' }}>
                  <img
                    src={act.photos[0]}
                    alt={act.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: '6px' }}>
                    <span className="badge badge-obsidian">{act.durationLabel}</span>
                    <span className="badge badge-gold">
                      {act.destination === 'VICTORIA_FALLS' ? 'Victoria Falls' : act.destination === 'LIVINGSTONE' ? 'Livingstone' : 'Chobe'}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--gold-hover)', fontWeight: 600 }}>
                      {act.category.replace('_', ' ')}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      ★ {act.rating} ({act.reviewCount})
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px', minHeight: '56px' }}>
                    {act.name}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
                    {act.shortDescription}
                  </p>

                  <div style={{ borderTop: '1px solid var(--sand-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gross Price</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                        ${act.grossPriceUSD}
                        <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)' }}> USD</span>
                      </div>
                      {act.parkFeeUSD > 0 && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', fontWeight: 600 }}>
                          + ${act.parkFeeUSD} Park Fee
                        </div>
                      )}
                    </div>

                    <Link href={`/activities/${act.slug}`} className="btn btn-primary btn-sm">
                      Book Experience
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ActivitiesDirectoryPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center' }}>Loading activities...</div>}>
      <ActivitiesDirectoryContent />
    </Suspense>
  );
}
