
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryFormData, Category } from "./types";
import { Loader2 } from "lucide-react";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<boolean>;
  onCancel: () => void;
  initialData?: Category;
  isLoading?: boolean;
}

export const CategoryForm = ({ onSubmit, onCancel, initialData, isLoading }: CategoryFormProps) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    nameInEnglish: initialData?.nameInEnglish || "",
    nameInTamil: initialData?.nameInTamil || "",
    color: initialData?.color || "#3b82f6",
    icon: initialData?.icon || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameInEnglish.trim()) {
      return;
    }
    
    const success = await onSubmit(formData);
    if (success) {
      setFormData({ nameInEnglish: "", nameInTamil: "", color: "#3b82f6", icon: "" });
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="nameInEnglish">Category Name (English) *</Label>
        <Input
          id="nameInEnglish"
          type="text"
          value={formData.nameInEnglish}
          onChange={(e) => setFormData({ ...formData, nameInEnglish: e.target.value })}
          placeholder="Enter category name in English"
          required
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="nameInTamil">Category Name (Tamil)</Label>
        <Input
          id="nameInTamil"
          type="text"
          value={formData.nameInTamil}
          onChange={(e) => setFormData({ ...formData, nameInTamil: e.target.value })}
          placeholder="Enter category name in Tamil"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="color">Color</Label>
        <div className="flex items-center gap-2">
          <Input
            id="color"
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="w-16 h-10"
          />
          <Input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="#3b82f6"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="icon">Icon Name</Label>
        <Input
          id="icon"
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="Enter icon name"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading || !formData.nameInEnglish.trim()}>
          {initialData ? "Update" : "Add"} Category
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
