import React from "react";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

export const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ icon: Icon, className, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Icon size={18} />
        </div>
        <Input ref={ref} className={`pl-10 ${className || ""}`} {...props} />
      </div>
    );
  }
);
IconInput.displayName = "IconInput"; 