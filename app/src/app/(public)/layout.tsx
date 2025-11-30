export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div className="pt-[calc(2rem+80px)] px-4 pb-8 h-screen overflow-y-auto">{children}</div>;
}
