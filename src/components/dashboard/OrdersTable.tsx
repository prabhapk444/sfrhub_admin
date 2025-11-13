
import { useState } from "react";
import { useEnquiries } from "./enquiries/useEnquiries";
import { EnquiryControls } from "./enquiries/EnquiryControls";
import { EnquiryTable } from "./enquiries/EnquiryTable";

export const OrdersTable = () => {
  const { enquiries, loading, updateEnquiryStatus } = useEnquiries();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (enquiry.userName?.toLowerCase().includes(searchLower) ?? false) ||
      (enquiry.userEmail?.toLowerCase().includes(searchLower) ?? false) ||
      (enquiry.serviceName?.toLowerCase().includes(searchLower) ?? false) ||
      (enquiry.address?.toLowerCase().includes(searchLower) ?? false) ||
      (enquiry.pincode?.includes(searchTerm) ?? false) ||
      (enquiry.phone?.includes(searchTerm) ?? false);

    const matchesStatus =
      statusFilter === "all" ||
      enquiry.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inquiry Management</h1>
      </div>

      <EnquiryControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        filteredEnquiries={filteredEnquiries}
      />

      <EnquiryTable
        enquiries={filteredEnquiries}
        loading={loading}
        onStatusUpdate={updateEnquiryStatus}
      />
    </div>
  );
};
