import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SpecialtyBadgeProps {
  specialty: string;
}

export function SpecialtyBadge({ specialty }: SpecialtyBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "mr-1 mb-1 border transition-colors font-medium text-xs",
        "bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-300",
        "py-2 sm:py-0.5"
      )}
    >
      {specialty}
    </Badge>
  );
}
