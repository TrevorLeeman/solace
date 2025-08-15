import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, MapPin, GraduationCap, Award, Briefcase, Phone } from "lucide-react";

export function TableSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-solace-light hover:bg-solace-light">
            <TableHead className="font-semibold text-solace-dark">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-solace-secondary" />
                <span>Name</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold text-solace-dark">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-solace-secondary" />
                <span>City</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold text-solace-dark">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-solace-secondary" />
                <span>Degree</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold text-solace-dark">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-solace-secondary" />
                <span>Specialties</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold text-solace-dark">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-solace-secondary" />
                <span>Experience</span>
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
          {[...Array(5)].map((_, index) => (
            <TableRow key={index} className="border-b">
              <TableCell>
                <Skeleton className="h-5 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-20" />
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-28" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}