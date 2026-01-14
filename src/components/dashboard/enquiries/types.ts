
export type EnquiryStatus = "pending" | "in progress" | "under review" | "approved" | "cancelled";

export interface Enquiry {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  serviceId: string;
  serviceName: string;
  phone: string;
  address: string;
  pincode: string;
  dob: string;
  gender: string;
  status: EnquiryStatus;
  date: string;
  createdAt: string;
}


export const CSV_HEADERS = [
  { label: "ID", key: "id" },
  { label: "User Name", key: "userName" },
  { label: "Email", key: "userEmail" },
  { label: "DOB", key: "dob" },
  { label: "Gender", key: "gender" },
  { label: "Service", key: "serviceName" },
  { label: "Phone Number", key: "phone" },
  { label: "Address", key: "address" },
  { label: "Pincode", key: "pincode" },
  { label: "Status", key: "status" },
  { label: "Date", key: "createdAt" },
];

