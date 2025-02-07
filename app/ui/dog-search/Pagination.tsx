'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { generatePagination } from '@utils/paginationUtils';
import { useSearchFilterQueryContext } from '@context/searchFilterQueryProvider';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const { currentPage, setPage } = useSearchFilterQueryContext();
  const allPages = generatePagination(currentPage?.current || 1, totalPages);

  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          onClick={() => setPage(currentPage!.current - 1)}
          isDisabled={currentPage!.current! <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={index}
                onClick={() => {
                  if (typeof page === 'number') {
                    setPage(page);
                  }
                }}
                page={page}
                position={position}
                isActive={currentPage!.current! === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          onClick={() => setPage(currentPage!.current! + 1)}
          isDisabled={currentPage!.current! >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  onClick,
  isActive,
  position,
}: {
  page: number | string;
  onClick: () => void;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <div onClick={onClick} className={className}>
      {page}
    </div>
  );
}

function PaginationArrow({
  onClick,
  direction,
  isDisabled,
}: {
  onClick: () => void;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  );
}
