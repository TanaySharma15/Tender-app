"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, DollarSign, FileText } from "lucide-react";
import axios from "axios";

export default function CreateTenderPage() {
  const [data, setData] = useState({
    title: "",
    description: "",
    deadline: "",
    budget: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.title || !data.description || !data.deadline || !data.budget) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3001/tender", data, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      if (res.status === 201) {
        alert("Tender created successfully");
        router.push("http://localhost:3000/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const changeHandler = async (e: any) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Tender</h1>
        <p className="text-muted-foreground">
          Post a new tender opportunity for other companies to apply
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Tender Details
          </CardTitle>
          <CardDescription>
            Provide comprehensive information about your tender requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tender Title *</Label>
              <Input
                id="title"
                value={data.title}
                name="title"
                onChange={changeHandler}
                placeholder="e.g., Mobile App Development for E-commerce Platform"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={data.description}
                name="description"
                onChange={changeHandler}
                placeholder="Provide detailed requirements, scope of work, deliverables, and any specific criteria..."
                rows={6}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="deadline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Application Deadline *
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  name="deadline"
                  value={data.deadline}
                  onChange={changeHandler}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget (USD) *
                </Label>
                <Input
                  id="budget"
                  type="number"
                  name="budget"
                  value={data.budget}
                  onChange={changeHandler}
                  placeholder="50000"
                  min="0"
                  step="1000"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Creating Tender..." : "Create Tender"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Creating Effective Tenders</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Be specific about your requirements and expectations</li>
            <li>• Include clear deliverables and timeline expectations</li>
            <li>• Set a realistic budget range for your project</li>
            <li>• Mention any preferred technologies or methodologies</li>
            <li>• Specify evaluation criteria for proposals</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
