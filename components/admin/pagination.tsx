"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const canGoBack = currentPage > 1
    const canGoForward = currentPage < totalPages

    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            {canGoBack && (
                <>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(1)}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </>
            )}

            <span className="mx-4">
                Page {currentPage} sur {totalPages}
            </span>

            {canGoForward && (
                <>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(totalPages)}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </>
            )}
        </div>
    )
}
