import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function MockReportDisplay({ reportName }: { reportName: string }) {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    toast({ title: "Downloading report..." });
    setTimeout(() => setDownloading(false), 1200);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Mock {reportName}</h2>
      <div className="mb-6 text-muted-foreground">
        This is where your generated report data will appear.
      </div>
      <Button onClick={handleDownload} disabled={downloading}>
        {downloading ? "Downloading..." : "Download Report"}
      </Button>
    </div>
  );
} 