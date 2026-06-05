import { Suspense } from "react";
import { DataGrid } from "@/components/data-grid";
import { DataCharts } from "@/components/data-charts";

const DashboardContent = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  );
};

const DashboardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
};

export default DashboardPage;