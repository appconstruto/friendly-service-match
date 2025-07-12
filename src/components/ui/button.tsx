import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold shadow-md ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--color-primary))] text-white shadow-lg hover:bg-[hsl(var(--color-primary))]/90",
        destructive:
          "bg-[hsl(var(--color-danger))] text-white shadow-lg hover:bg-[hsl(var(--color-danger))]/90",
        outline:
          "border-2 border-[hsl(var(--color-primary-light))] text-[hsl(var(--color-primary))] bg-white hover:bg-[hsl(var(--color-bg-light))] hover:text-[hsl(var(--color-accent))]",
        secondary:
          "bg-[hsl(var(--color-primary-light))] text-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-accent))]/90 hover:text-white",
        ghost: "text-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-primary-light))]/60 hover:text-[hsl(var(--color-accent))]",
        link: "text-[hsl(var(--color-accent))] underline underline-offset-4 hover:text-[hsl(var(--color-primary))]",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-xl px-4",
        lg: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
