import { ArticleTable } from "@/components/admin/article/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ArticlePage() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gestion des articles</h1>
                <Link href="/admin/article/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvel article
                    </Button>
                </Link>
            </div>
            <ArticleTable />
        </div>
    )
}