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
import { CalendarIcon, DollarSign, Search, Building2 } from "lucide-react";
import Link from "next/link";
import { ApplyTenderModal } from "@/components/apply-tender-modal";

// Mock data
const tenders = [
  {
    id: 1,
    title: "E-commerce Website Development",
    company: "RetailCorp Inc.",
    description:
      "Looking for a full-stack development team to build a modern e-commerce platform with payment integration, inventory management, and mobile responsiveness.",
    deadline: "2024-02-15",
    budget: 75000,
    applicants: 12,
    posted: "2024-01-10",
  },
  {
    id: 2,
    title: "Cloud Infrastructure Migration",
    company: "DataTech Solutions",
    description:
      "Need experienced cloud architects to migrate our on-premise infrastructure to AWS. Must have expertise in containerization and microservices.",
    deadline: "2024-02-20",
    budget: 120000,
    applicants: 8,
    posted: "2024-01-12",
  },
  {
    id: 3,
    title: "Mobile App UI/UX Design",
    company: "StartupXYZ",
    description:
      "Seeking creative designers to create intuitive mobile app interfaces for our fintech application. Experience with financial apps preferred.",
    deadline: "2024-02-10",
    budget: 25000,
    applicants: 15,
    posted: "2024-01-08",
  },
  {
    id: 4,
    title: "AI Chatbot Development",
    company: "CustomerFirst Ltd",
    description:
      "Develop an intelligent chatbot for customer service automation. Must integrate with existing CRM and support multiple languages.",
    deadline: "2024-02-25",
    budget: 45000,
    applicants: 6,
    posted: "2024-01-15",
  },
  {
    id: 5,
    title: "Cybersecurity Audit & Implementation",
    company: "SecureBank Corp",
    description:
      "Comprehensive security audit and implementation of security measures for our banking systems. Compliance with financial regulations required.",
    deadline: "2024-03-01",
    budget: 200000,
    applicants: 4,
    posted: "2024-01-18",
  },
  {
    id: 6,
    title: "Data Analytics Dashboard",
    company: "Analytics Pro",
    description:
      "Build interactive dashboards for business intelligence. Experience with D3.js, React, and real-time data visualization required.",
    deadline: "2024-02-18",
    budget: 35000,
    applicants: 9,
    posted: "2024-01-14",
  },
];

export default function TendersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTender, setSelectedTender] = useState<
    (typeof tenders)[0] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredTenders = tenders.filter(
    (tender) =>
      tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTenders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTenders = filteredTenders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Browse Tenders</h1>
        <p className="text-muted-foreground">
          Discover and apply to tender opportunities from companies worldwide
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tenders by title, company, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredTenders.length)} of{" "}
          {filteredTenders.length} tenders
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Tender Cards */}
      <div className="grid gap-6">
        {paginatedTenders.map((tender) => {
          const daysLeft = getDaysUntilDeadline(tender.deadline);
          return (
            <Card key={tender.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">
                      {tender.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Building2 className="h-4 w-4" />
                      <span>{tender.company}</span>
                      <span>•</span>
                      <span>Posted {formatDate(tender.posted)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant={
                        daysLeft <= 3
                          ? "destructive"
                          : daysLeft <= 7
                          ? "secondary"
                          : "default"
                      }
                    >
                      {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {tender.applicants} applicants
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">
                  {tender.description}
                </CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">
                        {formatCurrency(tender.budget)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4 text-blue-600" />
                      <span>Due {formatDate(tender.deadline)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/tenders/${tender.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setSelectedTender(tender)}
                      disabled={daysLeft <= 0}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTenders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tenders found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or check back later for new
              opportunities.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Apply Modal */}
      <ApplyTenderModal
        tender={selectedTender}
        isOpen={!!selectedTender}
        onClose={() => setSelectedTender(null)}
      />
    </div>
  );
}
