"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, FileText, PenLine, Send } from "lucide-react";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", total: 2 },
  { name: "Fév", total: 3 },
  { name: "Mar", total: 1 },
  { name: "Avr", total: 4 },
  { name: "Mai", total: 2 },
  { name: "Juin", total: 5 },
  { name: "Juil", total: 3 },
  { name: "Août", total: 1 },
  { name: "Sep", total: 4 },
  { name: "Oct", total: 2 },
  { name: "Nov", total: 5 },
  { name: "Dec", total: 5 },
];

interface OverviewProps {
  cvCount: number;
  letterCount: number;
  applicationCount: number;
}

export function Overview({
  cvCount,
  letterCount,
  applicationCount,
}: OverviewProps) {
  const [cvDelta, setCvDelta] = React.useState<number | null>(null);
  const [letterDelta, setLetterDelta] = React.useState<number | null>(null);
  const [appDelta, setAppDelta] = React.useState<number | null>(null);

  React.useEffect(() => {
    setCvDelta(Math.floor(Math.random() * 5) + 1);
    setLetterDelta(Math.floor(Math.random() * 3) + 1);
    setAppDelta(Math.floor(Math.random() * 4) + 1);
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CV créés</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cvCount}</div>
          <p className="text-xs text-muted-foreground">
            {cvDelta !== null && `+${cvDelta} depuis le mois dernier`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lettres créées</CardTitle>
          <PenLine className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{letterCount}</div>
          <p className="text-xs text-muted-foreground">
            {letterDelta !== null && `+${letterDelta} depuis le mois dernier`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Candidatures envoyées</CardTitle>
          <Send className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{applicationCount}</div>
          <p className="text-xs text-muted-foreground">
            {appDelta !== null && `+${appDelta} depuis le mois dernier`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dernière activité</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Aujourd&apos;hui</div>
          <p className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString("fr-FR")}
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-1 sm:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Activité</CardTitle>
          <CardDescription>
            Nombre de documents créés au cours des 6 derniers mois
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey="total"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
