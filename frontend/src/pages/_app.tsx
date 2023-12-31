//import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'



const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
  
    <QueryClientProvider client={queryClient}>
       <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
      </QueryClientProvider>
    
      
   
  )
}
