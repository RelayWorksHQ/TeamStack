import { PublicNav } from "./PublicNav";
import { Footer } from "./Footer";

export function MarketingLayout({ children }) {
  return (
    <>
      <PublicNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
