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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  DollarSign,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Users,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Tender } from "@/types/tender";

export default function MyTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);

  const [activeTenders, setActiveTenders] = useState(0);
  useEffect(() => {
    const getMyTenders = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/tender/my", {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      setActiveTenders(res.data.activeTendersCount);
      setTenders(res.data.tenders);
    };
    getMyTenders();
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

  const getStatusBadge = (status: string, deadline: string) => {
    if (status === "Draft") {
      return <Badge variant="secondary">Draft</Badge>;
    }
    if (status === "Closed") {
      return <Badge variant="outline">Closed</Badge>;
    }

    const daysLeft = getDaysUntilDeadline(deadline);
    if (daysLeft <= 0) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    if (daysLeft <= 3) {
      return <Badge variant="destructive">Closing Soon</Badge>;
    }
    return <Badge variant="default">Active</Badge>;
  };

  // const handleDelete = (id: number) => {
  //   if (confirm("Are you sure you want to delete this tender?")) {
  //     setTenders(tenders.filter((tender) => tender.id !== id));
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Tenders</h1>
          <p className="text-muted-foreground">
            Manage your posted tenders and track applications
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/create-tender">Create New Tender</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Tenders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTenders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tenders List */}
      <div className="space-y-4">
        {tenders.map((tender) => (
          <Card key={tender.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{tender.title}</CardTitle>
                    {getStatusBadge(tender.status, tender.deadline)}
                  </div>
                  <CardDescription className="mb-3">
                    {tender.description}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>{formatCurrency(tender.budget)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4 text-blue-600" />
                      <span>Due {formatDate(tender.deadline)}</span>
                    </div>
                    <span>Posted {formatDate(tender.updated_at)}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/tenders/${tender.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Tender
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      // onClick={() => handleDelete(tender.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {tenders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No tenders yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first tender to start receiving applications from
              companies.
            </p>
            <Button asChild>
              <Link href="/dashboard/create-tender">
                Create Your First Tender
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
