
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export const useDashboardStats = () => {
  const [certificateCount, setCertificateCount] = useState<number>(0);
  const [usersCount, setUserCount] = useState<number>(0);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const[servicesCount,setServicesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const certSnapshot = await getDocs(collection(db, "categories"));
        setCertificateCount(certSnapshot.size);

        const serveSnapshot  =  await getDocs(collection(db,"services"));
        setServicesCount(serveSnapshot.size);
       
        const enquirySnapshot = await getDocs(collection(db, "enquiries"));
        const enquiryList = enquirySnapshot.docs.map((doc) => doc.data());
        setEnquiries(enquiryList);

        const userSnapshot = await getDocs(collection(db, "users"));
        setUserCount(userSnapshot.size);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const orderStatusCounts = {
  pending: enquiries.filter((e) => e.status === "pending").length,
  progress: enquiries.filter((e) => e.status === "in progress").length,
  completed: enquiries.filter((e) => e.status === "approved").length,
  underreview: enquiries.filter((e) => e.status === "under review").length,
  cancelled: enquiries.filter((e) => e.status === "cancelled").length,
  total: enquiries.length
};


  return {
    certificateCount,
    usersCount,
    orders: enquiries,
    orderStatusCounts,
    servicesCount,
    isLoading
  };
};
