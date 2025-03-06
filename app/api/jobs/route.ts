import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const location = searchParams.get("location");
  const source = searchParams.get("source");

  try {
    // Simulate job search with mock data
    const mockJobs = [
      {
        id: "1",
        title: "Développeur Full Stack",
        company: "Tech Company",
        location: "Paris",
        description: "Nous recherchons un développeur Full Stack expérimenté...",
        salary: "45-55k€",
        url: "https://example.com/job1",
        source: "Indeed"
      },
      {
        id: "2",
        title: "Développeur Frontend React",
        company: "Startup Innovation",
        location: "Lyon",
        description: "Rejoignez notre équipe dynamique...",
        salary: "40-50k€",
        url: "https://example.com/job2",
        source: "HelloWork"
      },
      {
        id: "3",
        title: "Développeur Backend Node.js",
        company: "Digital Solutions",
        location: "Bordeaux",
        description: "Participez au développement de nos solutions...",
        salary: "42-52k€",
        url: "https://example.com/job3",
        source: "Pôle Emploi"
      }
    ];

    // Filter jobs based on search criteria
    let filteredJobs = mockJobs;
    
    if (query) {
      const searchRegex = new RegExp(query, 'i');
      filteredJobs = filteredJobs.filter(job => 
        searchRegex.test(job.title) || 
        searchRegex.test(job.company) || 
        searchRegex.test(job.description)
      );
    }

    if (location) {
      const locationRegex = new RegExp(location, 'i');
      filteredJobs = filteredJobs.filter(job => 
        locationRegex.test(job.location)
      );
    }

    if (source && source !== 'all') {
      filteredJobs = filteredJobs.filter(job => 
        job.source.toLowerCase() === source.toLowerCase()
      );
    }

    // Save jobs to database
    await prisma.job.createMany({
      data: filteredJobs.map(job => ({
        ...job,
        type: null
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ jobs: filteredJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}