'use client'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-lg">learning zustand</h1>
      <main>{children}</main>
    </>
  );
}
