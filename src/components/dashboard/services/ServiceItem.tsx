
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, MoreVertical, FileText } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Service } from "./types";
import { useCategories } from "../categories/useCategories";

interface ServiceItemProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export const ServiceItem = ({ service, onEdit, onDelete }: ServiceItemProps) => {
  const { categories } = useCategories();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${service.nameInEnglish}"?`)) {
      setIsDeleting(true);
      await onDelete(service.id);
      setIsDeleting(false);
    }
  };

  const category = categories.find(cat => cat.id === service.categoryId);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 group" style={{ borderLeftColor: category?.color || '#e5e7eb' }}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-4">
            
            {/* Header with Icon and Names */}
            <div className="flex items-start gap-4">
              {service.icon && (
               <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-full text-sm shadow-sm group-hover:shadow-md transition-shadow duration-300 flex-shrink-0">
  <FileText className="w-6 h-6 text-gray-700 dark:text-gray-200" />
</div>
              )}
              <div className="space-y-2 flex-1 min-w-0">
                <div className="space-y-1">
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100 leading-tight">
                    {service.nameInEnglish}
                  </h3>
                  {service.nameInTamil && (
                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
                      {service.nameInTamil}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Descriptions */}
            {(service.descriptionInEnglish || service.descriptionInTamil) && (
              <div className="space-y-3 pl-18">
                {service.descriptionInEnglish && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {service.descriptionInEnglish}
                  </p>
                )}
                {service.descriptionInTamil && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.descriptionInTamil}
                  </p>
                )}
              </div>
            )}

            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              {category && (
                <Badge 
                  variant="outline" 
                  className="px-3 py-1.5 text-xs font-medium rounded-full border-2"
                  style={{ 
                    borderColor: category.color,
                    backgroundColor: `${category.color}15`,
                    color: category.color 
                  }}
                >
                  {category.nameInEnglish}
                </Badge>
              )}
              
              <Badge 
                variant={service.isActive ? "default" : "secondary"}
                className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                  service.isActive 
                    ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700" 
                    : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
                }`}
              >
                {service.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          
          {/* Actions Menu */}
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 w-9 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-white dark:bg-gray-800 border shadow-lg">
                <DropdownMenuItem 
                  onClick={() => onEdit(service)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Service
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Deleting..." : "Delete Service"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
