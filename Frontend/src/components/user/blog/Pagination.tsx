import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";
import type { PaginationControlsProps } from "@/types/types";

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }: PaginationControlsProps) => {
    if (totalPages <= 1) return null;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
  
    return (
        <div className="mt-6 mb-5">
            <Pagination className="mt-6">
                <PaginationContent className="flex justify-between">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) handlePageChange(currentPage - 1);
                            }}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                    </PaginationItem>
  
                    <PaginationItem className="mx-3">
                        <PaginationLink className="px-3">
                            Page {currentPage} of {totalPages}
                        </PaginationLink>
                    </PaginationItem>
  
                    <PaginationItem>
                        <PaginationNext
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) handlePageChange(currentPage + 1);
                            }}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
  
export default PaginationControls;