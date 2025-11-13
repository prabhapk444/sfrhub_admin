
import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import { Service, ServiceFormData } from "./types";
import { toast } from "sonner";

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("nameInEnglish", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const servicesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
      setServices(servicesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const checkDuplicateName = (nameInEnglish: string, excludeId?: string) => {
    return services.some(service => 
      service.nameInEnglish.toLowerCase() === nameInEnglish.toLowerCase() && service.id !== excludeId
    );
  };

  const addService = async (data: ServiceFormData) => {
    try {
      if (checkDuplicateName(data.nameInEnglish)) {
        toast.error("Service name already exists");
        return false;
      }

      await addDoc(collection(db, "services"), data);
      
      toast.success("Service added successfully");
      return true;
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
      return false;
    }
  };

  const updateService = async (id: string, data: ServiceFormData) => {
    try {
      if (checkDuplicateName(data.nameInEnglish, id)) {
        toast.error("Service name already exists");
        return false;
      }

      const serviceRef = doc(db, "services", id);
      await updateDoc(serviceRef, data);
      
      toast.success("Service updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
      return false;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const serviceRef = doc(db, "services", id);
      await deleteDoc(serviceRef);
      
      toast.success("Service deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
      return false;
    }
  };

  return {
    services,
    loading,
    addService,
    updateService,
    deleteService,
  };
};
