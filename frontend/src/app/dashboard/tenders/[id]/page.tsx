"use client";

import { useEffect, useState } from "react";
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
  CalendarIcon,
  DollarSign,
  Building2,
  Users,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { ApplyTenderModal } from "@/components/apply-tender-modal";
import axios from "axios";
import { Tender } from "@/types/tender";

export default function TenderDetailPage() {
  const params = useParams();
  const tenderId = params.id;
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [tenderData, setTenderData] = useState<Tender>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getTenderDetails = async () => {
      const res = await axios.get(`http://localhost:3001/tender/${tenderId}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      setTenderData(res.data);
    };
    getTenderDetails();
  }, []);
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
      month: "long",
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

  const daysLeft = tenderData ? getDaysUntilDeadline(tenderData.deadline) : 0;
  if (!tenderData) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/dashboard/tenders">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tenders
        </Link>
      </Button>

      {/* Tender Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={"globe.svg"}
                  // alt={tenderData.company}
                />
                <AvatarFallback>
                  {tenderData.creator_company
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl mb-2">
                  {tenderData.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium">
                    {tenderData.creator_company}
                  </span>
                  <span>•</span>
                  <span>Posted {formatDate(tenderData.posted)}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium">
                      {formatCurrency(tenderData.budget)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4 text-blue-600" />
                    <span>Due {formatDate(tenderData.deadline)}</span>
                  </div>
                </div>
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
              <Button
                onClick={() => setSelectedTender(tenderData)}
                disabled={daysLeft <= 0}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tender Description */}
      <Card>
        <CardHeader>
          <CardTitle>Project Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {tenderData.description.split("\n\n").map((paragraph, index) => (
              <div key={index} className="mb-4">
                {paragraph.startsWith("**") ? (
                  <div className="font-semibold text-lg mb-2">
                    {paragraph.replace(/\*\*/g, "")}
                  </div>
                ) : paragraph.startsWith("- ") ? (
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apply Modal */}
      <ApplyTenderModal
        tender={selectedTender}
        isOpen={!!selectedTender}
        onClose={() => setSelectedTender(null)}
      />
    </div>
  );
}
