import { CommentTable } from "@/components/admin/comment/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CommentPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gestion des commentaires</h1>
                <Link href="/admin/comment/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouveau commentaire
                    </Button>
                </Link>
            </div>
            <CommentTable />
        </div>
    )
}
