"use client";

import { useEffect, useState } from "react";
// lucid-icons
import { Cookie, Home, Loader2, Plus, X } from "lucide-react";
// react-router-dom
import { Link } from "react-router-dom";
// shadcn-ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// validator
import { isEmail } from "validator";
import { useToast } from "@/hooks/use-toast";
// useAuth context
import { useAuth } from "@/context/AuthContext";
// rrd
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

interface jobData {
  jobTitle: string;
  jobDescription: string;
  experienceLevel: string;
  candidates: Array<string>;
  endDate: string;
}

export default function Dashboard({ userName = "John Doe" }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<jobData>({
    jobTitle: "",
    jobDescription: "",
    experienceLevel: "",
    candidates: [],
    endDate: "",
  });
  // loading
  const [loading, setLoading] = useState(false);
  // auth
  const { company, isAuthenticated, login, logout } = useAuth();
  const router = useNavigate();

  // check for isAuth exist other wisw redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      router("/login");
    }
  }, []);
  const [candidateEmail, setCandidateEmail] = useState("");
  //   toast
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCandidate = () => {
    if (!isEmail(candidateEmail)) {
      toast({
        title: "Please provide valid email",
        variant: "destructive",
      });
      setCandidateEmail("");
      return;
    }
    if (candidateEmail && !formData.candidates.includes(candidateEmail)) {
      setFormData((prev) => ({
        ...prev,
        candidates: [...prev.candidates, candidateEmail],
      }));
      setCandidateEmail("");
    }
  };

  const handleRemoveCandidate = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      candidates: prev.candidates.filter((c) => c !== email),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Form submitted:", formData);
      // job api
      const URL = import.meta.env.VITE_URL!;
      const token = Cookies.get("cuvette-session");
      let response;
      if (company && token) {
        response = await axios.post(
          `${URL}/api/job`,
          {
            title: formData.jobTitle,
            description: formData.jobDescription,
            experienceLevel: formData.experienceLevel,
            candidates: formData.candidates,
            endDate: formData.endDate,
            id: company._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast({
          title: "Job created successfully",
          variant: "default",
        });

        // reset form
        setShowForm(false);
        setFormData({
          jobTitle: "",
          jobDescription: "",
          experienceLevel: "",
          candidates: [],
          endDate: "",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: (error as any).response.data.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col pt-16">
      <div className="flex flex-1">
        <aside className="border-r bg-gray-100/40 p-2">
          <nav className="space-y-2">
            <Link
              className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-900 transition-all hover:text-gray-900"
              to="#"
            >
              <Home className="h-5 w-5" />
            </Link>
          </nav>
        </aside>
        {!showForm ? (
          <Button onClick={() => setShowForm(true)} className="ml-4 mt-4">
            <Plus className="mr-2 h-4 w-4" /> Create Interview
          </Button>
        ) : (
          <main className="flex-1 p-6 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 md:w-[60%]">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, experienceLevel: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="candidates">Add Candidates</Label>
                <div className="flex space-x-2">
                  <Input
                    id="candidates"
                    type="email"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="Enter candidate email"
                  />
                  <Button type="button" onClick={handleAddCandidate}>
                    Add
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {formData.candidates.map((email) => (
                    <div
                      key={email}
                      className="flex items-center justify-between rounded-md bg-gray-100 p-2"
                    >
                      <span>{email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCandidate(email)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  required
                  onChange={handleChange}
                />
              </div>
              {!loading ? (
                <div className="flex space-x-2">
                  <Button type="submit">Send</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button>
                  <Loader2 />
                </Button>
              )}
            </form>
          </main>
        )}
      </div>
    </div>
  );
}
