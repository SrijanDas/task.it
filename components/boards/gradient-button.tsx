import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import React from "react";

export type Gradient = "default" | "g-1" | "g-2" | "g-3" | "g-4" | "g-5";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    selected?: boolean;
    gradient?: Gradient;
}

function GradientButton({
    selected,
    className,
    gradient = "default",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={cn(
                "w-full h-10 rounded-md flex flex-col items-center justify-center relative hover:brightness-90",
                className,
                gradients[gradient]
            )}
        >
            {selected && (
                <CheckIcon size={20} className="shrink-0 text-white" />
            )}
        </button>
    );
}

export const gradients: Record<Gradient, string> = {
    default: "bg-gradient-to-r from-blue-400 to-blue-500",
    "g-1": "bg-gradient-to-r from-blue-600 to-violet-600",
    "g-2": "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
    "g-3": "bg-gradient-to-r from-blue-900 to-pink-600",
    "g-4": "bg-gradient-to-r from-fuchsia-600 to-pink-600",
    "g-5": "bg-gradient-to-r from-red-500 to-orange-500",
};

export default GradientButton;
