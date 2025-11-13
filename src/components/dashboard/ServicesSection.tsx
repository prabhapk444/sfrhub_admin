
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Search, Download } from "lucide-react";
import { useServices } from "./services/useServices";
import { ServiceForm } from "./services/ServiceForm";
import { ServiceItem } from "./services/ServiceItem";
import { Service } from "./services/types";
import { Input } from "@/components/ui/input";
import { CSVLink } from "react-csv";
import { useCategories } from "./categories/useCategories";

export const ServicesSection = () => {
  const { services, addService, updateService, deleteService, loading } = useServices();
  const { categories } = useCategories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleAdd = () => {
    setEditingService(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (data: any) => {
    if (editingService) {
      return await updateService(editingService.id, data);
    } else {
      return await addService(data);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingService(null);
  };

  const filteredServices = services.filter((service) =>
    service?.nameInEnglish?.toLowerCase?.()?.includes(searchTerm.toLowerCase()) || 
    service?.nameInTamil?.toLowerCase?.()?.includes(searchTerm.toLowerCase()) || 
    false
  );

  const csvData = services.map((service) => {
    const category = categories.find(cat => cat.id === service.categoryId);
    return {
      "Name (English)": service.nameInEnglish,
      "Name (Tamil)": service.nameInTamil || "",
      "Description (English)": service.descriptionInEnglish || "",
      "Description (Tamil)": service.descriptionInTamil || "",
      "Category": category?.nameInEnglish || "",
      "Status": service.isActive ? "Active" : "Inactive"
    };
  });



  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <CSVLink 
            data={csvData}
            filename={`services-${new Date().toISOString().split('T')[0]}.csv`}
            className="inline-flex"
          >
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CSVLink>
          <Button 
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]"></div>
              </div>
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {searchTerm ? "No services found matching your search." : "No services found. Add your first service to get started."}
          </div>
        ) : (
          filteredServices.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              onEdit={handleEdit}
              onDelete={deleteService}
            />
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-lg max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>
          <ServiceForm
            onSubmit={handleSubmit}
            onCancel={handleCloseDialog}
            initialData={editingService || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
