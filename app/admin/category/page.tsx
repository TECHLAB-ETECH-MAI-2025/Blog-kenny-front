import { CategoryTable } from "@/components/admin/category/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CategoryPage() {

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gestion des catégories</h1>
                <Link href="/admin/category/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvelle catégorie
                    </Button>
                </Link>
            </div>
            <CategoryTable />
        </div>
    )
}
