'use client'

import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '../queryClient'

interface TanstackQueryContextProps {
  children: React.ReactNode
}

export default function TanstackQueryContext({
  children,
}: TanstackQueryContextProps) {
  const [queryClient] = useState(getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
