"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileSearch } from "lucide-react";

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

export const PieVariant = ({ data = [] }: Props) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardContent className="flex items-center justify-center h-[350px]">
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">No data for this period</p>
          </div>
        ) : (
          <p>Pie chart coming soon</p>
        )}
      </CardContent>
    </Card>
  );
};

export const PieVariantLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[350px] w-full" />
      </CardContent>
    </Card>
  );
};