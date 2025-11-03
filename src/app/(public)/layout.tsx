import PublicHeader from "@/components/layout/PublicHeader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <div className="container mx-auto px-4 py-8">
      {children}
      </div>
    </>
  );
}
