"use client";

import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Users,
  Star,
  ArrowLeft,
  CalendarIcon,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

// Mock data - in real app, fetch based on ID
const companyData = {
  id: 1,
  name: "TechCorp Solutions",
  industry: "Technology",
  location: "San Francisco, CA",
  description:
    "TechCorp Solutions is a leading provider of enterprise software solutions and digital transformation services. Founded in 2015, we have grown to become a trusted partner for businesses looking to modernize their operations and leverage cutting-edge technology to drive growth and efficiency.",
  logo: "/placeholder.svg?height=100&width=100",
  services: [
    "Software Development",
    "Cloud Services",
    "AI/ML Solutions",
    "Cybersecurity",
    "Data Analytics",
    "Mobile Development",
  ],
  employees: "500-1000",
  founded: "2015",
  website: "www.techcorp-solutions.com",
  rating: 4.8,
  reviews: 127,
  activeTenders: [
    {
      id: 1,
      title: "Enterprise CRM System Development",
      deadline: "2024-02-25",
      budget: 150000,
      applications: 8,
    },
    {
      id: 2,
      title: "Cloud Infrastructure Optimization",
      deadline: "2024-03-10",
      budget: 85000,
      applications: 12,
    },
    {
      id: 3,
      title: "Mobile App Security Audit",
      deadline: "2024-02-18",
      budget: 35000,
      applications: 6,
    },
  ],
  completedProjects: 156,
  clientSatisfaction: 96,
};

export default function CompanyProfilePage() {
  const params = useParams();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/dashboard/companies">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Companies
        </Link>
      </Button>

      {/* Company Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={companyData.logo || "/placeholder.svg"}
                alt={companyData.name}
              />
              <AvatarFallback className="text-2xl">
                {companyData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {companyData.name}
                  </h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>{companyData.industry}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{companyData.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{companyData.employees} employees</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{companyData.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({companyData.reviews} reviews)
                    </span>
                  </div>
                </div>
                <Button>Contact Company</Button>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {companyData.description}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Company Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services & Expertise</CardTitle>
              <CardDescription>
                Core services and areas of specialization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {companyData.services.map((service) => (
                  <Badge key={service} variant="secondary" className="text-sm">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Tenders */}
          <Card>
            <CardHeader>
              <CardTitle>
                Active Tenders ({companyData.activeTenders.length})
              </CardTitle>
              <CardDescription>
                Current tender opportunities posted by this company
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companyData.activeTenders.map((tender) => (
                  <div key={tender.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{tender.title}</h4>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-green-600" />
                        <span>{formatCurrency(tender.budget)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3 text-blue-600" />
                        <span>Due {formatDate(tender.deadline)}</span>
                      </div>
                      <span>{tender.applications} applications</span>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/dashboard/tenders/${tender.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Company Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Founded</span>
                <span className="font-medium">{companyData.founded}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Completed Projects
                </span>
                <span className="font-medium">
                  {companyData.completedProjects}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Client Satisfaction
                </span>
                <span className="font-medium">
                  {companyData.clientSatisfaction}%
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Tenders</span>
                <span className="font-medium">
                  {companyData.activeTenders.length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Website</span>
                <p className="font-medium">{companyData.website}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Location</span>
                <p className="font-medium">{companyData.location}</p>
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
