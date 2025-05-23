import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import {
  PlusCircle,
  Stethoscope,
  BarChart,
  PieChart,
  Users,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SearchableSelect from "@/components/ui/searchable-select";

interface Service {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  rate: number;
  chargeType: "fixed" | "hourly" | "daily" | "per_visit";
  taxable: boolean;
  status: "active" | "inactive";
}

const ServiceForm = () => {
  const { toast } = useToast();
  const [showUsageModal, setShowUsageModal] = useState(false);

  // Mock data for service categories
  const serviceCategories = [
    { id: "diagnostic", name: "Diagnostic" },
    { id: "therapeutic", name: "Therapeutic" },
    { id: "surgical", name: "Surgical" },
    { id: "consultation", name: "Consultation" },
    { id: "nursing", name: "Nursing" },
    { id: "laboratory", name: "Laboratory" },
    { id: "radiology", name: "Radiology" },
    { id: "pharmacy", name: "Pharmacy" },
    { id: "physiotherapy", name: "Physiotherapy" },
    { id: "ambulance", name: "Ambulance" },
    { id: "test", name: "Test" },
  ];

  // Mock data for charge types
  const chargeTypes = [
    { id: "fixed", name: "Fixed" },
    { id: "hourly", name: "Hourly" },
    { id: "daily", name: "Daily" },
    { id: "per_visit", name: "Per Visit" },
  ];

  const [services, setServices] = useState<Service[]>([
    {
      id: "service-1",
      name: "Doctor Consultation",
      code: "CONS-001",
      category: "Consultation",
      description: "Consultation with specialist doctor",
      rate: 1000,
      chargeType: "per_visit",
      taxable: true,
      status: "active",
    },
    {
      id: "service-2",
      name: "Blood Test - Complete Blood Count",
      code: "LAB-001",
      category: "Laboratory",
      description: "Complete blood count analysis",
      rate: 500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-3",
      name: "X-Ray - Chest",
      code: "RAD-001",
      category: "Radiology",
      description: "Chest X-Ray",
      rate: 1200,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-4",
      name: "Nursing Care",
      code: "NUR-001",
      category: "Nursing",
      description: "Regular nursing care",
      rate: 800,
      chargeType: "daily",
      taxable: true,
      status: "active",
    },
    {
      id: "service-5",
      name: "Oxygen Therapy",
      code: "THER-001",
      category: "Therapeutic",
      description: "Oxygen therapy for respiratory support",
      rate: 300,
      chargeType: "hourly",
      taxable: true,
      status: "active",
    },
    {
      id: "service-6",
      name: "Physiotherapy Session",
      code: "PHY-001",
      category: "Physiotherapy",
      description: "Physiotherapy session with specialist",
      rate: 800,
      chargeType: "per_visit",
      taxable: true,
      status: "active",
    },
    {
      id: "service-7",
      name: "Ambulance Service",
      code: "AMB-001",
      category: "Ambulance",
      description: "Emergency ambulance service",
      rate: 1500,
      chargeType: "fixed",
      taxable: false,
      status: "active",
    },
    {
      id: "service-8",
      name: "Complete Blood Count",
      code: "TEST-001",
      category: "Test",
      description: "Complete blood count test",
      rate: 500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-9",
      name: "Blood Glucose",
      code: "TEST-002",
      category: "Test",
      description: "Blood glucose test",
      rate: 300,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-10",
      name: "Liver Function Test",
      code: "TEST-003",
      category: "Test",
      description: "Liver function test panel",
      rate: 800,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-11",
      name: "Kidney Function Test",
      code: "TEST-004",
      category: "Test",
      description: "Kidney function test panel",
      rate: 900,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-12",
      name: "Thyroid Profile",
      code: "TEST-005",
      category: "Test",
      description: "Thyroid hormone panel",
      rate: 1200,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-13",
      name: "Lipid Profile",
      code: "TEST-006",
      category: "Test",
      description: "Lipid profile test",
      rate: 700,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-14",
      name: "Urine Analysis",
      code: "TEST-007",
      category: "Test",
      description: "Complete urine analysis",
      rate: 400,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-15",
      name: "ECG",
      code: "TEST-008",
      category: "Test",
      description: "Electrocardiogram",
      rate: 600,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-16",
      name: "X-Ray",
      code: "TEST-009",
      category: "Test",
      description: "X-Ray imaging",
      rate: 1000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-17",
      name: "Ultrasound",
      code: "TEST-010",
      category: "Test",
      description: "Ultrasound imaging",
      rate: 1500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-18",
      name: "CT Scan",
      code: "TEST-011",
      category: "Test",
      description: "Computed Tomography scan",
      rate: 5000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-19",
      name: "MRI",
      code: "TEST-012",
      category: "Test",
      description: "Magnetic Resonance Imaging",
      rate: 8000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-20",
      name: "Biopsy",
      code: "TEST-013",
      category: "Test",
      description: "Tissue biopsy and analysis",
      rate: 3000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-21",
      name: "Endoscopy",
      code: "TEST-014",
      category: "Test",
      description: "Endoscopic examination",
      rate: 4000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-22",
      name: "Colonoscopy",
      code: "TEST-015",
      category: "Test",
      description: "Colonoscopic examination",
      rate: 4500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-23",
      name: "Allergy Test",
      code: "TEST-016",
      category: "Test",
      description: "Allergy panel testing",
      rate: 2000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-24",
      name: "Hormone Panel",
      code: "TEST-017",
      category: "Test",
      description: "Comprehensive hormone panel",
      rate: 3500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-25",
      name: "Vitamin D Test",
      code: "TEST-018",
      category: "Test",
      description: "Vitamin D level test",
      rate: 1200,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-26",
      name: "COVID-19 Test",
      code: "TEST-019",
      category: "Test",
      description: "COVID-19 RT-PCR test",
      rate: 1800,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-27",
      name: "Dengue Test",
      code: "TEST-020",
      category: "Test",
      description: "Dengue NS1 and antibody test",
      rate: 1000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-28",
      name: "Malaria Test",
      code: "TEST-021",
      category: "Test",
      description: "Malaria parasite detection",
      rate: 600,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-29",
      name: "Typhoid Test",
      code: "TEST-022",
      category: "Test",
      description: "Typhoid antibody test",
      rate: 500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-30",
      name: "HbA1c",
      code: "TEST-023",
      category: "Test",
      description: "Glycated hemoglobin test",
      rate: 800,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-31",
      name: "Cardiac Markers",
      code: "TEST-024",
      category: "Test",
      description: "Cardiac enzyme panel",
      rate: 2500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-32",
      name: "Stool Examination",
      code: "TEST-025",
      category: "Test",
      description: "Complete stool analysis",
      rate: 400,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-33",
      name: "Sputum Culture",
      code: "TEST-026",
      category: "Test",
      description: "Sputum culture and sensitivity",
      rate: 900,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-34",
      name: "Blood Culture",
      code: "TEST-027",
      category: "Test",
      description: "Blood culture and sensitivity",
      rate: 1200,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-35",
      name: "Urine Culture",
      code: "TEST-028",
      category: "Test",
      description: "Urine culture and sensitivity",
      rate: 800,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-36",
      name: "Wound Culture",
      code: "TEST-029",
      category: "Test",
      description: "Wound culture and sensitivity",
      rate: 1000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-37",
      name: "Bone Density Test",
      code: "TEST-030",
      category: "Test",
      description: "Bone mineral density test",
      rate: 2000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-38",
      name: "Mammography",
      code: "TEST-031",
      category: "Test",
      description: "Breast imaging",
      rate: 2500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-39",
      name: "Pap Smear",
      code: "TEST-032",
      category: "Test",
      description: "Cervical cancer screening",
      rate: 1500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-40",
      name: "PSA Test",
      code: "TEST-033",
      category: "Test",
      description: "Prostate-specific antigen test",
      rate: 1200,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-41",
      name: "Spirometry",
      code: "TEST-034",
      category: "Test",
      description: "Lung function test",
      rate: 1000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-42",
      name: "EEG",
      code: "TEST-035",
      category: "Test",
      description: "Electroencephalogram",
      rate: 3000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-43",
      name: "EMG",
      code: "TEST-036",
      category: "Test",
      description: "Electromyography",
      rate: 3500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-44",
      name: "Audiometry",
      code: "TEST-037",
      category: "Test",
      description: "Hearing test",
      rate: 800,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-45",
      name: "Vision Test",
      code: "TEST-038",
      category: "Test",
      description: "Comprehensive vision assessment",
      rate: 600,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-46",
      name: "Stress Test",
      code: "TEST-039",
      category: "Test",
      description: "Cardiac stress test",
      rate: 3000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-47",
      name: "Holter Monitoring",
      code: "TEST-040",
      category: "Test",
      description: "24-hour ECG monitoring",
      rate: 2500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-48",
      name: "Genetic Testing",
      code: "TEST-041",
      category: "Test",
      description: "Basic genetic screening",
      rate: 10000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-49",
      name: "Histopathology",
      code: "TEST-042",
      category: "Test",
      description: "Tissue sample analysis",
      rate: 2000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-50",
      name: "Cytology",
      code: "TEST-043",
      category: "Test",
      description: "Cell sample analysis",
      rate: 1800,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-51",
      name: "Immunology Panel",
      code: "TEST-044",
      category: "Test",
      description: "Comprehensive immunology testing",
      rate: 3500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-52",
      name: "Microbiology Culture",
      code: "TEST-045",
      category: "Test",
      description: "General microbiology culture",
      rate: 1000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-53",
      name: "Coagulation Profile",
      code: "TEST-046",
      category: "Test",
      description: "Blood clotting factors analysis",
      rate: 1500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-54",
      name: "Electrolyte Panel",
      code: "TEST-047",
      category: "Test",
      description: "Blood electrolyte measurement",
      rate: 600,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-55",
      name: "Arterial Blood Gas",
      code: "TEST-048",
      category: "Test",
      description: "ABG analysis",
      rate: 1200,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-56",
      name: "Toxicology Screen",
      code: "TEST-049",
      category: "Test",
      description: "Drug and toxin screening",
      rate: 2500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-57",
      name: "Pregnancy Test",
      code: "TEST-050",
      category: "Test",
      description: "HCG blood test",
      rate: 500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-58",
      name: "Fertility Panel",
      code: "TEST-051",
      category: "Test",
      description: "Comprehensive fertility testing",
      rate: 5000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-59",
      name: "Tumor Markers",
      code: "TEST-052",
      category: "Test",
      description: "Cancer marker panel",
      rate: 4000,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
    {
      id: "service-60",
      name: "Anemia Panel",
      code: "TEST-053",
      category: "Test",
      description: "Comprehensive anemia testing",
      rate: 1500,
      chargeType: "fixed",
      taxable: true,
      status: "active",
    },
  ]);

  const columns = [
    {
      header: "Service Name",
      accessorKey: "name" as keyof Service,
      cellType: "text" as const,
      required: true,
    },
    {
      header: "Code",
      accessorKey: "code" as keyof Service,
      cellType: "text" as const,
      required: true,
    },
    {
      header: "Category",
      accessorKey: "category" as keyof Service,
      cellType: "dropdown" as const,
      required: true,
      cell: (item: Service) => {
        return (
          <SearchableSelect
            label=""
            options={serviceCategories}
            value={
              serviceCategories.find((sc) => sc.name === item.category)?.id ||
              ""
            }
            onValueChange={(value) => {
              // This would be handled by the DataTable component
              console.log("Category changed to", value);
            }}
            placeholder="Select Category"
            showSelectedLabel={true}
          />
        );
      },
    },
    {
      header: "Rate (₹)",
      accessorKey: "rate" as keyof Service,
      cellType: "number" as const,
      required: true,
      cell: (item: Service) => {
        return <span>₹{item.rate.toLocaleString()}</span>;
      },
    },
    {
      header: "Charge Type",
      accessorKey: "chargeType" as keyof Service,
      cellType: "dropdown" as const,
      required: true,
      cell: (item: Service) => {
        return (
          <SearchableSelect
            label=""
            options={chargeTypes}
            value={item.chargeType}
            onValueChange={(value) => {
              // This would be handled by the DataTable component
              console.log("Charge type changed to", value);
            }}
            placeholder="Select Charge Type"
            showSelectedLabel={true}
          />
        );
      },
    },
    {
      header: "Taxable",
      accessorKey: "taxable" as keyof Service,
      cellType: "checkbox" as const,
      required: true,
    },
    {
      header: "Status",
      accessorKey: "status" as keyof Service,
      cellType: "text" as const,
      required: true,
      cell: (item: Service) => {
        const statusColors = {
          active:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
          inactive:
            "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400",
        };
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[item.status]}`}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
        );
      },
    },
    {
      header: "Description",
      accessorKey: "description" as keyof Service,
      cellType: "text" as const,
    },
  ];

  const handleSave = (updatedServices: Service[]) => {
    setServices(updatedServices);
    toast({
      title: "Success",
      description: "Services updated successfully",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-7xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Service Management
          </h1>
          <p className="text-muted-foreground">
            Define and manage hospital services and their rates
          </p>
        </div>
        <Button onClick={() => setShowUsageModal(true)}>
          <Stethoscope className="mr-2 h-4 w-4" />
          View Service Usage
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PlusCircle className="mr-2 h-5 w-5" />
            Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={services}
            columns={columns}
            onSave={handleSave}
            isSearchable={true}
            isSortable={true}
            addButtonText="Add Service"
          />
        </CardContent>
      </Card>

      {/* Service Usage Modal */}
      <Dialog open={showUsageModal} onOpenChange={setShowUsageModal}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Service Usage Analytics</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Tabs defaultValue="usage" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="usage">Usage Statistics</TabsTrigger>
                <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
                <TabsTrigger value="trends">Usage Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="usage" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <PieChart className="h-5 w-5 mr-2" />
                        Service Usage by Category
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center">
                        <div className="w-64 h-64 rounded-full border-8 border-gray-100 relative">
                          {/* Mock pie chart segments */}
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500 origin-bottom-right rotate-0"></div>
                            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500 origin-bottom-left rotate-0"></div>
                            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-amber-500 origin-top-right rotate-0"></div>
                            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500 origin-top-left rotate-0"></div>
                            <div className="absolute inset-0 flex items-center justify-center rounded-full w-32 h-32 m-auto bg-white">
                              <span className="text-sm font-medium">
                                Total: 1,245
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-sm">Consultation (32%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm">Laboratory (28%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                          <span className="text-sm">Nursing (25%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                          <span className="text-sm">Others (15%)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <BarChart className="h-5 w-5 mr-2" />
                        Top 5 Most Used Services
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Doctor Consultation</span>
                            <span>398 uses</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                              className="bg-blue-500 h-2.5 rounded-full"
                              style={{ width: "100%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Blood Test - CBC</span>
                            <span>312 uses</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                              className="bg-blue-500 h-2.5 rounded-full"
                              style={{ width: "78%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Nursing Care</span>
                            <span>287 uses</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                              className="bg-blue-500 h-2.5 rounded-full"
                              style={{ width: "72%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>X-Ray - Chest</span>
                            <span>156 uses</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                              className="bg-blue-500 h-2.5 rounded-full"
                              style={{ width: "39%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Physiotherapy Session</span>
                            <span>92 uses</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                              className="bg-blue-500 h-2.5 rounded-full"
                              style={{ width: "23%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="revenue" className="w-full">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Revenue by Service Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 relative">
                      {/* Mock bar chart */}
                      <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-around">
                        <div className="w-16 bg-blue-500 h-[60%] rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ₹480,000
                          </div>
                          <div className="absolute -bottom-6 w-full text-center text-xs">
                            Consultation
                          </div>
                        </div>
                        <div className="w-16 bg-green-500 h-[75%] rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ₹600,000
                          </div>
                          <div className="absolute -bottom-6 w-full text-center text-xs">
                            Laboratory
                          </div>
                        </div>
                        <div className="w-16 bg-amber-500 h-[45%] rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-amber-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ₹360,000
                          </div>
                          <div className="absolute -bottom-6 w-full text-center text-xs">
                            Radiology
                          </div>
                        </div>
                        <div className="w-16 bg-purple-500 h-[90%] rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ₹720,000
                          </div>
                          <div className="absolute -bottom-6 w-full text-center text-xs">
                            Surgery
                          </div>
                        </div>
                        <div className="w-16 bg-red-500 h-[30%] rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ₹240,000
                          </div>
                          <div className="absolute -bottom-6 w-full text-center text-xs">
                            Nursing
                          </div>
                        </div>
                        <div className="w-16 bg-indigo-500 h-[20%] rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ₹160,000
                          </div>
                          <div className="absolute -bottom-6 w-full text-center text-xs">
                            Others
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="w-full">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Monthly Usage Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 relative">
                      {/* Mock line chart */}
                      <div className="absolute inset-0">
                        <svg viewBox="0 0 400 200" className="w-full h-full">
                          {/* Grid lines */}
                          <line
                            x1="0"
                            y1="0"
                            x2="400"
                            y2="0"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1="50"
                            x2="400"
                            y2="50"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1="100"
                            x2="400"
                            y2="100"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1="150"
                            x2="400"
                            y2="150"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1="200"
                            x2="400"
                            y2="200"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />

                          {/* Line for Consultation */}
                          <polyline
                            points="0,150 66,130 133,100 200,80 266,60 333,40 400,30"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                          />

                          {/* Line for Laboratory */}
                          <polyline
                            points="0,160 66,150 133,140 200,120 266,100 333,90 400,70"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                          />

                          {/* Line for Nursing */}
                          <polyline
                            points="0,140 66,145 133,130 200,135 266,120 333,110 400,100"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm">Consultation</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Laboratory</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                        <span className="text-sm">Nursing</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceForm;
