import { Providers } from "@/app/filter2/providers";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}
