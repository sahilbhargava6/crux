import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CRUX.TSC — Creative Digital Agency',
  description: 'We craft digital experiences that stand out. Premium web development, UI/UX design, branding, graphics & social media management.',
  keywords: 'digital agency, web development, UI/UX design, branding, social media, CRUX.TSC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
