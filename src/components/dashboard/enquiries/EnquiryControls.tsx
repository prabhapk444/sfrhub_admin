
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CSVLink } from "react-csv";
import { Download } from "lucide-react";
import { Enquiry, CSV_HEADERS } from "./types";

interface EnquiryControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  filteredEnquiries: Enquiry[];
}

export const EnquiryControls = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  filteredEnquiries,
}: EnquiryControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
      <Input
        placeholder="Search enquiries..."
        className="w-full sm:w-64"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in progress">In Progress</SelectItem>
          <SelectItem value="under review">Under Review</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {filteredEnquiries.length > 0 && (
        <div className="w-full sm:w-auto">
          <CSVLink
            data={filteredEnquiries}
            headers={CSV_HEADERS}
            filename="enquiries.csv"
            className="w-full block"
          >
            <Button 
              variant="outline" 
              className="w-full sm:w-auto bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900 dark:hover:to-emerald-900 text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 shadow-sm hover:shadow-md transition-all duration-200 font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Export </span>CSV
            </Button>
          </CSVLink>
        </div>
      )}
    </div>
  );
};
