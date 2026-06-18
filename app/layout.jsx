import "./globals.css";

export const metadata = {
  title: "Teamstack — The operating workspace for modern teams",
  description:
    "Run the work. See the progress. Keep everyone accountable with Teamstack."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
