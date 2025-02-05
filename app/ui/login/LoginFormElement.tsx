import {ReactNode} from 'react';

export default function LoginFormElement({
  children,
  errors
}: {
  children: ReactNode[] | ReactNode,
  errors: string[] | null
}): ReactNode {

  return (
    <div className="flex flex-col">
      {children}
      <div className="pb-4" id="customer-error" aria-live="polite" aria-atomic="true">
        {errors && errors.map((error) => (
          <p key={error} className="text-xs text-red-500 pt-1">
            {error}
          </p>
        ))}
      </div>
    </div>
  );
}
