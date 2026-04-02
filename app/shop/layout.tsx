import type { Metadata } from 'next';
import { CartProvider } from './components/cartProvider';

export const metadata: Metadata = {
  title: 'Handcrafted Haven',
  description: 'Discover unique handcrafted treasures',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}