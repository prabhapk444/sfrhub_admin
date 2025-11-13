
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Enquiry, EnquiryStatus } from "./types";

interface EnquiryTableProps {
  enquiries: Enquiry[];
  loading: boolean;
  onStatusUpdate: (enquiryId: string, newStatus: EnquiryStatus) => void;
}

export const EnquiryTable = ({ enquiries, loading, onStatusUpdate }: EnquiryTableProps) => {
  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">User Name</TableHead>
            <TableHead className="whitespace-nowrap">Email</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Service</TableHead>
            <TableHead className="whitespace-nowrap">Phone</TableHead>
                <TableHead className="whitespace-nowrap">Address</TableHead>
            <TableHead className="whitespace-nowrap">Pincode</TableHead>
            <TableHead className="whitespace-nowrap">DOB</TableHead>
            <TableHead className="whitespace-nowrap">Gender</TableHead>
            <TableHead className="whitespace-nowrap">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-6">
                Loading inquiries...
              </TableCell>
            </TableRow>
          ) : enquiries.length > 0 ? (
            enquiries.map((enquiry) => (
              <TableRow key={enquiry.id}>
                <TableCell className="whitespace-nowrap">{enquiry.userName}</TableCell>
                <TableCell className="whitespace-nowrap">{enquiry.userEmail}</TableCell>
                <TableCell>
                  <Select
                    value={enquiry.status}
                    onValueChange={(newStatus: EnquiryStatus) =>
                      onStatusUpdate(enquiry.id, newStatus)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="under review">Under Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                 <TableCell className="whitespace-nowrap">{enquiry.serviceName}</TableCell>
                <TableCell className="whitespace-nowrap">{enquiry.phone}</TableCell>
                <TableCell className="whitespace-nowrap">{enquiry.address}</TableCell>
                <TableCell className="whitespace-nowrap">{enquiry.pincode}</TableCell>
                <TableCell className="whitespace-nowrap">{enquiry.dob}</TableCell>
                <TableCell className="whitespace-nowrap">{enquiry.gender}</TableCell>
                <TableCell className="whitespace-nowrap">{enquiry.createdAt}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-6">
                No inquiries found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
