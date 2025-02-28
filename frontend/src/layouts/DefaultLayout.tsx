function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen k-container max-w-screen-2xl  mx-auto">
      <div className="flex-1 flex flex-col min-w-0 min-h-0  pt-20 ">
        {children}
      </div>
    </div>
  );
}

export { DefaultLayout };
