'use client';

import { motion } from "framer-motion"
import { Mail, Twitter, Linkedin } from "lucide-react"
import { useState } from "react"

const ICONS_MAP = {
  'mail': Mail,
  'twitter': Twitter,
  'linkedin': Linkedin,
} as const;

type IconName = keyof typeof ICONS_MAP;

interface SocialIcon {
  icon: IconName
  href?: string
  className?: string
  label?: string
}

interface AnimatedSocialIconsProps {
  icons: SocialIcon[]
  className?: string
  iconSize?: number
}

export function AnimatedSocialIcons({ 
  icons, 
  className,
  iconSize = 24
}: AnimatedSocialIconsProps) {
  const buttonSize = "size-12 sm:size-14" 

  return (
    <div className={`w-full relative flex items-start justify-start sm:justify-start ${className}`}>
      <div className="flex items-center justify-center gap-4">
        {icons.map(({ icon, href, className, label }, index) => {
          const IconComponent = ICONS_MAP[icon];
          return (
            <motion.div
              key={index}
              className={`
                ${buttonSize}
                rounded-full flex items-center justify-center
                bg-neutral-800/50 hover:bg-neutral-700/50
                border border-neutral-700/50
                group relative
                transition-colors backdrop-blur-sm
                ${className}
              `}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1 
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {href ? (
                <a 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                >
                  <IconComponent 
                    size={iconSize}
                    className="text-white/90 transition-all group-hover:text-white group-hover:scale-110" 
                  />
                  {label && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {label}
                    </span>
                  )}
                </a>
              ) : (
                <IconComponent 
                  size={iconSize}
                  className="text-white/90 transition-all group-hover:text-white group-hover:scale-110" 
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  )
} 