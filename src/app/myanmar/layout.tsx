import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Myanmar News - Conflict News Portal",
  description: "Exclusive coverage of Myanmar conflict, political developments, and humanitarian situation.",
};

export default function MyanmarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
