import { ReactNode } from "react"

export default function PageWrapper({
  children,
  pageTitle
}: {
  children: ReactNode
  pageTitle?: string
}): ReactNode {
  return (
    <div className="flex flex-col w-full min-h-screen p-4">
      {pageTitle && (
        <h1 className="text-2xl font-bold text-indigo-950 pb-2">{pageTitle}</h1>
      )}
      {children}
    </div>
  )
}