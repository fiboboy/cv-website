"use client"

import * as React from "react"
import { memo, useState, useRef, useCallback } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

export interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  variant?: "default" | "underline" | "glow" | "slide"
  direction?: "left" | "right" | "center"
  external?: boolean
  underlineHeight?: number
  className?: string
}

// Оптимизированная функция для объединения рефов
const useMergedRef = <T,>(...refs: (React.Ref<T> | undefined)[]) => {
  return useCallback((element: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      
      if (typeof ref === "function") {
        ref(element);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<T>).current = element;
      }
    });
  }, [refs]);
};

export const AnimatedLink = memo(React.forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  ({ 
    children, 
    variant = "default", 
    direction = "center", 
    external = false, 
    underlineHeight = 2,
    className,
    href,
    ...props 
  }, ref) => {
    const controls = useAnimationControls()
    const [blocked, setBlocked] = useState(false)
    const linkRef = useRef<HTMLAnchorElement>(null)
    const mergedRef = useMergedRef(ref, linkRef)

    const handleHover = useCallback(async () => {
      if (blocked || variant === "default") return
      
      setBlocked(true)
      
      if (variant === "underline") {
        if (direction === "center") {
          await controls.start({
            width: "100%",
            transition: { duration: 0.3, ease: "easeInOut" }
          })
        } else if (direction === "left" || direction === "right") {
          await controls.start({
            width: "100%",
            left: direction === "left" ? 0 : "auto",
            right: direction === "left" ? "auto" : 0,
            transition: { duration: 0.3, ease: "easeInOut" }
          })
        }
      } else if (variant === "glow") {
        await controls.start({
          opacity: 1,
          scale: 1.5,
          transition: { duration: 0.3, ease: "easeInOut" }
        })
      } else if (variant === "slide") {
        await controls.start({
          x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
          opacity: 0,
          transition: { duration: 0 }
        })
        await controls.start({
          x: 0,
          opacity: 1,
          transition: { duration: 0.2, ease: "easeInOut" }
        })
      }
      
      setBlocked(false)
    }, [blocked, variant, direction, controls])

    const handleHoverEnd = useCallback(async () => {
      if (blocked || variant === "default") return
      
      if (variant === "underline") {
        if (direction === "center") {
          await controls.start({
            width: "0%",
            transition: { duration: 0.3, ease: "easeInOut" }
          })
        } else if (direction === "left" || direction === "right") {
          await controls.start({
            width: "0%",
            transition: { duration: 0.3, ease: "easeInOut" }
          })
        }
      } else if (variant === "slide") {
        await controls.start({
          x: direction === "left" ? "100%" : direction === "right" ? "-100%" : 0,
          opacity: 0,
          transition: { duration: 0.2, ease: "easeInOut" }
        })
      }
    }, [blocked, variant, direction, controls])

    return (
      <a
        ref={mergedRef}
        href={href}
        className={cn(
          "relative inline-flex items-center gap-1 font-medium text-foreground/80 transition-colors hover:text-foreground",
          className
        )}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        {...props}
      >
        {children}
        {external && (
          <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
        )}
        
        {variant === "underline" && (
          <motion.span
            className={cn(
              "absolute bottom-0 bg-foreground",
              direction === "center" ? "left-1/2 -translate-x-1/2" : "",
              direction === "left" ? "right-0" : "",
              direction === "right" ? "left-0" : ""
            )}
            style={{ 
              height: `${underlineHeight}px`,
              width: "0%"
            }}
            initial={{ width: "0%" }}
            animate={controls}
          />
        )}
        
        {variant === "glow" && (
          <motion.span
            className="absolute inset-0 -z-10 rounded-full bg-foreground/10 blur-md"
            initial={{ opacity: 0, scale: 1 }}
            animate={controls}
          />
        )}
        
        {variant === "slide" && (
          <motion.span
            className="absolute inset-0 -z-10 bg-foreground/10"
            initial={{ x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0, opacity: 0 }}
            animate={controls}
          />
        )}
      </a>
    )
  }
))

AnimatedLink.displayName = "AnimatedLink" 