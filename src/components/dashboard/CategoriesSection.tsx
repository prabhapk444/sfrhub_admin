
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Search, Download } from "lucide-react";
import { useCategories } from "./categories/useCategories";
import { CategoryForm } from "./categories/CategoryForm";
import { CategoryItem } from "./categories/CategoryItem";
import { Category } from "./categories/types";
import { Input } from "@/components/ui/input";
import { CSVLink } from "react-csv";

export const CategoriesSection = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAdd = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (data: any) => {
    if (editingCategory) {
      return await updateCategory(editingCategory.id, data);
    } else {
      return await addCategory(data);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const filteredCategories = categories.filter((category) => {
  const english = category?.nameInEnglish?.toLowerCase();
  const tamil = category?.nameInTamil?.toLowerCase();
  const search = searchTerm.toLowerCase();

  return english?.includes(search) || tamil?.includes(search);
});

  const csvData = categories.map((category) => ({
    "Name (English)": category.nameInEnglish,
    "Name (Tamil)": category.nameInTamil || "",
    "Color": category.color,
    "Icon": category.icon || "",
    "Order": category.order
  }));


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground outline-none" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <CSVLink 
            data={csvData}
            filename={`categories-${new Date().toISOString().split('T')[0]}.csv`}
            className="inline-flex"
          >
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CSVLink>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No categories found.
          </div>
        ) : (
          filteredCategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={deleteCategory}
            />
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            onSubmit={handleSubmit}
            onCancel={handleCloseDialog}
            initialData={editingCategory || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
