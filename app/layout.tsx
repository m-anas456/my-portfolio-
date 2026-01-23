import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Muhammad Anas - Full Stack Developer & AI Specialist',
  description: 'Professional portfolio showcasing full-stack development, computer vision, and AI projects. Open to opportunities.',
  generator: 'Next.js',
  keywords: ['Developer', 'React', 'Full Stack', 'Computer Vision', 'AI/ML', 'Python', 'Node.js'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      {
        url: '/placeholder-logo.png',
      },
      {
        url: '/placeholder-logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Muhammad Anas - Full Stack Developer',
    description: 'Explore my projects, skills, and experience in web development and AI.',
    type: 'website',
    url: 'https://yourportfolio.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Muhammad Anas Portfolio',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
