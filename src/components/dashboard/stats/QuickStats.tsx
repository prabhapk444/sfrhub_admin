import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "./ProgressBar";

interface OrderStatus {
  pending: number;
  progress: number;
  completed: number;
  underreview: number;
  cancelled: number;
  total: number;
}

interface QuickStatsProps {
  orderStatus: OrderStatus;
}

export const QuickStats = ({ orderStatus }: QuickStatsProps) => {
const { pending, progress, completed, underreview, cancelled, total } = orderStatus;


  const getPercentage = (count: number) =>
    total === 0 ? 0 : Math.round((count / total) * 100);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Enquiry Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ProgressBar 
            label="Pending Enquiries" 
            count={pending} 
            percentage={getPercentage(pending)} 
            color="bg-amber-400" 
          />
          
          <ProgressBar 
            label="In Progress" 
            count={progress} 
            percentage={getPercentage(progress)} 
            color="bg-blue-500" 
          />
          
          <ProgressBar 
            label="Approved" 
            count={completed} 
            percentage={getPercentage(completed)} 
            color="bg-green-500" 
          />

          <ProgressBar
            label="Under Review"
            count={underreview}
            percentage={getPercentage(underreview)}
            color="bg-purple-500"
          />

          <ProgressBar
            label="Cancelled"
            count={cancelled}
            percentage={getPercentage(cancelled)}
            color="bg-red-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};
