import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import DashboardShell from '@/components/dashboard/dashboard-shell';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <DashboardShell>
      <DashboardNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        {children}
      </div>
    </DashboardShell>
  );
}