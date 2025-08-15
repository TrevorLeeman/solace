"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Phone,
  User,
  MapPin,
  GraduationCap,
  Award,
  Briefcase,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CollapsibleSpecialties } from "./CollapsibleSpecialties";
import { Pagination } from "./Pagination";
import { cn } from "@/lib/utils";

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

interface AdvocateTableProps {
  advocates: Advocate[];
  isLoading?: boolean;
}

type SortField = keyof Advocate | null;
type SortDirection = "asc" | "desc";

export function AdvocateTable({ advocates, isLoading = false }: AdvocateTableProps) {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSort = (field: keyof Advocate) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAdvocates = [...advocates].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "specialties") {
      aValue = (aValue as string[]).length;
      bValue = (bValue as string[]).length;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedAdvocates.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedAdvocates = sortedAdvocates.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Reset to first page when advocates list changes (e.g., after search)
  useEffect(() => {
    setCurrentPage(1);
  }, [advocates]);

  const SortIcon = ({ field }: { field: keyof Advocate }) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="w-4 h-4 opacity-30" />;
    }
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const formatPhoneNumber = (phone: number) => {
    const phoneStr = phone.toString();
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-solace-light hover:bg-solace-light">
            <TableHead
              className="cursor-pointer select-none font-semibold text-solace-dark hover:bg-solace-light/50"
              onClick={() => handleSort("firstName")}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-solace-secondary" />
                <span>Name</span>
                <SortIcon field="firstName" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer select-none font-semibold text-solace-dark hover:bg-solace-light/50"
              onClick={() => handleSort("city")}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-solace-secondary" />
                <span>City</span>
                <SortIcon field="city" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer select-none font-semibold text-solace-dark hover:bg-solace-light/50"
              onClick={() => handleSort("degree")}
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-solace-secondary" />
                <span>Degree</span>
                <SortIcon field="degree" />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-solace-dark">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-solace-secondary" />
                <span>Specialties</span>
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer select-none font-semibold text-solace-dark hover:bg-solace-light/50"
              onClick={() => handleSort("yearsOfExperience")}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-solace-secondary" />
                <span>Experience</span>
                <SortIcon field="yearsOfExperience" />
              </div>
            </TableHead>
            <TableHead className="font-semibold text-solace-dark">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-solace-secondary" />
                <span>Phone</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAdvocates.map((advocate, index) => (
            <motion.tr
              key={advocate.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className={cn("border-b transition-colors hover:bg-solace-light/30", "group")}
            >
              <TableCell className="font-medium">
                {advocate.firstName} {advocate.lastName}
              </TableCell>
              <TableCell>{advocate.city}</TableCell>
              <TableCell>{advocate.degree}</TableCell>
              <TableCell>
                <CollapsibleSpecialties specialties={advocate.specialties} />
              </TableCell>
              <TableCell>{advocate.yearsOfExperience} years</TableCell>
              <TableCell>
                <a
                  href={`tel:${advocate.phoneNumber}`}
                  className="text-solace-primary hover:text-solace-secondary transition-colors"
                >
                  {formatPhoneNumber(advocate.phoneNumber)}
                </a>
              </TableCell>
            </motion.tr>
          ))}
          {advocates.length === 0 && !isLoading && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-solace-muted">
                No advocates found matching your search criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {advocates.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={advocates.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
