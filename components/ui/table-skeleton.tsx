import { Skeleton } from "@/components/ui/skeleton"

interface TableSkeletonProps {
    columns: number
}

export function TableSkeleton({ columns }: TableSkeletonProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                {Array.from({ length: columns }).map((_, index) => (
                    <Skeleton key={index} className="h-4 w-[100px]" />
                ))}
            </div>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex items-center space-x-4">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <Skeleton key={colIndex} className="h-4 w-[100px]" />
                    ))}
                </div>
            ))}
        </div>
    )
}
