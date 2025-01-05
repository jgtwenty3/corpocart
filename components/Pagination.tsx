"use client";

import { useRouter } from "next/navigation";

const ITEM_PER_PAGE = 25;

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="p-4 flex flex-col items-center text-gray-500 space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:space-x-4">
      <div className="flex items-center gap-2 order-2 sm:order-1">
        <button
          disabled={!hasPrev}
          className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            changePage(page - 1);
          }}
        >
          Prev
        </button>
        <button
          className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!hasNext}
          onClick={() => {
            changePage(page + 1);
          }}
        >
          Next
        </button>
      </div>
      <div className="flex items-center py-2 text-sm order-1 sm:order-2 overflow-x-auto">
        {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm ${
                page === pageIndex ? "bg-darkText text-black" : ""
              }`}
              onClick={() => {
                changePage(pageIndex);
              }}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
