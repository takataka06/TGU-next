import  PrivateHeader  from '@/components/layout/PrivateHeader'

export default function Privatelayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateHeader />
      {children}
    </>
  )
}
