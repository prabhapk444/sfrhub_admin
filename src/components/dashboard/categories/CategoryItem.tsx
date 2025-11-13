
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { Category } from "./types";

interface CategoryItemProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const CategoryItem = ({ category, onEdit, onDelete }: CategoryItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${category.nameInEnglish}"?`)) {
      setIsDeleting(true);
      await onDelete(category.id);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <div 
          className="w-4 h-4 rounded-full border"
          style={{ backgroundColor: category.color }}
        />
        <div>
          <div className="font-medium">{category.nameInEnglish}</div>
          {category.nameInTamil && (
            <div className="text-sm text-muted-foreground">{category.nameInTamil}</div>
          )}
          <div className="text-sm text-muted-foreground">Order: {category.order}</div>
        </div>
        {category.icon && (
          <Badge variant="secondary">{category.icon}</Badge>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(category)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
