
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceFormData, Service } from "./types";
import { useCategories } from "../categories/useCategories";
import { useServices } from "../services/useServices"; 

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => Promise<boolean>;
  onCancel: () => void;
  initialData?: Service;
  isLoading?: boolean;
}

export const ServiceForm = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading,
}: ServiceFormProps) => {
  const { categories } = useCategories();
  const { services } = useServices(); 

  const [formData, setFormData] = useState<ServiceFormData>({
    nameInEnglish: initialData?.nameInEnglish || "",
    nameInTamil: initialData?.nameInTamil || "",
    icon: initialData?.icon || "",
    categoryId: initialData?.categoryId || "",
    descriptionInEnglish: initialData?.descriptionInEnglish || "",
    descriptionInTamil: initialData?.descriptionInTamil || "",
    isActive: initialData?.isActive ?? true,
    order: initialData?.order || 0,
  });

  useEffect(() => {
    if (!initialData) {
      const maxOrder = services.length + 1;
      setFormData((prev) => ({ ...prev, order: maxOrder }));
    }
  }, [services, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameInEnglish.trim() || !formData.categoryId) {
      return;
    }

    const success = await onSubmit(formData);
    if (success) {
      setFormData({
        nameInEnglish: "",
        nameInTamil: "",
        icon: "",
        categoryId: "",
        descriptionInEnglish: "",
        descriptionInTamil: "",
        isActive: true,
        order: 0,
      });
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="space-y-3">
        <Label htmlFor="nameInEnglish" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Service Name (English) *
        </Label>
        <Input
          id="nameInEnglish"
          type="text"
          value={formData.nameInEnglish}
          onChange={(e) => setFormData({ ...formData, nameInEnglish: e.target.value })}
          placeholder="Enter service name in English"
        
          required
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="nameInTamil" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Service Name (Tamil)
        </Label>
        <Input
          id="nameInTamil"
          type="text"
          value={formData.nameInTamil}
          onChange={(e) => setFormData({ ...formData, nameInTamil: e.target.value })}
          placeholder="Enter service name in Tamil"

        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Icon Name
        </Label>
        <Input
          id="icon"
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="Enter icon name"
          
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category *
        </Label>
        <Select
          value={formData.categoryId}
          onValueChange={(value) =>
            setFormData({ ...formData, categoryId: value })
          }
        >
          <SelectTrigger className="w-2/3 border border-gray-200 dark:border-gray-700">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.nameInEnglish}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="descriptionInEnglish" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description (English)
        </Label>
        <Textarea
          id="descriptionInEnglish"
          value={formData.descriptionInEnglish}
          onChange={(e) =>
            setFormData({ ...formData, descriptionInEnglish: e.target.value })
          }
          placeholder="Enter service description in English"
          rows={3}
         
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="descriptionInTamil" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description (Tamil)
        </Label>
        <Textarea
          id="descriptionInTamil"
          value={formData.descriptionInTamil}
          onChange={(e) =>
            setFormData({ ...formData, descriptionInTamil: e.target.value })
          }
          placeholder="Enter service description in Tamil"
          rows={3}
     
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Order
        </Label>
        <Input
          id="order"
          type="number"
          value={formData.order}
          onChange={(e) =>
            setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
          }
          placeholder="Auto-generated order"
        
          readOnly
        />
      </div>

      <div className="flex items-center space-x-3">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isActive: checked })
          }
        />
        <Label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Active
        </Label>
      </div>

      <div className="flex gap-3 pt-6">
        <Button
          type="submit"
          disabled={isLoading || !formData.nameInEnglish.trim() || !formData.categoryId}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          {initialData ? "Update" : "Add"} Service
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
