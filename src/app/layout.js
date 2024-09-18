import localFont from "next/font/local";
import "./globals.css";

const Manrope = localFont({
  src: "./fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-Manrope",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata = {
  title: "Aros",
  description: "Logos previewer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Manrope.variable} text-white overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
