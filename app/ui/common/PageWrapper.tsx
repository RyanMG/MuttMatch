import { ReactNode } from "react"

export default function PageWrapper({
  children,
  pageTitle
}: {
  children: ReactNode
  pageTitle?: string
}): ReactNode {
  return (
    <div className="flex flex-col flex-1 min-h-screen p-3">
      {pageTitle && (
        <>
          <h1 className="text-2xl font-bold text-indigo-950">{pageTitle}</h1>
          <div className="w-full border-b border-indigo-950 pb-1 mb-4" />
        </>
      )}
      {children}
    </div>
  )
}