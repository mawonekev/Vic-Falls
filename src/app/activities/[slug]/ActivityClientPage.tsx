'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity, AddOn, ActivityBooking } from '@/lib/types';
import {
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Users,
  Info,
  ChevronDown,
  Calendar,
  Sparkles,
  Plane,
  Camera,
  Download,
  Printer,
  X,
  CreditCard,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { normalizeEmail, isValidEmail } from '@/lib/email';

interface ActivityClientPageProps {
  activity: Activity;
  relatedTiers: Activity[];
}

export function ActivityClientPage({ activity, relatedTiers }: ActivityClientPageProps) {
  const router = useRouter();

  // Gallery state
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Booking Form State
  const tomorrowStr = new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(tomorrowStr);
  const [selectedSlot, setSelectedSlot] = useState(activity.departureTimes[0] || '09:00');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [prePayParkFees, setPrePayParkFees] = useState(true);

  // Checkout modal & voucher state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ActivityBooking | null>(null);

  // Guest details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNationality, setGuestNationality] = useState('United States');

  // FAQ open toggles
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculate pricing
  const basePrice = activity.grossPriceUSD * adults + (activity.grossPriceUSD * 0.5) * children;
  const parkFeeTotal = prePayParkFees ? activity.parkFeeUSD * (adults + children) : 0;
  const addOnsTotal = selectedAddOnIds.reduce((sum, id) => {
    const addOn = activity.addOns.find(a => a.id === id);
    return sum + (addOn ? addOn.grossPriceUSD : 0);
  }, 0);
  const totalUSD = basePrice + parkFeeTotal + addOnsTotal;

  const toggleAddOn = (addOnId: string) => {
    if (selectedAddOnIds.includes(addOnId)) {
      setSelectedAddOnIds(selectedAddOnIds.filter(id => id !== addOnId));
    } else {
      setSelectedAddOnIds([...selectedAddOnIds, addOnId]);
    }
  };

  const handleStartBooking = () => {
    setBookingError(null);
    setEmailError(null);
    setCheckoutModalOpen(true);
  };

  const handleEmailBlur = () => {
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

  const handleCompleteCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) {
      setBookingError('Please enter your full name and email address');
      return;
    }

    const cleanedEmail = normalizeEmail(guestEmail);
    setGuestEmail(cleanedEmail);

    if (!isValidEmail(cleanedEmail)) {
      setEmailError('Please enter a valid email address (e.g. name@example.com)');
      setBookingError('Please provide a valid email address before submitting.');
      return;
    }

    setIsSubmitting(true);
    setBookingError(null);

    try {
      const res = await fetch('/api/bookings/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activitySlug: activity.slug,
          bookingDate: selectedDate,
          timeSlot: selectedSlot,
          numAdults: adults,
          numChildren: children,
          guestEmail,
          guestName,
          guestPhone,
          guestNationality,
          selectedAddOnIds,
          prePayParkFees
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setBookingError(data.error || 'Unable to process checkout. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setConfirmedBooking(data.booking);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setBookingError(err.message || 'Network error during checkout');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Top Breadcrumb & Destination Bar */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid var(--sand-border)', padding: '12px 0', fontSize: '0.85rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
          <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
          <span>/</span>
          <Link href="/activities" style={{ color: 'var(--text-muted)' }}>Activities</Link>
          <span>/</span>
          <span style={{ color: 'var(--gold-hover)', fontWeight: 600 }}>{activity.name}</span>
        </div>
      </div>

      {/* Main Experience Hero Title & Badges */}
      <section style={{ background: 'var(--sand-bg)', padding: '36px 0 24px' }}>
        <div className="container">
          <div style={{ maxWidth: '880px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span className="badge badge-gold">
                {activity.destination.replace('_', ' ')}
              </span>
              <span className="badge badge-obsidian">
                <Clock size={14} />
                {activity.durationLabel}
              </span>
              <span className="badge badge-emerald">
                <ShieldCheck size={14} />
                Instant Confirmation
              </span>
            </div>

            <h1 className="heading-title" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', lineHeight: 1.15, marginBottom: '14px' }}>
              {activity.name}
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.5' }}>
              {activity.shortDescription}
            </p>
          </div>

          {/* Shearwater Option / Tier Switcher */}
          {relatedTiers.length > 1 && (
            <div style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              border: '1px solid var(--sand-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={20} color="var(--gold-primary)" />
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                  Select Flight / Excursion Tier:
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {relatedTiers.map(tier => (
                  <button
                    key={tier.id}
                    onClick={() => router.push(`/activities/${tier.slug}`)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 'var(--radius-full)',
                      border: tier.slug === activity.slug ? '2px solid var(--gold-primary)' : '1px solid var(--sand-border)',
                      background: tier.slug === activity.slug ? 'var(--gold-subtle)' : '#ffffff',
                      color: tier.slug === activity.slug ? 'var(--gold-hover)' : 'var(--text-main)',
                      fontWeight: tier.slug === activity.slug ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{tier.durationLabel}</span>
                    <span>•</span>
                    <span>${tier.grossPriceUSD} USD</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Panoramic Hero Gallery Stage */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {/* Primary Main Image */}
            <div style={{
              position: 'relative',
              height: 'clamp(380px, 55vh, 560px)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)'
            }}>
              <img
                src={activity.photos[activePhotoIdx] || activity.photos[0]}
                alt={activity.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Camera size={14} />
                Photo {activePhotoIdx + 1} of {activity.photos.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${activity.photos.length}, 1fr)`,
              gap: '12px',
              overflowX: 'auto'
            }}>
              {activity.photos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  style={{
                    height: '90px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: activePhotoIdx === idx ? '3px solid var(--gold-primary)' : '2px solid transparent',
                    opacity: activePhotoIdx === idx ? 1 : 0.75,
                    transition: 'all 0.2s'
                  }}
                >
                  <img
                    src={photo}
                    alt={`Thumbnail ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Split-Screen Experience Narrative & Sticky Booking Sidebar */}
      <section style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}>
            {/* Left Content Column */}
            <div style={{ flex: '1 1 60%' }}>
              {/* Quick Specification Pills Bar */}
              <div style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                border: '1px solid var(--sand-border)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Flight Duration
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                    {activity.durationLabel}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Departures
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                    Daily (Hourly)
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Hotel Pickup
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--emerald)' }}>
                    Included Free
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Window Guarantee
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--gold-hover)' }}>
                    100% Every Seat
                  </div>
                </div>
              </div>

              {/* Detailed Experience Overview */}
              <div style={{ marginBottom: '48px' }}>
                <h2 className="heading-title" style={{ fontSize: '1.6rem', marginBottom: '18px' }}>
                  Experience Overview
                </h2>
                <div style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.75', whiteSpace: 'pre-line' }}>
                  {activity.fullDescription}
                </div>
              </div>

              {/* Inclusions & Exclusions (Shearwater Green/Red Breakdown) */}
              <div style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                border: '1px solid var(--sand-border)',
                marginBottom: '48px'
              }}>
                <h3 className="heading-title" style={{ fontSize: '1.4rem', marginBottom: '24px' }}>
                  What's Included & Excluded
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                  {/* Included */}
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--emerald)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={18} />
                      Included in Experience
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {activity.includedItems.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', lineHeight: '1.5' }}>
                          <CheckCircle2 size={16} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excluded */}
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--crimson)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <XCircle size={18} />
                      Not Included
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {activity.excludedItems.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', lineHeight: '1.5' }}>
                          <XCircle size={16} color="var(--crimson)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {activity.parkFeeUSD > 0 && (
                      <div style={{
                        marginTop: '20px',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--sand-bg)',
                        border: '1px solid var(--sand-border)',
                        fontSize: '0.85rem'
                      }}>
                        <strong>Statutory Park Fee Note:</strong> The ${activity.parkFeeUSD} USD government conservation levy can be pre-paid in your checkout total to avoid cash handling at the helipad.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Aircraft & Technical Safety Specifications */}
              {activity.aircraftSpecs && (
                <div style={{
                  background: 'var(--obsidian)',
                  color: 'var(--text-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                  marginBottom: '48px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <Plane size={22} color="var(--gold-primary)" />
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                      Aircraft & Commercial Aviation Safety
                    </h3>
                  </div>

                  <p style={{ color: 'var(--text-light-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    Shearwater operates a dedicated fleet of meticulously maintained turbine helicopters. Every commercial captain holds thousands of flight hours over Victoria Falls.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div style={{ background: 'var(--obsidian-surface)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', textTransform: 'uppercase' }}>Fleet Models</div>
                      <div style={{ fontWeight: 600, fontSize: '0.98rem', marginTop: '4px' }}>{activity.aircraftSpecs.model}</div>
                    </div>
                    <div style={{ background: 'var(--obsidian-surface)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', textTransform: 'uppercase' }}>Seating Capacity</div>
                      <div style={{ fontWeight: 600, fontSize: '0.98rem', marginTop: '4px' }}>{activity.aircraftSpecs.capacity}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {activity.aircraftSpecs.features.map((feat, idx) => (
                      <span key={idx} className="badge badge-obsidian" style={{ color: '#ffffff' }}>
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trip Preparation & FAQ Accordion */}
              <div>
                <h3 className="heading-title" style={{ fontSize: '1.4rem', marginBottom: '20px' }}>
                  Trip Preparation & Frequently Asked Questions
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    {
                      q: 'What should I wear for the helicopter flight?',
                      a: 'We recommend comfortable casual clothing and dark colors to minimize reflection against the bubble glass windows when taking photos. Sunglasses are highly recommended.'
                    },
                    {
                      q: 'Is hotel pickup and drop-off really included?',
                      a: 'Yes! Complimentary return transfers are included from all hotels, safari lodges, and guest houses in Victoria Falls town. Please specify your hotel name during checkout.'
                    },
                    {
                      q: 'Can I choose my departure time slot?',
                      a: 'Yes. Flights operate continuously between 08:00 AM and 04:30 PM. Morning flights (08:00–10:00) offer calm air and brilliant rainbows; afternoon flights (15:00–16:30) provide warm golden lighting over the gorges.'
                    },
                    {
                      q: 'What happens in case of adverse weather?',
                      a: 'Safety is paramount. In the rare event of severe weather or thunderstorm grounding, flights are rescheduled to the next available window, or refunded 100% with no penalty.'
                    }
                  ].map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#ffffff',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--sand-border)',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        style={{
                          width: '100%',
                          padding: '18px 24px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.98rem'
                        }}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          style={{
                            transform: openFaq === idx ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s',
                            color: 'var(--gold-primary)'
                          }}
                        />
                      </button>
                      {openFaq === idx && (
                        <div style={{ padding: '0 24px 20px', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Shearwater-Style Booking Sidebar */}
            <div style={{ flex: '1 1 38%', position: 'sticky', top: '96px' }}>
              <div className="sticky-sidebar">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '18px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Price per adult
                    </span>
                    <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
                      ${activity.grossPriceUSD}
                      <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-muted)' }}> USD</span>
                    </div>
                  </div>
                  <span className="badge badge-gold">
                    Best Rate Guarantee
                  </span>
                </div>

                <div style={{ borderTop: '1px solid var(--sand-border)', paddingTop: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Date Picker */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Select Flight Date
                    </label>
                    <input
                      type="date"
                      min={tomorrowStr}
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--sand-border)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Time Slot Picker */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Select Departure Window
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={e => setSelectedSlot(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--sand-border)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {activity.departureTimes.map(slot => (
                        <option key={slot} value={slot}>
                          {slot} AM/PM Departure
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guests Count */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Adults (12+ yrs)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        value={adults}
                        onChange={e => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--sand-border)',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Children (2-11 yrs)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="6"
                        value={children}
                        onChange={e => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--sand-border)',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* Add-Ons with Live Capacity Limits */}
                  {activity.addOns.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' }}>
                        Optional Flight Add-Ons:
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {activity.addOns.map(addOn => {
                          const isSelected = selectedAddOnIds.includes(addOn.id);
                          const isCapacityCapped = addOn.capacityLimit !== null && addOn.capacityLimit !== undefined;

                          return (
                            <div
                              key={addOn.id}
                              onClick={() => toggleAddOn(addOn.id)}
                              style={{
                                padding: '12px',
                                borderRadius: 'var(--radius-sm)',
                                border: isSelected ? '1.5px solid var(--gold-primary)' : '1px solid var(--sand-border)',
                                background: isSelected ? 'var(--gold-subtle)' : '#ffffff',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '10px'
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}} // Handled by parent div
                                style={{ marginTop: '3px', cursor: 'pointer' }}
                              />
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{addOn.name}</span>
                                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--gold-hover)' }}>
                                    +${addOn.grossPriceUSD}
                                  </span>
                                </div>
                                {addOn.description && (
                                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.4' }}>
                                    {addOn.description}
                                  </p>
                                )}
                                {isCapacityCapped && (
                                  <span className="badge badge-amber" style={{ fontSize: '0.72rem', padding: '2px 8px', marginTop: '4px' }}>
                                    Only {addOn.capacityLimit} Seat Per Flight
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Pre-Pay National Park Fee */}
                  {activity.parkFeeUSD > 0 && (
                    <div style={{
                      background: 'var(--sand-bg)',
                      padding: '14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--sand-border)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}>
                      <input
                        type="checkbox"
                        id="prePayFee"
                        checked={prePayParkFees}
                        onChange={e => setPrePayParkFees(e.target.checked)}
                        style={{ marginTop: '3px', cursor: 'pointer' }}
                      />
                      <label htmlFor="prePayFee" style={{ fontSize: '0.84rem', cursor: 'pointer', lineHeight: '1.4' }}>
                        <strong>Pre-Pay Statutory Park Fee (${activity.parkFeeUSD}/person):</strong> Total ${parkFeeTotal} USD. Avoid carrying exact cash USD to the helipad.
                      </label>
                    </div>
                  )}

                  {/* Price Calculation Summary */}
                  <div style={{
                    background: '#faf9f6',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px',
                    fontSize: '0.88rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                      <span>Experience Base ({adults} Ad{children > 0 ? `, ${children} Ch` : ''})</span>
                      <span>${basePrice}</span>
                    </div>
                    {parkFeeTotal > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                        <span>Park Conservation Fees</span>
                        <span>+${parkFeeTotal}</span>
                      </div>
                    )}
                    {addOnsTotal > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                        <span>Add-Ons Total</span>
                        <span>+${addOnsTotal}</span>
                      </div>
                    )}
                    <div style={{
                      borderTop: '1px solid var(--sand-border)',
                      paddingTop: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: 'var(--text-main)'
                    }}>
                      <span>Total Gross Due:</span>
                      <span style={{ color: 'var(--gold-hover)' }}>${totalUSD} USD</span>
                    </div>
                  </div>

                  {/* Primary Book CTA */}
                  <button
                    onClick={handleStartBooking}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', fontSize: '1.1rem', fontWeight: 700 }}
                  >
                    Instant Checkout (${totalUSD})
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <Lock size={12} />
                    <span>256-Bit Encrypted Secure Stripe Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Checkout & Voucher Modal */}
      {checkoutModalOpen && (
        <div className="modal-overlay" onClick={() => !isSubmitting && setCheckoutModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px', padding: '36px' }}>
            <button
              onClick={() => setCheckoutModalOpen(false)}
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

            {confirmedBooking ? (
              /* Success & Printable Voucher View */
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--emerald-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <CheckCircle2 size={36} color="var(--emerald)" />
                </div>

                <h3 className="heading-title" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                  Booking Confirmed!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
                  Your flight has been securely confirmed. Payment captured in Stripe.
                </p>

                {/* Voucher Ticket Box */}
                <div id="voucher-ticket" style={{
                  background: '#faf9f6',
                  border: '2px dashed var(--sand-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  textAlign: 'left',
                  marginBottom: '28px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--sand-border)', paddingBottom: '14px', marginBottom: '14px' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Voucher Code</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gold-hover)', letterSpacing: '0.05em' }}>
                        {confirmedBooking.voucherCode}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Amount Paid</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--emerald)' }}>
                        ${confirmedBooking.totalAmountUSD} USD
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.88rem', marginBottom: '14px' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Experience:</span>
                      <div style={{ fontWeight: 600 }}>{confirmedBooking.activityName}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Date & Slot:</span>
                      <div style={{ fontWeight: 600 }}>{confirmedBooking.bookingDate} at {confirmedBooking.timeSlot}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Lead Guest:</span>
                      <div style={{ fontWeight: 600 }}>{confirmedBooking.travellerName}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Guest Email:</span>
                      <div style={{ fontWeight: 600 }}>{confirmedBooking.travellerEmail}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8rem', background: '#ffffff', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--sand-border)' }}>
                    <strong>Transfer Instructions:</strong> Our transfer shuttle will arrive at your Victoria Falls hotel lobby 30 minutes prior to your flight departure time ({confirmedBooking.timeSlot}). Please have your passport ready for manifest check.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button onClick={() => window.print()} className="btn btn-obsidian">
                    <Printer size={16} />
                    Print Voucher
                  </button>
                  <button onClick={() => setCheckoutModalOpen(false)} className="btn btn-primary">
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Input Form */
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <CreditCard size={22} color="var(--gold-primary)" />
                  <h3 className="heading-title" style={{ fontSize: '1.45rem' }}>
                    Complete Instant Activity Checkout
                  </h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
                  Enter traveler details to capture booking authority. Total gross charge: <strong>${totalUSD} USD</strong>.
                </p>

                {bookingError && (
                  <div style={{
                    background: 'var(--crimson-bg)',
                    border: '1px solid hsla(352, 75%, 52%, 0.3)',
                    color: 'var(--crimson)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem',
                    marginBottom: '20px'
                  }}>
                    {bookingError}
                  </div>
                )}

                <form onSubmit={handleCompleteCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Full Name (Lead Traveler) <span style={{ color: 'var(--crimson)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={guestName}
                        onChange={e => setGuestName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--sand-border)',
                          fontSize: '0.92rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Email Address (for Voucher) <span style={{ color: 'var(--crimson)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder="john.smith@example.com"
                        value={guestEmail}
                        onChange={e => {
                          setGuestEmail(e.target.value);
                          if (emailError) setEmailError(null);
                        }}
                        onBlur={handleEmailBlur}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: `1px solid ${emailError ? 'var(--crimson)' : 'var(--sand-border)'}`,
                          fontSize: '0.92rem'
                        }}
                      />
                      {emailError && (
                        <div style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '4px' }}>
                          {emailError}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        WhatsApp / Mobile Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 555 019 2834"
                        value={guestPhone}
                        onChange={e => setGuestPhone(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--sand-border)',
                          fontSize: '0.92rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Nationality
                      </label>
                      <select
                        value={guestNationality}
                        onChange={e => setGuestNationality(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--sand-border)',
                          fontSize: '0.92rem',
                          background: '#fff'
                        }}
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Simulated Stripe Card Element */}
                  <div style={{
                    background: '#f8f9fa',
                    border: '1px solid var(--sand-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '16px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        Credit or Debit Card (Stripe Elements)
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--emerald)', fontWeight: 600 }}>
                        ✓ Test Sandbox Ready
                      </span>
                    </div>

                    <div style={{
                      background: '#ffffff',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      padding: '12px 14px',
                      fontSize: '0.92rem',
                      fontFamily: 'monospace',
                      color: '#495057',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>•••• •••• •••• 4242</span>
                      <span>12/28 &nbsp; CVC 123</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setCheckoutModalOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                      style={{ minWidth: '180px' }}
                    >
                      {isSubmitting ? 'Capturing Payment...' : `Pay $${totalUSD} USD`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
