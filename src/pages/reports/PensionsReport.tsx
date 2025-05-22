import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { Download, RefreshCw, Send } from "lucide-react";
import MemberUpdatesSection from "@/components/reports/pensions/MemberUpdatesSection";
import ContributionScheduleSection from "@/components/reports/pensions/ContributionScheduleSection";
import ScheduleDetailsModal from "@/components/reports/pensions/ScheduleDetailsModal";

const PensionsReport = () => {
  const [lastSynced, setLastSynced] = useState<Date>(new Date());
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);

  const handleDownloadCSV = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("NEST Contribution Schedules CSV generated successfully!");
    } catch (error) {
      toast.error("Failed to generate CSV. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pensions Report</h1>
          <p className="text-muted-foreground mt-1">
            Last synced with NEST: {format(lastSynced, "PPpp")}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleDownloadCSV}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download Schedules CSV
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Member Updates Section */}
        <MemberUpdatesSection onSync={() => setLastSynced(new Date())} />

        {/* Contribution Schedule Section */}
        <ContributionScheduleSection
          onViewSchedule={(schedule) => {
            setSelectedSchedule(schedule);
            setIsScheduleModalOpen(true);
          }}
        />
      </div>

      {/* Schedule Details Modal */}
      <ScheduleDetailsModal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
        schedule={selectedSchedule}
      />
    </div>
  );
};

export default PensionsReport; 