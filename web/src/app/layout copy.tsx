import { LLMOptimizedContent } from '../components/LLMOptimizedContent'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LLMOptimizedContent />
        {children}
      </body>
    </html>
  )
} 