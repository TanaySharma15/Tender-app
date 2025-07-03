"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, DollarSign, Building2 } from "lucide-react";

interface Tender {
  id: number;
  title: string;
  company: string;
  deadline: string;
  budget: number;
}

interface ApplyTenderModalProps {
  tender: Tender | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyTenderModal({
  tender,
  isOpen,
  onClose,
}: ApplyTenderModalProps) {
  const [proposal, setProposal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!proposal.trim()) {
      alert("Please enter your proposal");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Application submitted successfully!");
      setProposal("");
      onClose();
    }, 1000);
  };

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

  if (!tender) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apply to Tender</DialogTitle>
          <DialogDescription>
            Submit your proposal for this tender opportunity
          </DialogDescription>
        </DialogHeader>

        {/* Tender Summary */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold">{tender.title}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              <span>{tender.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-green-600" />
              <span>{formatCurrency(tender.budget)}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3 text-blue-600" />
              <span>Due {formatDate(tender.deadline)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="proposal">Your Proposal *</Label>
            <Textarea
              id="proposal"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              placeholder="Describe your approach, experience, timeline, and why you're the best fit for this project..."
              rows={8}
              required
            />
            <p className="text-xs text-muted-foreground">
              Provide detailed information about your solution, relevant
              experience, and proposed timeline.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting
                ? "Submitting Application..."
                : "Submit Application"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
