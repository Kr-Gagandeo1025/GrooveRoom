import { Sora } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { DataProvider } from "@/providers/DataContext";
import { Toaster } from "@/components/ui/toaster"

const sora = Sora({ subsets: ["latin"] });

export const metadata = {
  title: "GrooveRoom | 🎉",
  description: "JOIN. LISTEN. VOTE. - take over the party",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <DataProvider>
        <html lang="en">
          <body className={sora.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </DataProvider>
    </ClerkProvider>
  );
}
