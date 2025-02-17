import { Dosis } from 'next/font/google';
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import DashBoard from './dashboard/page';
import Provider from './provider';

const dosis = Dosis({ subsets: ['latin'] })

export const metadata = {
  title: "Interiors",
  description: "AI assistance for interior designs",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={dosis.className}>
          <Provider >
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}
