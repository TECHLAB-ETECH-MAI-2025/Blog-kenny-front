"use client"

import { useEffect, useState } from "react"
import { Category } from "@/src/types/Category"
import { PaginationMeta } from "@/src/types"
import { getCategories, deleteCategory } from "@/src/services/CategoryService"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pagination } from "@/components/admin/pagination"
import Link from "next/link"
import { Calendar, FileText, Hash, Info, Pencil, Trash } from "lucide-react"

export const CategoryTable = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [meta, setMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 10,
        pages: 1
    })

    const loadCategories = async (page: number = 1) => {
        try {
            const response = await getCategories(page);
            setCategories(response.categories)
            setMeta(response.meta)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Veuillez vérifier votre connexion et réessayer'
            toast.error('Échec du chargement des catégories', {
                description: errorMessage,
                duration: 4000,
            })
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const handlePageChange = (page: number) => {
        loadCategories(page)
    }

    const handleDelete = async (id: number) => {
        try {
            toast.loading('Suppression en cours...', { id: `delete-${id}` })
            await deleteCategory(id)
            toast.success('Catégorie supprimée', {
                id: `delete-${id}`,
                description: 'La catégorie a été supprimée avec succès',
                duration: 3000,
            })
            loadCategories()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la suppression'
            toast.error('Échec de la suppression', {
                id: `delete-${id}`,
                description: errorMessage,
                duration: 4000,
            })
        }
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <Hash className="h-4 w-4" />
                                    <span>ID</span>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span>Nom</span>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <Info className="h-4 w-4" />
                                    <span>Description</span>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Date de création</span>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Date de modification</span>
                                </div>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">{category.id}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">
                                        {category.name}
                                    </Badge>
                                </TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>{new Date(category.createdAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</TableCell>
                                <TableCell>{new Date(category.updatedAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={`/admin/category/edit/${category.id}`}>
                                        <Button variant="outline" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {categories.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    Aucune catégorie trouvée
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {meta.pages > 1 && (
                <Pagination
                    currentPage={meta.page}
                    totalPages={meta.pages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    )
}
