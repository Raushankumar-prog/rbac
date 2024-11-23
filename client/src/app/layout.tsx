import React from "react";
import Navbar from "../components/Navbar";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Navbar />
        <div className="flex">
          <main className="flex-grow p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
