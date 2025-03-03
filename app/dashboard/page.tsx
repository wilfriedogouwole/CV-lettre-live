import { auth } from '@clerk/nextjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import { Overview } from '@/components/dashboard/overview';
import { RecentDocuments } from '@/components/dashboard/recent-documents';
import { prisma } from '@/lib/prisma';
import { createUser } from '@/lib/user-actions';
import { currentUser } from '@clerk/nextjs';

export default async function DashboardPage() {
  const { userId } = auth();
  const user = await currentUser();
  
  if (!userId || !user) {
    return null; // Layout will handle redirect
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

  return (
    <>
      <DashboardHeader
        heading="Tableau de bord"
        text="Gérez vos CV et lettres de motivation"
      />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="documents">Documents récents</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Overview cvCount={cvs.length} letterCount={coverLetters.length} />
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <RecentDocuments cvs={cvs} coverLetters={coverLetters} />
        </TabsContent>
      </Tabs>
    </>
  );
}