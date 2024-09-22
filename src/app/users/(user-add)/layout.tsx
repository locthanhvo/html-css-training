import { MultiFormProvider } from '@/context';
import { SecondaryLayout } from '@/layouts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UserAdd - Dark Dashboard',
  description:
    'The dashboard provides an overview of key metrics, recent activities, and quick access to important features and tools.',
};

export default function UserAddLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SecondaryLayout>
      <MultiFormProvider>
        <main>{children}</main>
      </MultiFormProvider>
    </SecondaryLayout>
  );
}
