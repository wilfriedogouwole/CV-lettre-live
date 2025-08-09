import CreditDisplay from '@/components/credits/credit-display';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import { Overview } from '@/components/dashboard/overview';
import { RecentDocuments } from '@/components/dashboard/recent-documents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { prisma } from '@/lib/prisma';
import { createUser } from '@/lib/user-actions';
import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import DashboardContent from './dashboard-content/page';

export default async function DashboardPage() {
  const { userId } = auth();
  const user = await currentUser();
  
  if (!userId || !user) {
    redirect('/sign-in');

    /*return null; // Layout will handle redirect*/
  }

  // Create or update user in database
  await createUser({
    id: userId,
    email: user.emailAddresses[0].emailAddress,
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Utilisateur',
  });

  // Get user's CVs and cover letters
  const cvs = await prisma.cV.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  });

  const coverLetters = await prisma.coverLetter.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  });

  // Get user's job applications
  const applications = await prisma.jobApplication.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      job: true
    }
  });

  // Get counts
  const applicationCount = await prisma.jobApplication.count({
    where: { userId }
  });

  return (
    <>
      <DashboardHeader
        heading="Tableau de bord"
        text="Gérez vos Cv's, Lettres de motivation et Candidatures"
      />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value="documents">Documents récents</TabsTrigger>
          <TabsTrigger value="applications">Candidatures</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Overview 
            cvCount={cvs.length} 
            letterCount={coverLetters.length}
            applicationCount={applicationCount}
          />
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <RecentDocuments 
            cvs={cvs} 
            coverLetters={coverLetters}
            applications={applications}
          />
        </TabsContent>
        <DashboardContent/>
      </Tabs>

      <CreditDisplay/>
     
    </>
  );
}