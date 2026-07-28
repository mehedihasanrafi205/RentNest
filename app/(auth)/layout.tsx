import { ReactNode } from 'react';
import { HeroSection } from './_components/AuthHeroSection';


export const metadata = {
  title: 'Authentication | RentNest',
  description: 'Sign in or create your RentNest account',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <HeroSection />
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}
