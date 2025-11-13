
import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Category, CategoryFormData } from "./types";
import { toast } from "sonner";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
      setCategories(categoriesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getNextOrder = async () => {
    const q = query(collection(db, "categories"), orderBy("order", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return 1;
    const lastCategory = snapshot.docs[0].data() as Category;
    return lastCategory.order + 1;
  };

  const checkDuplicateName = (nameInEnglish: string, excludeId?: string) => {
    return categories.some(cat => 
      cat.nameInEnglish.toLowerCase() === nameInEnglish.toLowerCase() && cat.id !== excludeId
    );
  };

  const addCategory = async (data: CategoryFormData) => {
    try {
      if (checkDuplicateName(data.nameInEnglish)) {
        toast.error("Category name already exists");
        return false;
      }

      const order = await getNextOrder();
      await addDoc(collection(db, "categories"), {
        ...data,
        order
      });
      
      toast.success("Category added successfully");
      return true;
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
      return false;
    }
  };

  const updateCategory = async (id: string, data: CategoryFormData) => {
    try {
      if (checkDuplicateName(data.nameInEnglish, id)) {
        toast.error("Category name already exists");
        return false;
      }

      const categoryRef = doc(db, "categories", id);
      await updateDoc(categoryRef, data);
      
      toast.success("Category updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
      return false;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const categoryRef = doc(db, "categories", id);
      await deleteDoc(categoryRef);
      
      toast.success("Category deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
      return false;
    }
  };

  return {
    categories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
