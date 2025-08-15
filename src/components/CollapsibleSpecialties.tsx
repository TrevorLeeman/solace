"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SpecialtyBadge } from "./SpecialtyBadge";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CollapsibleSpecialtiesProps {
  specialties: string[];
  maxVisible?: number;
}

export function CollapsibleSpecialties({ 
  specialties, 
  maxVisible = 2 
}: CollapsibleSpecialtiesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = specialties.length > maxVisible;
  const hiddenCount = specialties.length - maxVisible;
  const alwaysVisible = specialties.slice(0, maxVisible);
  const expandable = specialties.slice(maxVisible);

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-1">
        {/* Always visible specialties */}
        {alwaysVisible.map((specialty, idx) => (
          <SpecialtyBadge key={`visible-${idx}`} specialty={specialty} />
        ))}
        
        {/* Expandable specialties with height animation */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <>
              {expandable.map((specialty, idx) => (
                <motion.div
                  key={`expandable-${idx}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                >
                  <SpecialtyBadge specialty={specialty} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
        
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={cn(
                    "cursor-pointer select-none transition-all duration-200",
                    "bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100",
                    "text-teal-700 border-teal-300 hover:border-teal-400",
                    "flex items-center gap-1 px-2 py-0.5 text-xs font-medium"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      <span>Show less</span>
                    </>
                  ) : (
                    <>
                      <span>+{hiddenCount} more</span>
                      <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </Badge>
              </TooltipTrigger>
              {!isExpanded && (
                <TooltipContent 
                  side="top" 
                  className="max-w-sm"
                >
                  <div className="flex flex-wrap gap-1">
                    {specialties.slice(maxVisible).map((specialty, idx) => (
                      <span 
                        key={idx} 
                        className="inline-block px-2 py-0.5 bg-white/20 rounded text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </motion.div>
        )}
      </div>
    </TooltipProvider>
  );
}