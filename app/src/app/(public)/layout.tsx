export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div className="pt-[calc(2rem+80px)] h-screen overflow-y-auto">{children}</div>;
}
