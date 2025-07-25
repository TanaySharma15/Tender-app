"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Upload, X, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Company } from "@/types/company";
import axios from "axios";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Construction",
  "Transportation",
  "Energy",
  "Media & Entertainment",
  "Real Estate",
  "Consulting",
  "Other",
];

const employeeSizes = [
  "1-10",
  "11-50",
  "51-100",
  "101-250",
  "251-500",
  "501-1000",
  "1000+",
];

export default function EditProfilePage() {
  const [formData, setFormData] = useState<Company>({
    id: "",
    name: "",
    website: "",
    logo: "",
    services: [],
    industry: "",
    location: "",
    description: "",
    employees: "",
    founded: "",
  });

  const [newService, setNewService] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | undefined>();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (field: keyof Company, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large. Maximum 5MB allowed.");
      return;
    }

    setLogoFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addService = () => {
    const trimmed = newService.trim();
    if (trimmed && !formData.services?.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        services: [...(prev.services || []), trimmed],
      }));
      setNewService("");
    }
  };

  const removeService = (serviceToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      services: (prev.services || []).filter(
        (service) => service !== serviceToRemove
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token");

    try {
      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();

      // Append all form fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("industry", formData.industry);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("services", JSON.stringify(formData.services));
      formDataToSend.append("employees", formData.employees);
      formDataToSend.append("founded", formData.founded);
      formDataToSend.append("website", formData.website);

      // Append image if selected
      if (logoFile) {
        formDataToSend.append("image", logoFile);
      }

      const res = await axios.post(
        "http://localhost:3001/company/create",
        formDataToSend,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Company created successfully:", res.data);

      // Redirect to dashboard or company profile
      router.push("/dashboard");
    } catch (err) {
      console.error("Submission error:", err);

      // Handle specific error messages
      if (axios.isAxiosError(err) && err.response) {
        alert(err.response.data.message || "Failed to create company");
      } else {
        alert("An error occurred while creating the company");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/dashboard">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold">Create Company Profile</h1>
        <p className="text-muted-foreground">
          Add your company information and services
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Logo
            </CardTitle>
            <CardDescription>
              Upload your company logo (recommended size: 200x200px)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={logoPreview || "/placeholder.svg"}
                  alt="Company logo"
                />
                <AvatarFallback className="text-2xl">
                  {formData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Upload New Logo</span>
                  </div>
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </Label>
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, GIF (max 5MB)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Add your company's basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name *</Label>
                <Input
                  id="company-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://www.yourcompany.com"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    handleInputChange("industry", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees">Company Size *</Label>
                <Select
                  value={formData.employees}
                  onValueChange={(value) =>
                    handleInputChange("employees", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="City, State/Country"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="founded">Founded Year *</Label>
                <Input
                  id="founded"
                  value={formData.founded}
                  onChange={(e) => handleInputChange("founded", e.target.value)}
                  placeholder="2015"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe your company, mission, and what makes you unique..."
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Services & Expertise */}
        <Card>
          <CardHeader>
            <CardTitle>Services & Expertise *</CardTitle>
            <CardDescription>
              Add the services and areas of expertise your company offers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Add a service or expertise area..."
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addService())
                }
              />
              <Button type="button" onClick={addService} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.services.map((service) => (
                <Badge key={service} variant="secondary" className="text-sm">
                  {service}
                  <button
                    type="button"
                    onClick={() => removeService(service)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            {formData.services.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No services added yet. Add at least one service to help other
                companies find you.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading || formData.services.length === 0}
                className="flex-1"
              >
                {isLoading ? "Creating Company..." : "Create Company"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Complete profiles receive 3x more tender invitations</li>
            <li>• Add specific services to improve search visibility</li>
            <li>• Upload a professional logo to build trust</li>
            <li>• Keep your description concise but comprehensive</li>
            <li>• Update your profile regularly to stay relevant</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
