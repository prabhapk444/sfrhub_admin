import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { Enquiry, EnquiryStatus } from "./types";

export const useEnquiries = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "enquiries"));
      const enquiriesData = await Promise.all(
        querySnapshot.docs.map(async (docRef) => {
          const data = docRef.data();

          
          let userName = "";
          let userEmail = "";

          if (data.userId) {
            try {
              const userDoc = await getDoc(doc(db, "users", data.userId));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                userName = userData.fullName || "";
                userEmail = userData.email || "";
              }
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          }

          // Fetch service data
          let serviceName = "";
          if (data.serviceId) {
            try {
              const serviceDoc = await getDoc(doc(db, "services", data.serviceId));
              if (serviceDoc.exists()) {
                const serviceData = serviceDoc.data();
                serviceName = serviceData.nameInEnglish || "";
              }
            } catch (error) {
              console.error("Error fetching service data:", error);
            }
          }

          return {
            id: docRef.id,
            userId: data.userId || "",
            userName,
            userEmail,

            serviceId: data.serviceId || "",
            serviceName,
            phone: data.phone || "",
            address: data.address || "",

            dob: data.dob || "",
            gender: data.gender || "",
            pincode: data.pinCode || "", 
            status: data.status || "pending",

            date: data.date instanceof Timestamp
              ? data.date.toDate().toLocaleDateString()
              : data.date || "",

            createdAt: data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toLocaleString()
              : data.createdAt || "",
          } as Enquiry;
        })
      );
      setEnquiries(enquiriesData);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
    setLoading(false);
  };

  const updateEnquiryStatus = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      const enquiryRef = doc(db, "enquiries", enquiryId);
      await updateDoc(enquiryRef, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((e) =>
          e.id === enquiryId ? { ...e, status: newStatus } : e
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return {
    enquiries,
    loading,
    updateEnquiryStatus,
    refetch: fetchEnquiries,
  };
};
