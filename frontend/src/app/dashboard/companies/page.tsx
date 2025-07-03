"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Building2, MapPin, Users } from "lucide-react";
import Link from "next/link";

// Mock data
const companies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Technology",
    location: "San Francisco, CA",
    description:
      "Leading provider of enterprise software solutions and digital transformation services.",
    logo: "/placeholder.svg?height=60&width=60",
    services: [
      "Software Development",
      "Cloud Services",
      "AI/ML Solutions",
      "Cybersecurity",
    ],
    employees: "500-1000",
    activeTenders: 3,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Creative Design Studio",
    industry: "Design & Marketing",
    location: "New York, NY",
    description:
      "Award-winning design agency specializing in brand identity, web design, and digital marketing.",
    logo: "/placeholder.svg?height=60&width=60",
    services: [
      "UI/UX Design",
      "Brand Identity",
      "Digital Marketing",
      "Web Design",
    ],
    employees: "50-100",
    activeTenders: 1,
    rating: 4.9,
  },
  {
    id: 3,
    name: "DataAnalytics Pro",
    industry: "Data & Analytics",
    location: "Austin, TX",
    description:
      "Specialized in big data analytics, business intelligence, and machine learning solutions.",
    logo: "/placeholder.svg?height=60&width=60",
    services: [
      "Data Analytics",
      "Business Intelligence",
      "Machine Learning",
      "Data Visualization",
    ],
    employees: "100-250",
    activeTenders: 2,
    rating: 4.7,
  },
  {
    id: 4,
    name: "CloudFirst Infrastructure",
    industry: "Cloud Computing",
    location: "Seattle, WA",
    description:
      "Cloud infrastructure specialists helping businesses migrate and optimize their cloud operations.",
    logo: "/placeholder.svg?height=60&width=60",
    services: [
      "Cloud Migration",
      "DevOps",
      "Infrastructure Management",
      "Security",
    ],
    employees: "250-500",
    activeTenders: 4,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Mobile Innovations Inc",
    industry: "Mobile Development",
    location: "Los Angeles, CA",
    description:
      "Mobile app development company creating innovative iOS and Android applications.",
    logo: "/placeholder.svg?height=60&width=60",
    services: [
      "iOS Development",
      "Android Development",
      "React Native",
      "Flutter",
    ],
    employees: "25-50",
    activeTenders: 1,
    rating: 4.8,
  },
  {
    id: 6,
    name: "SecureNet Cybersecurity",
    industry: "Cybersecurity",
    location: "Boston, MA",
    description:
      "Comprehensive cybersecurity solutions for enterprises and government organizations.",
    logo: "/placeholder.svg?height=60&width=60",
    services: [
      "Penetration Testing",
      "Security Audits",
      "Compliance",
      "Incident Response",
    ],
    employees: "100-250",
    activeTenders: 2,
    rating: 4.9,
  },
];

const industries = [
  "All Industries",
  "Technology",
  "Design & Marketing",
  "Data & Analytics",
  "Cloud Computing",
  "Mobile Development",
  "Cybersecurity",
];

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesIndustry =
      selectedIndustry === "All Industries" ||
      company.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Directory</h1>
        <p className="text-muted-foreground">
          Discover and connect with companies across various industries
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search companies by name, industry, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedIndustry}
              onValueChange={setSelectedIndustry}
            >
              <SelectTrigger className="w-full md:w-[200px]">
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
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCompanies.length} companies
        </p>
      </div>

      {/* Company Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                  />
                  <AvatarFallback>
                    {company.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg mb-1 truncate">
                    {company.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Building2 className="h-3 w-3" />
                    <span>{company.industry}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{company.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 line-clamp-2">
                {company.description}
              </CardDescription>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Services</h4>
                  <div className="flex flex-wrap gap-1">
                    {company.services.slice(0, 3).map((service) => (
                      <Badge
                        key={service}
                        variant="secondary"
                        className="text-xs"
                      >
                        {service}
                      </Badge>
                    ))}
                    {company.services.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{company.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{company.employees} employees</span>
                  </div>
                  <span>{company.activeTenders} active tenders</span>
                </div>

                <Button asChild className="w-full" size="sm">
                  <Link href={`/dashboard/companies/${company.id}`}>
                    View Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No companies found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more companies.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
