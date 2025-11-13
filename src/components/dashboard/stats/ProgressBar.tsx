
interface ProgressBarProps {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export const ProgressBar = ({ label, count, percentage, color }: ProgressBarProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{count}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
        <div
          className={`${color} h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
