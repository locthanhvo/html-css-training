import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const workSans = Work_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dark Dashboard',
  description:
    'The dashboard provides an overview of key metrics, recent activities, and quick access to important features and tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            success: {
              style: {
                background: '#15803d',
              },
            },
            error: {
              style: {
                background: '#b91c1c',
              },
            },
            style: {
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  );
}
