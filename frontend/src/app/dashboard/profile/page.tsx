"use client";

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
  Edit,
  MapPin,
  Users,
  Calendar,
  Globe,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

// Mock company data
const companyData = {
  name: "TechCorp Solutions",
  industry: "Technology",
  description:
    "Leading provider of enterprise software solutions and digital transformation services. We specialize in helping businesses modernize their operations and leverage cutting-edge technology to drive growth and efficiency.",
  logo: "/placeholder.svg?height=100&width=100",
  services: [
    "Software Development",
    "Cloud Services",
    "AI/ML Solutions",
    "Cybersecurity",
    "Data Analytics",
  ],
  website: "www.techcorp-solutions.com",
  location: "San Francisco, CA",
  employees: "500-1000",
  founded: "2015",
  completedProjects: 156,
  activeTenders: 3,
  successRate: 85,
};

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/dashboard">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Company Profile</h1>
          <p className="text-muted-foreground">
            View and manage your company information
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/profile/edit">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Link>
        </Button>
      </div>

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
              <h2 className="text-2xl font-bold mb-2">{companyData.name}</h2>
              <div className="flex items-center gap-4 text-muted-foreground mb-3">
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
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Founded {companyData.founded}</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {companyData.description}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services & Expertise</CardTitle>
              <CardDescription>
                Areas of specialization and core services
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

          {/* Company Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Key performance indicators and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {companyData.completedProjects}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Completed Projects
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {companyData.successRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Success Rate
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {companyData.activeTenders}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Tenders
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </div>
                <p className="font-medium">{companyData.website}</p>
              </div>
              <Separator />
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </div>
                <p className="font-medium">{companyData.location}</p>
              </div>
              <Separator />
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span>Company Size</span>
                </div>
                <p className="font-medium">{companyData.employees} employees</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/dashboard/profile/edit">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Link href="/dashboard/my-tenders">
                  <Building2 className="h-4 w-4 mr-2" />
                  View My Tenders
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
