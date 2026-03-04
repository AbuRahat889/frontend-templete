// components/Pagination.tsx
import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-end items-center py-6 border-t">
      <div className="flex items-center gap-2">
        <button
          onClick={goToPreviousPage}
          // disabled={currentPage === 1}
          className="h-12  flex items-center gap-2 justify-center bg-white rounded-xl px-4"
        >
          <MdOutlineArrowBackIosNew className="size-4" />
          <p className="text-sm font-semibold text-[#373E48] leading-[140%]">
            Previous
          </p>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1),
          )
          .map((page, index, array) => (
            <React.Fragment key={page}>
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="px-2">...</span>
              )}
              <button
                onClick={() => onPageChange(page)}
                className={`h-12 w-10 flex justify-center items-center text-sm font-semibold ${
                  currentPage === page
                    ? " bg-primaryColor  text-white rounded-xl"
                    : "bg-white text-[#636f85] rounded-xl"
                }`}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

        <button
          onClick={goToNextPage}
          // disabled={currentPage === 1}
          className="h-12  flex items-center gap-2 justify-center bg-white rounded-xl px-4"
        >
          <p className="text-sm font-semibold text-[#373E48] leading-[140%]">
            Next
          </p>
          <MdOutlineArrowForwardIos className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

{
  /* <Pagination
  currentPage={currentPage}
  totalPages={totalPage}
  onPageChange={onPageChange}
/> */
}
