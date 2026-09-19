import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Victoria Falls, Livingstone & Chobe — Premium Tourism & Safari Platform',
  description:
    'Experience the Golden Triangle of Southern Africa. Instant activity bookings, helicopter flights of angels, luxury Zambezi river cruises, and accommodation at Explorers Village.',
  keywords: [
    'Victoria Falls helicopter flight',
    'Flight of Angels',
    'Livingstone Devils Pool',
    'Chobe safari day trip',
    'Shearwater Explorers Village',
    'Zambezi sunset cruise',
    'Batoka gorge rafting'
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />
      </head>
      <body>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
