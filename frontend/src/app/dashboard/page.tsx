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
import {
  Building2,
  Edit,
  FileText,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// Mock data
const companyData = {
  name: "TechCorp Solutions",
  industry: "Technology",
  description:
    "Leading provider of enterprise software solutions and digital transformation services.",
  logo: "/placeholder.svg?height=80&width=80",
  services: [
    "Software Development",
    "Cloud Services",
    "AI/ML Solutions",
    "Cybersecurity",
    "Data Analytics",
  ],
};

const stats = [
  {
    title: "Active Tenders",
    value: "12",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Applications Sent",
    value: "8",
    icon: Briefcase,
    color: "text-green-600",
  },
  {
    title: "Companies Found",
    value: "156",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Success Rate",
    value: "75%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {companyData.name}!
        </h1>
        <p className="text-primary-foreground/90">
          Manage your tenders, explore opportunities, and grow your business
          network.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Company Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Profile
              </CardTitle>
              <CardDescription>
                Manage your company information and services
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/profile/edit">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={companyData.logo || "/placeholder.svg"}
                alt={companyData.name}
              />
              <AvatarFallback className="text-lg">
                {companyData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{companyData.name}</h3>
              <p className="text-muted-foreground mb-2">
                {companyData.industry}
              </p>
              <p className="text-sm">{companyData.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Services & Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {companyData.services.map((service) => (
                <Badge key={service} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/dashboard/create-tender">
                <FileText className="h-4 w-4 mr-2" />
                Create New Tender
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <Link href="/dashboard/tenders">
                <Briefcase className="h-4 w-4 mr-2" />
                Browse Available Tenders
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <Link href="/dashboard/companies">
                <Users className="h-4 w-4 mr-2" />
                Explore Companies
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest tender activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>Applied to "Cloud Infrastructure Setup"</span>
                <span className="text-muted-foreground ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span>Created tender "Mobile App Development"</span>
                <span className="text-muted-foreground ml-auto">1d ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <span>Received 3 new applications</span>
                <span className="text-muted-foreground ml-auto">2d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
