export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
      {children}
      </div>
    </>
  );
}
