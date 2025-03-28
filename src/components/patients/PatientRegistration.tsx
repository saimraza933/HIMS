import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Patient } from "./types";
import {
  generateMRNumber,
  getLastMRNumber,
  saveLastMRNumber,
  getMRConfig,
} from "@/utils/mrNumberGenerator";
import { generateTokenNumber } from "@/utils/tokenGenerator";
import MRNumberSettings, {
  MRNumberConfig,
} from "@/components/settings/MRNumberSettings";
import TokenPrintModal from "./TokenPrintModal";
import ProfileImageUpload from "./ProfileImageUpload";
import PatientCard from "./PatientCard";
import GeneratePatientCardButton from "./GeneratePatientCardButton";

interface PatientRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (patient: Patient) => void;
}

const PatientRegistration: React.FC<PatientRegistrationProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<Patient>>({
    name: "",
    age: 0,
    ageUnit: "Years",
    gender: "",
    contact: "",
    address: "",
    bloodGroup: "",
    email: "",
    cnic: "",
    emergencyContact: "",
    guardianName: "",
    guardianRelation: "",
    guardianContact: "",
    patientType: [],
    profileImage: "",
    dateOfBirth: "",
  });

  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mrNumberSettingsOpen, setMRNumberSettingsOpen] =
    useState<boolean>(false);
  const [mrConfig, setMRConfig] = useState<MRNumberConfig>(getMRConfig());
  const [generatedMRNumber, setGeneratedMRNumber] = useState<string>("");
  const [tokenPrintModalOpen, setTokenPrintModalOpen] =
    useState<boolean>(false);
  const [tokenData, setTokenData] = useState<any>(null);
  const [patientCardOpen, setPatientCardOpen] = useState<boolean>(false);
  const [registeredPatient, setRegisteredPatient] = useState<Patient | null>(
    null,
  );

  // Generate MR number when component mounts
  useEffect(() => {
    const lastNumber = getLastMRNumber();
    const mrNumber = generateMRNumber(lastNumber);
    setGeneratedMRNumber(mrNumber);
  }, []);

  // Debug registered patient
  useEffect(() => {
    if (registeredPatient) {
      console.log("Registered patient:", registeredPatient);
    }
  }, [registeredPatient]);

  // Debug patient card modal state
  useEffect(() => {
    console.log("Patient card modal open:", patientCardOpen);
  }, [patientCardOpen]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age || formData.age <= 0)
      newErrors.age = "Valid age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.contact) newErrors.contact = "Contact number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (formData.patientType?.length === 0)
      newErrors.patientType = "Select at least one patient type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    // Use the generated MR Number
    const mrNumber = generatedMRNumber;

    // Generate token number
    const tokenNumber = generateTokenNumber();

    // Update the last MR number counter
    const lastNumber = getLastMRNumber();
    saveLastMRNumber(lastNumber + 1);

    const newPatient: Patient = {
      id: Date.now().toString(),
      mrNumber,
      name: formData.name || "",
      age: formData.age || 0,
      ageUnit: formData.ageUnit || "Years",
      gender: formData.gender || "",
      contact: formData.contact || "",
      address: formData.address || "",
      registrationDate: new Date().toISOString().split("T")[0],
      patientType: (formData.patientType as ("OPD" | "IPD")[]) || [],
      lastVisit: new Date().toISOString().split("T")[0],
      bloodGroup: formData.bloodGroup || "",
      email: formData.email,
      cnic: formData.cnic,
      emergencyContact: formData.emergencyContact,
      guardianName: formData.guardianName,
      guardianRelation: formData.guardianRelation,
      guardianContact: formData.guardianContact,
      insuranceProvider: formData.insuranceProvider,
      insuranceId: formData.insuranceId,
      allergies: formData.allergies,
      chronicDiseases: formData.chronicDiseases,
      notes: formData.notes,
      tokenNumber: tokenNumber,
      profileImage: formData.profileImage,
      dateOfBirth: formData.dateOfBirth,
    };

    // Prepare token data for printing
    const now = new Date();
    setTokenData({
      tokenNumber: tokenNumber,
      patientName: newPatient.name,
      mrNumber: newPatient.mrNumber,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    // Store the registered patient for the card
    setRegisteredPatient(newPatient);
    console.log("Setting registered patient:", newPatient);

    onSuccess(newPatient);

    // Show token print modal
    setTokenPrintModalOpen(true);
  };

  const handlePatientTypeChange = (type: "OPD" | "IPD") => {
    const currentTypes = formData.patientType || [];
    if (currentTypes.includes(type)) {
      setFormData({
        ...formData,
        patientType: currentTypes.filter((t) => t !== type),
      });
    } else {
      setFormData({
        ...formData,
        patientType: [...currentTypes, type],
      });
    }
  };

  const handleTokenModalClose = () => {
    setTokenPrintModalOpen(false);
    // Ensure we show the patient card after token modal is closed
    setTimeout(() => {
      setPatientCardOpen(true);
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Patient Registration</DialogTitle>
          <DialogDescription className="flex justify-between items-center">
            <span>Register a new patient and generate a unique MR number.</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMRNumberSettingsOpen(true)}
            >
              MR# Settings
            </Button>
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="grid gap-4 py-4">
            <div className="mb-4 p-3 bg-muted/50 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-sm text-muted-foreground">
                    MR Number
                  </Label>
                  <p className="font-medium">{generatedMRNumber}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Registration Date
                  </Label>
                  <p className="font-medium">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Token Number
                  </Label>
                  <p className="font-medium">
                    Will be generated on registration
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <ProfileImageUpload
                initialImage={formData.profileImage}
                onImageChange={(imageUrl) =>
                  setFormData({ ...formData, profileImage: imageUrl })
                }
                name={formData.name || ""}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className={errors.name ? "text-destructive" : ""}
                >
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC / ID Number</Label>
                <Input
                  id="cnic"
                  value={formData.cnic}
                  onChange={(e) =>
                    setFormData({ ...formData, cnic: e.target.value })
                  }
                  placeholder="00000-0000000-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dateOfBirth: e.target.value,
                    })
                  }
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="age"
                  className={errors.age ? "text-destructive" : ""}
                >
                  Age <span className="text-destructive">*</span>
                </Label>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input
                      id="age"
                      type="number"
                      value={formData.age || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          age: parseInt(e.target.value),
                        })
                      }
                      className={errors.age ? "border-destructive" : ""}
                    />
                  </div>
                  <Select
                    value={formData.ageUnit}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        ageUnit: value as "Years" | "Months",
                      })
                    }
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Years">Years</SelectItem>
                      <SelectItem value="Months">Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {errors.age && (
                  <p className="text-xs text-destructive">{errors.age}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="gender"
                  className={errors.gender ? "text-destructive" : ""}
                >
                  Gender <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                >
                  <SelectTrigger
                    id="gender"
                    className={errors.gender ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-xs text-destructive">{errors.gender}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="bloodGroup"
                  className={errors.bloodGroup ? "text-destructive" : ""}
                >
                  Blood Group <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.bloodGroup}
                  onValueChange={(value) =>
                    setFormData({ ...formData, bloodGroup: value })
                  }
                >
                  <SelectTrigger
                    id="bloodGroup"
                    className={errors.bloodGroup ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bloodGroup && (
                  <p className="text-xs text-destructive">
                    {errors.bloodGroup}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="contact"
                  className={errors.contact ? "text-destructive" : ""}
                >
                  Contact Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className={errors.contact ? "border-destructive" : ""}
                  placeholder="+92 300 1234567"
                />
                {errors.contact && (
                  <p className="text-xs text-destructive">{errors.contact}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="patient@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="address"
                className={errors.address ? "text-destructive" : ""}
              >
                Address <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className={errors.address ? "border-destructive" : ""}
                placeholder="Enter patient's full address"
              />
              {errors.address && (
                <p className="text-xs text-destructive">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className={errors.patientType ? "text-destructive" : ""}>
                Patient Type <span className="text-destructive">*</span>
              </Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="opd"
                    checked={formData.patientType?.includes("OPD")}
                    onCheckedChange={() => handlePatientTypeChange("OPD")}
                  />
                  <Label htmlFor="opd" className="font-normal">
                    OPD (Outpatient)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ipd"
                    checked={formData.patientType?.includes("IPD")}
                    onCheckedChange={() => handlePatientTypeChange("IPD")}
                  />
                  <Label htmlFor="ipd" className="font-normal">
                    IPD (Inpatient)
                  </Label>
                </div>
              </div>
              {errors.patientType && (
                <p className="text-xs text-destructive">{errors.patientType}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergencyContact: e.target.value,
                    })
                  }
                  placeholder="+92 300 1234567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianName">Guardian Name</Label>
                <Input
                  id="guardianName"
                  value={formData.guardianName}
                  onChange={(e) =>
                    setFormData({ ...formData, guardianName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardianRelation">Guardian Relation</Label>
                <Input
                  id="guardianRelation"
                  value={formData.guardianRelation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      guardianRelation: e.target.value,
                    })
                  }
                  placeholder="e.g., Father, Mother, Spouse"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianContact">Guardian Contact</Label>
                <Input
                  id="guardianContact"
                  value={formData.guardianContact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      guardianContact: e.target.value,
                    })
                  }
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      insuranceProvider: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceId">Insurance ID</Label>
                <Input
                  id="insuranceId"
                  value={formData.insuranceId}
                  onChange={(e) =>
                    setFormData({ ...formData, insuranceId: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies (if any)</Label>
              <Textarea
                id="allergies"
                value={formData.allergies?.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allergies: e.target.value.split(", "),
                  })
                }
                placeholder="List any allergies, separated by commas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chronicDiseases">Chronic Diseases (if any)</Label>
              <Textarea
                id="chronicDiseases"
                value={formData.chronicDiseases?.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    chronicDiseases: e.target.value.split(", "),
                  })
                }
                placeholder="List any chronic diseases, separated by commas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Any additional information about the patient"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          {step === 2 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="mr-auto"
            >
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit}>
              Register Patient
            </Button>
          )}
        </DialogFooter>
      </DialogContent>

      {/* MR Number Settings Modal */}
      {mrNumberSettingsOpen && (
        <MRNumberSettings
          isOpen={mrNumberSettingsOpen}
          onClose={() => setMRNumberSettingsOpen(false)}
          onSave={(newConfig) => {
            // Save the new configuration
            setMRConfig(newConfig);
            localStorage.setItem("mrNumberConfig", JSON.stringify(newConfig));

            // Regenerate MR number with new config
            const lastNumber = getLastMRNumber();
            const mrNumber = generateMRNumber(lastNumber);
            setGeneratedMRNumber(mrNumber);

            setMRNumberSettingsOpen(false);
          }}
          currentSettings={mrConfig}
        />
      )}

      {/* Token Print Modal */}
      {tokenPrintModalOpen && tokenData && (
        <TokenPrintModal
          isOpen={tokenPrintModalOpen}
          onClose={handleTokenModalClose}
          tokenData={tokenData}
        />
      )}

      {/* Direct Patient Card Button - For immediate access */}
      {registeredPatient && (
        <div className="fixed bottom-4 right-4 z-50">
          <GeneratePatientCardButton
            patient={registeredPatient}
            variant="secondary"
            className="shadow-lg"
          />
        </div>
      )}

      {/* Patient Card Modal */}
      {patientCardOpen && registeredPatient && (
        <Dialog
          open={patientCardOpen}
          onOpenChange={(open) => {
            setPatientCardOpen(open);
            if (!open) {
              onClose();
            }
          }}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Patient Identification Card</DialogTitle>
              <DialogDescription>
                Print this card for the patient to use for future visits
              </DialogDescription>
            </DialogHeader>
            <PatientCard
              patient={registeredPatient}
              onClose={() => setPatientCardOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default PatientRegistration;
