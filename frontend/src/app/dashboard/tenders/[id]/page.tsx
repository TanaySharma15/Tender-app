"use client";

import { useState } from "react";
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

// Mock data - in real app, fetch based on ID
const tenderData = {
  id: 1,
  title: "E-commerce Website Development",
  company: "RetailCorp Inc.",
  companyLogo: "/placeholder.svg?height=60&width=60",
  description: `We are seeking a skilled development team to build a comprehensive e-commerce platform that will serve as the foundation for our online retail operations. 

The project involves creating a modern, scalable web application with the following key requirements:

**Core Features:**
- User authentication and account management
- Product catalog with advanced search and filtering
- Shopping cart and checkout process
- Payment gateway integration (Stripe, PayPal)
- Order management system
- Inventory tracking and management
- Admin dashboard for content management

**Technical Requirements:**
- Responsive design for mobile and desktop
- SEO optimization
- Fast loading times and performance optimization
- Security best practices implementation
- Integration with third-party APIs
- Scalable architecture to handle growth

**Preferred Technologies:**
- Frontend: React.js or Next.js
- Backend: Node.js or Python
- Database: PostgreSQL or MongoDB
- Cloud hosting: AWS or Google Cloud

**Deliverables:**
- Complete source code with documentation
- Deployment on production environment
- User training and handover documentation
- 3 months of post-launch support`,
  deadline: "2024-02-15",
  budget: 75000,
  posted: "2024-01-10",
  status: "Active",
  applications: [
    {
      id: 1,
      company: "WebCraft Studios",
      logo: "/placeholder.svg?height=40&width=40",
      proposal:
        "We have extensive experience in e-commerce development with over 50 successful projects. Our team specializes in React/Node.js stack and can deliver a scalable solution within your timeline. We propose using Next.js for SEO benefits and implementing a microservices architecture for scalability.",
      appliedDate: "2024-01-12",
      experience: "5+ years",
    },
    {
      id: 2,
      company: "Digital Solutions Pro",
      logo: "/placeholder.svg?height=40&width=40",
      proposal:
        "Our team brings 8 years of e-commerce expertise with proven track record in payment integrations and inventory management systems. We suggest using a headless commerce approach with Shopify Plus backend and custom React frontend for maximum flexibility.",
      appliedDate: "2024-01-13",
      experience: "8+ years",
    },
    {
      id: 3,
      company: "TechForge Development",
      logo: "/placeholder.svg?height=40&width=40",
      proposal:
        "We specialize in high-performance e-commerce platforms using modern technologies. Our approach includes implementing advanced caching strategies, CDN integration, and progressive web app features to ensure optimal user experience and conversion rates.",
      appliedDate: "2024-01-14",
      experience: "6+ years",
    },
  ],
};

export default function TenderDetailPage() {
  const params = useParams();
  const [selectedTender, setSelectedTender] = useState<
    typeof tenderData | null
  >(null);

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

  const daysLeft = getDaysUntilDeadline(tenderData.deadline);

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
                  src={tenderData.companyLogo || "/placeholder.svg"}
                  alt={tenderData.company}
                />
                <AvatarFallback>
                  {tenderData.company
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
                  <span className="font-medium">{tenderData.company}</span>
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
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>{tenderData.applications.length} applications</span>
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

      {/* Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({tenderData.applications.length})</CardTitle>
          <CardDescription>
            Companies that have applied for this tender
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {tenderData.applications.map((application, index) => (
              <div key={application.id}>
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={application.logo || "/placeholder.svg"}
                      alt={application.company}
                    />
                    <AvatarFallback>
                      {application.company
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{application.company}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{application.experience} experience</span>
                        <span>
                          Applied {formatDate(application.appliedDate)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {application.proposal}
                    </p>
                  </div>
                </div>
                {index < tenderData.applications.length - 1 && (
                  <Separator className="mt-6" />
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
