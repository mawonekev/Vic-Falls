'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MappedProperty, Partner } from '@/lib/types';
import { INITIAL_MAPPED_PROPERTIES, INITIAL_PARTNERS } from '@/lib/seed-data';
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  X,
  CreditCard,
  Building,
  ChevronRight,
  Send,
  MessageSquareQuote
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { normalizeEmail, isValidEmail } from '@/lib/email';

// Dynamically import map without SSR to avoid Leaflet window errors
const DynamicHotelMap = dynamic(
  () => import('@/components/HotelMap').then(mod => mod.HotelMap),
  { ssr: false, loading: () => <div style={{ minHeight: '520px', background: '#eaeaea', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Interactive Map...</div> }
);

export default function HotelsMapPage() {
  const [properties, setProperties] = useState<MappedProperty[]>(INITIAL_MAPPED_PROPERTIES);
  const [selectedDest, setSelectedDest] = useState<'ALL' | 'VICTORIA_FALLS' | 'LIVINGSTONE' | 'CHOBE'>('ALL');
  const [selectedProperty, setSelectedProperty] = useState<MappedProperty | null>(INITIAL_MAPPED_PROPERTIES[0]);

  // Request-to-Book Modal
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [activePartner, setActivePartner] = useState<Partner>(INITIAL_PARTNERS[0]);
  const [selectedRoomId, setSelectedRoomId] = useState(INITIAL_PARTNERS[0].roomTypes[0].id);

  // Concierge Modal (for Gray Non-bookable reference pins)
  const [conciergeModalOpen, setConciergeModalOpen] = useState(false);
  const [conciergeProperty, setConciergeProperty] = useState<MappedProperty | null>(null);

  // Form inputs
  const tomorrowStr = new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0];
  const nextWeekStr = new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState(tomorrowStr);
  const [checkOut, setCheckOut] = useState(nextWeekStr);
  const [guests, setGuests] = useState(2);
  const [paymentPath, setPaymentPath] = useState<'PAY_NOW' | 'PAY_AT_PROPERTY'>('PAY_NOW');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [guestPhone, setGuestPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Concierge inquiry state
  const [conciergeEmail, setConciergeEmail] = useState('');
  const [conciergeEmailError, setConciergeEmailError] = useState<string | null>(null);

  // Filter properties
  const filteredProperties = selectedDest === 'ALL'
    ? properties
    : properties.filter(p => p.destination === selectedDest);

  const selectedRoom = activePartner.roomTypes.find(r => r.id === selectedRoomId) || activePartner.roomTypes[0];

  // Calculate nights & price
  const nights = Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)));
  const estimatedTotal = selectedRoom.rateUSD * nights;

  const handleOpenBooking = (property: MappedProperty) => {
    if (property.isBookablePartner && property.partnerId) {
      const partner = INITIAL_PARTNERS.find(p => p.id === property.partnerId) || INITIAL_PARTNERS[0];
      setActivePartner(partner);
      setSelectedRoomId(partner.roomTypes[0].id);
      setRequestSuccess(null);
      setErrorMessage(null);
      setEmailError(null);
      setRequestModalOpen(true);
    } else {
      // Non-bookable reference pin -> open Concierge modal
      setConciergeProperty(property);
      setConciergeEmail('');
      setConciergeEmailError(null);
      setConciergeModalOpen(true);
    }
  };

  const handleGuestEmailBlur = () => {
    if (!guestEmail.trim()) {
      setEmailError(null);
      return;
    }
    const normalized = normalizeEmail(guestEmail);
    setGuestEmail(normalized);
    if (!isValidEmail(normalized)) {
      setEmailError('Please enter a valid email address (e.g. name@example.com)');
    } else {
      setEmailError(null);
    }
  };

  const handleConciergeEmailBlur = () => {
    if (!conciergeEmail.trim()) {
      setConciergeEmailError(null);
      return;
    }
    const normalized = normalizeEmail(conciergeEmail);
    setConciergeEmail(normalized);
    if (!isValidEmail(normalized)) {
      setConciergeEmailError('Please enter a valid email address (e.g. name@example.com)');
    } else {
      setConciergeEmailError(null);
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) {
      setErrorMessage('Please provide your name and email');
      return;
    }

    const cleanedEmail = normalizeEmail(guestEmail);
    setGuestEmail(cleanedEmail);

    if (!isValidEmail(cleanedEmail)) {
      setEmailError('Please enter a valid email address (e.g. name@example.com)');
      setErrorMessage('Please provide a valid email address');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/accommodation-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: activePartner.id,
          roomTypeId: selectedRoomId,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          numGuests: guests,
          paymentPath,
          guestName,
          guestEmail,
          guestPhone
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to submit request');
        setIsSubmitting(false);
        return;
      }

      setRequestSuccess(data.request);
      confetti({ particleCount: 60, spread: 60 });
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(rgba(14, 18, 24, 0.75), rgba(14, 18, 24, 0.9)), url("/images/explorers-village/deluxe-room.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        padding: '70px 0 50px'
      }}>
        <div className="container">
          <div style={{ maxWidth: '820px' }}>
            <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
              Accommodation & Regional Map
            </div>
            <h1 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '14px' }}>
              Golden Triangle Lodges & Hotels
            </h1>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Browse curated lodges across Victoria Falls (Zimbabwe), Livingstone (Zambia), and Kasane (Botswana). Request direct booking for vetted partner lodges with guaranteed rate protection and a strict 24-hour availability confirmation SLA.
            </p>
          </div>
        </div>
      </section>

      {/* Destination Tabs */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid var(--sand-border)', padding: '16px 0', position: 'sticky', top: '76px', zIndex: 90 }}>
        <div className="container" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: 'All Regional Lodges' },
            { id: 'VICTORIA_FALLS', label: 'Victoria Falls (Zimbabwe)' },
            { id: 'LIVINGSTONE', label: 'Livingstone (Zambia)' },
            { id: 'CHOBE', label: 'Chobe / Kasane (Botswana)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedDest(tab.id as any)}
              style={{
                padding: '8px 18px',
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
      </section>

      {/* Main Map & Hotel List Split Layout */}
      <section style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
            alignItems: 'start'
          }}>
            {/* Left Column: Interactive Map */}
            <div style={{ minHeight: '520px' }}>
              <DynamicHotelMap
                properties={filteredProperties}
                selectedProperty={selectedProperty}
                onSelectProperty={prop => setSelectedProperty(prop)}
              />
            </div>

            {/* Right Column: Hotel Listing Feed */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Displaying <strong>{filteredProperties.length}</strong> mapped properties
                </span>
                <span className="badge badge-emerald" style={{ fontSize: '0.78rem' }}>
                  <ShieldCheck size={14} />
                  24h Staff Confirmation SLA
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredProperties.map(prop => {
                  const isSelected = selectedProperty?.id === prop.id;

                  return (
                    <div
                      key={prop.id}
                      onClick={() => setSelectedProperty(prop)}
                      className="card-luxury"
                      style={{
                        padding: '20px',
                        cursor: 'pointer',
                        borderColor: isSelected ? 'var(--gold-primary)' : 'var(--sand-border)',
                        boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap'
                      }}
                    >
                      {/* Photo */}
                      <div style={{
                        width: '140px',
                        height: '110px',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}>
                        <img
                          src={prop.photo || '/images/explorers-village/deluxe-room.jpg'}
                          alt={prop.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)' }}>
                            {prop.name}
                          </h3>
                          {prop.isBookablePartner ? (
                            <span className="badge badge-gold" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>
                              ★ Bookable Partner
                            </span>
                          ) : (
                            <span className="badge badge-obsidian" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>
                              Reference Hotel
                            </span>
                          )}
                        </div>

                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                          <MapPin size={13} color="var(--gold-primary)" />
                          {prop.address}
                        </div>

                        {prop.amenities && (
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                            {prop.amenities.slice(0, 3).map((am, idx) => (
                              <span key={idx} style={{ fontSize: '0.75rem', background: 'var(--sand-bg)', padding: '2px 8px', borderRadius: '4px' }}>
                                {am}
                              </span>
                            ))}
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--sand-border)', paddingTop: '10px' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From</span>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                              ${prop.startingPriceUSD}
                              <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}> / night</span>
                            </div>
                          </div>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleOpenBooking(prop);
                            }}
                            className={`btn btn-sm ${prop.isBookablePartner ? 'btn-primary' : 'btn-outline'}`}
                          >
                            {prop.isBookablePartner ? 'Request to Book' : 'Inquire via Concierge'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation Request-to-Book Modal (Bookable Partner) */}
      {requestModalOpen && (
        <div className="modal-overlay" onClick={() => !isSubmitting && setRequestModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px', padding: '36px' }}>
            <button
              onClick={() => setRequestModalOpen(false)}
              disabled={isSubmitting}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={22} />
            </button>

            {requestSuccess ? (
              <div style={{ textAlign: 'center' }}>
                <CheckCircle2 size={48} color="var(--emerald)" style={{ margin: '0 auto 16px' }} />
                <h3 className="heading-title" style={{ fontSize: '1.6rem', marginBottom: '10px' }}>
                  Request Received!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                  Your reservation request has been received. Our Victoria Falls reservations team will confirm room availability with the lodge within 24 hours.
                </p>

                <div style={{ background: '#faf9f6', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--sand-border)', textAlign: 'left', marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.88rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Lodge:</span>
                      <div style={{ fontWeight: 600 }}>{requestSuccess.partnerName}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Room Type:</span>
                      <div style={{ fontWeight: 600 }}>{requestSuccess.roomType}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Dates:</span>
                      <div style={{ fontWeight: 600 }}>{requestSuccess.checkInDate} to {requestSuccess.checkOutDate}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Quoted Rate:</span>
                      <div style={{ fontWeight: 700, color: 'var(--gold-hover)' }}>${requestSuccess.quotedRateUSD} USD</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Payment Path:</span>
                      <div style={{ fontWeight: 600 }}>
                        {requestSuccess.paymentPath === 'PAY_NOW' ? 'Credit Card Hold (Captured upon confirmation)' : 'Pay at Property'}
                      </div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Confirmation SLA:</span>
                      <div style={{ fontWeight: 600, color: 'var(--emerald)' }}>Within 24 Hours</div>
                    </div>
                  </div>
                </div>

                <button onClick={() => setRequestModalOpen(false)} className="btn btn-primary">
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <Building size={22} color="var(--gold-primary)" />
                  <h3 className="heading-title" style={{ fontSize: '1.45rem' }}>
                    Request to Book — {activePartner.name}
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--emerald)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Clock size={15} />
                  Guaranteed 24-Hour Availability Confirmation SLA
                </div>

                {errorMessage && (
                  <div style={{ background: 'var(--crimson-bg)', color: 'var(--crimson)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.88rem' }}>
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmitRequest} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Room Type Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                      Select Room / Chalet Type:
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {activePartner.roomTypes.map(room => (
                        <div
                          key={room.id}
                          onClick={() => setSelectedRoomId(room.id)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            border: selectedRoomId === room.id ? '2px solid var(--gold-primary)' : '1px solid var(--sand-border)',
                            background: selectedRoomId === room.id ? 'var(--gold-subtle)' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{room.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{room.description.slice(0, 75)}...</div>
                          </div>
                          <div style={{ fontWeight: 700, color: 'var(--gold-hover)', fontSize: '1rem', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                            ${room.rateUSD} / night
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dates & Guests */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Check-In
                      </label>
                      <input
                        type="date"
                        min={tomorrowStr}
                        value={checkIn}
                        onChange={e => setCheckIn(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-border)', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Check-Out
                      </label>
                      <input
                        type="date"
                        min={checkIn}
                        value={checkOut}
                        onChange={e => setCheckOut(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-border)', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={guests}
                        onChange={e => setGuests(parseInt(e.target.value) || 2)}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-border)', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  {/* Payment Path Choice */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                      Payment Preference:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div
                        onClick={() => setPaymentPath('PAY_NOW')}
                        style={{
                          padding: '14px',
                          borderRadius: 'var(--radius-sm)',
                          border: paymentPath === 'PAY_NOW' ? '2px solid var(--gold-primary)' : '1px solid var(--sand-border)',
                          background: paymentPath === 'PAY_NOW' ? 'var(--gold-subtle)' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>Option A: Pay Now</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                          7-day pre-authorization hold on card. Captured only upon room confirmation.
                        </div>
                      </div>

                      <div
                        onClick={() => setPaymentPath('PAY_AT_PROPERTY')}
                        style={{
                          padding: '14px',
                          borderRadius: 'var(--radius-sm)',
                          border: paymentPath === 'PAY_AT_PROPERTY' ? '2px solid var(--gold-primary)' : '1px solid var(--sand-border)',
                          background: paymentPath === 'PAY_AT_PROPERTY' ? 'var(--gold-subtle)' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>Option B: Pay at Lodge</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                          Zero charge now. Pay direct to property front desk upon arrival.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Guest Contact */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Full Name <span style={{ color: 'var(--crimson)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sarah Jenkins"
                        value={guestName}
                        onChange={e => setGuestName(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-border)', fontSize: '0.9rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Email Address <span style={{ color: 'var(--crimson)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder="sarah@example.com"
                        value={guestEmail}
                        onChange={e => {
                          setGuestEmail(e.target.value);
                          if (emailError) setEmailError(null);
                        }}
                        onBlur={handleGuestEmailBlur}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: `1px solid ${emailError ? 'var(--crimson)' : 'var(--sand-border)'}`,
                          fontSize: '0.9rem'
                        }}
                      />
                      {emailError && (
                        <div style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '4px' }}>
                          {emailError}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rate Guarantee Box */}
                  <div style={{ background: '#faf9f6', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Quoted Rate ({nights} night{nights > 1 ? 's' : ''}):
                      </div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gold-hover)' }}>
                        ${estimatedTotal} USD
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', fontWeight: 600, textAlign: 'right' }}>
                      ✓ Rate Locked & Protected
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setRequestModalOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting Request...' : 'Submit Booking Request'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Concierge Inquiry Modal (Reference Gray Pins) */}
      {conciergeModalOpen && conciergeProperty && (
        <div className="modal-overlay" onClick={() => setConciergeModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px', padding: '36px' }}>
            <button
              onClick={() => setConciergeModalOpen(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={22} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <MessageSquareQuote size={24} color="var(--gold-primary)" />
              <h3 className="heading-title" style={{ fontSize: '1.4rem' }}>
                Inquire with Our Concierge
              </h3>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
              <strong>{conciergeProperty.name}</strong> is a reference listing and not directly bookable online. Our Victoria Falls travel concierge can negotiate preferred room rates and package this property with your regional safari.
            </p>

            <div style={{ background: '#faf9f6', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-border)', marginBottom: '20px', fontSize: '0.88rem' }}>
              <div><strong>Address:</strong> {conciergeProperty.address}</div>
              <div style={{ marginTop: '4px' }}><strong>Est. Rate:</strong> From ${conciergeProperty.startingPriceUSD}/night</div>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const cleaned = normalizeEmail(conciergeEmail);
                setConciergeEmail(cleaned);
                if (!isValidEmail(cleaned)) {
                  setConciergeEmailError('Please enter a valid email address (e.g. name@example.com)');
                  return;
                }
                setConciergeModalOpen(false);
                alert('Inquiry sent to our concierge team! We will reply within 24 hours.');
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Your Contact Email <span style={{ color: 'var(--crimson)' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="traveler@example.com"
                  value={conciergeEmail}
                  onChange={e => {
                    setConciergeEmail(e.target.value);
                    if (conciergeEmailError) setConciergeEmailError(null);
                  }}
                  onBlur={handleConciergeEmailBlur}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${conciergeEmailError ? 'var(--crimson)' : 'var(--sand-border)'}`
                  }}
                />
                {conciergeEmailError && (
                  <div style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '4px' }}>
                    {conciergeEmailError}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Special Itinerary Requests / Approximate Dates
                </label>
                <textarea
                  rows={3}
                  placeholder="We are a party of 4 visiting Victoria Falls in November..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-border)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setConciergeModalOpen(false)}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={16} />
                  Send Concierge Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
