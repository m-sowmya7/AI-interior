import { Dosis } from 'next/font/google';
import "./globals.css";

const dosis = Dosis( { subsets: ['latin'] } )

export const metadata = {
  title: "Interiors",
  description: "AI assistance for interior designs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className= {dosis.className}>
          {children}
      </body>
    </html>
  );
}
