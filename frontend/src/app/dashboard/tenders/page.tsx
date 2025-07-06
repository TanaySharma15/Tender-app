"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";
import { Tender } from "@/types/tender";

// Mock data

export default function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  useEffect(() => {
    const getAllTenders = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/tender/all", {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      setTenders(res.data.tenders);
    };
    getAllTenders();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTender, setSelectedTender] = useState<
    (typeof tenders)[0] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredTenders = tenders.filter(
    (tender) =>
      tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                      <span>{tender.company.name}</span>
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
      {/* <ApplyTenderModal
        tender={selectedTender}
        isOpen={!!selectedTender}
        onClose={() => setSelectedTender(null)}
      /> */}
    </div>
  );
}
