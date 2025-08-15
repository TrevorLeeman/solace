"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, Heart } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { AdvocateTable } from "@/components/AdvocateTable";
import { TableSkeleton } from "@/components/TableSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SolaceLogo } from "@/components/SolaceLogo";

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/advocates")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch advocates:", error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      if (!searchTerm.trim()) {
        setFilteredAdvocates(advocates);
        return;
      }

      const searchLower = searchTerm.toLowerCase();
      const filtered = advocates.filter((advocate) => {
        return (
          advocate.firstName.toLowerCase().includes(searchLower) ||
          advocate.lastName.toLowerCase().includes(searchLower) ||
          advocate.city.toLowerCase().includes(searchLower) ||
          advocate.degree.toLowerCase().includes(searchLower) ||
          advocate.specialties.some((s) => s.toLowerCase().includes(searchLower)) ||
          advocate.yearsOfExperience.toString().includes(searchTerm) ||
          advocate.phoneNumber.toString().includes(searchTerm)
        );
      });

      setFilteredAdvocates(filtered);
    },
    [advocates]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-solace-light via-white to-solace-light/50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-solace-primary text-white shadow-lg"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-solace-accent" />
              <div className="flex items-center gap-0">
                <SolaceLogo className="h-8 w-auto" />
                <h1 className="text-3xl font-medium -ml-2">Advocates</h1>
              </div>
            </div>
            <div className="hidden sm:block text-sm text-solace-light">Your health partners, covered by Medicare</div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-0 sm:px-4 py-0 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-8 border-0 shadow-none sm:shadow-xl bg-white/90 backdrop-blur rounded-none sm:rounded-lg">
            <CardHeader className="bg-gradient-to-r from-solace-secondary/10 to-solace-accent/10 rounded-t-lg">
              <CardTitle className="text-2xl text-solace-primary flex items-center gap-2">
                <Users className="h-6 w-6" />
                Find Your Healthcare Advocate
              </CardTitle>
              <CardDescription className="text-solace-dark/70">
                Search our network of experienced healthcare professionals who will help untangle your healthcare needs
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search by name, city, degree, specialty..."
                className="mb-6"
              />

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                {isLoading ? <TableSkeleton /> : <AdvocateTable advocates={filteredAdvocates} isLoading={isLoading} />}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center py-8 text-sm text-solace-muted"
        >
          <p className="mb-2">Don&apos;t navigate your health alone.</p>
          <p className="text-xs">
            Advocates on Solace are doctors, nurses and experts who will listen to you, fight on your behalf and get you
            the care you need - covered by Medicare.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
