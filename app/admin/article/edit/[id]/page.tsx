"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArticleSchema } from "@/src/types/Article"
import { getArticleById, updateArticle } from "@/src/services/ArticleService"
import { getAllCategories } from "@/src/services/CategoryService"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import FormField from "@/components/form/form-field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, X, Tag, Plus } from "lucide-react"
import type { Category } from "@/src/types/Category"

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { id } = use(params);

    const handleCategoryToggle = (categoryId: string) => {
        const newSelection = selectedCategories.includes(categoryId)
            ? selectedCategories.filter((id) => id !== categoryId)
            : [...selectedCategories, categoryId]

        setSelectedCategories(newSelection)
        form.setValue(
            "categories",
            newSelection.map((id) => Number.parseInt(id)),
        )
    }

    const removeCategoryFromSelection = (categoryId: string) => {
        const newSelection = selectedCategories.filter((id) => id !== categoryId)
        setSelectedCategories(newSelection)
        form.setValue(
            "categories",
            newSelection.map((id) => Number.parseInt(id)),
        )
    }

    const getSelectedCategoriesNames = () => {
        return categories.filter((cat) => selectedCategories.includes(cat.id.toString())).map((cat) => cat.name)
    }

    const clearAllCategories = () => {
        setSelectedCategories([])
        form.setValue("categories", [])
    }

    const form = useForm<z.infer<typeof ArticleSchema>>({
        resolver: zodResolver(ArticleSchema),
        defaultValues: {
            title: "",
            content: "",
            categories: [],
        },
    })

    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger les catégories
                const categoriesData = await getAllCategories()
                setCategories(categoriesData)

                // Charger l'article
                const article = await getArticleById(parseInt(id))
                form.reset({
                    title: article.title,
                    content: article.content,
                    categories: article.categories.map(cat => cat.id),
                })
                setSelectedCategories(article.categories.map(cat => cat.id.toString()))
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Impossible de charger les données'
                toast.error('Erreur', {
                    description: errorMessage,
                    duration: 4000,
                })
                router.push("/admin/article")
            }
        }
        loadData()
    }, [id, router, form])

    const onSubmit = async (values: z.infer<typeof ArticleSchema>) => {
        setIsLoading(true)
        try {
            toast.loading('Mise à jour en cours...', { id: 'update-article' })
            await updateArticle(parseInt(id), {
                title: values.title,
                content: values.content,
                categories: values.categories,
            })
            toast.success('Article mis à jour', {
                id: 'update-article',
                description: "L'article a été mis à jour avec succès",
                duration: 3000,
            })
            router.push("/admin/article")
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la mise à jour'
            toast.error('Échec de la mise à jour', {
                id: 'update-article',
                description: errorMessage,
                duration: 4000,
            })
        }
        setIsLoading(false)
    }

    return (
        <div className="container mx-auto py-10">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5" />
                        Modifier l&apos;article
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center">
                            <div className="w-full flex flex-col items-center gap-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    label="Titre"
                                    placeholder="Titre de l'article"
                                />

                                <FormField
                                    control={form.control}
                                    name="content"
                                    label="Contenu"
                                    type="textarea"
                                    placeholder="Contenu de l'article"
                                />

                                <div className="w-full max-w-lg space-y-3">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        Catégories
                                        {selectedCategories.length > 0 && (
                                            <Badge variant="secondary" className="ml-auto">
                                                {selectedCategories.length} sélectionnée{selectedCategories.length > 1 ? "s" : ""}
                                            </Badge>
                                        )}
                                    </Label>

                                    {/* Selected Categories Display */}
                                    {selectedCategories.length > 0 && (
                                        <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg border">
                                            {getSelectedCategoriesNames().map((categoryName, index) => {
                                                const categoryId = categories.find((cat) => cat.name === categoryName)?.id.toString()
                                                return (
                                                    <Badge key={index} variant="secondary" className="flex items-center gap-1 px-2 py-1">
                                                        {categoryName}
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                                            onClick={() => categoryId && removeCategoryFromSelection(categoryId)}
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </Badge>
                                                )
                                            })}
                                            {selectedCategories.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={clearAllCategories}
                                                    className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
                                                >
                                                    Tout effacer
                                                </Button>
                                            )}
                                        </div>
                                    )}

                                    {/* Category Selector */}
                                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                        <PopoverTrigger asChild>
                                            <Button type="button" variant="outline" className="w-full justify-between h-10">
                                                <span className="flex items-center gap-2">
                                                    <Plus className="h-4 w-4" />
                                                    {selectedCategories.length === 0
                                                        ? "Sélectionner des catégories"
                                                        : `${selectedCategories.length} catégorie${selectedCategories.length > 1 ? "s" : ""} sélectionnée${selectedCategories.length > 1 ? "s" : ""}`}
                                                </span>
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="start">
                                            <div className="p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="font-medium text-sm">Sélectionner les catégories</h4>
                                                    {selectedCategories.length > 0 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={clearAllCategories}
                                                            className="h-6 px-2 text-xs"
                                                        >
                                                            Tout effacer
                                                        </Button>
                                                    )}
                                                </div>
                                                <Separator className="mb-3" />
                                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                                    {categories.map((category) => {
                                                        const isSelected = selectedCategories.includes(category.id.toString())
                                                        return (
                                                            <div
                                                                key={category.id}
                                                                className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                                                                onClick={() => handleCategoryToggle(category.id.toString())}
                                                            >
                                                                <Checkbox
                                                                    checked={isSelected}
                                                                    onChange={() => handleCategoryToggle(category.id.toString())}
                                                                />
                                                                <Label className="flex-1 cursor-pointer text-sm font-normal">{category.name}</Label>
                                                                {isSelected && (
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        ✓
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                {categories.length === 0 && (
                                                    <div className="text-center py-4 text-sm text-muted-foreground">
                                                        Aucune catégorie disponible
                                                    </div>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/admin/article")}
                                    className="min-w-24"
                                >
                                    Annuler
                                </Button>
                                <Button type="submit" disabled={isLoading} className="min-w-24">
                                    {isLoading ? "Mise à jour..." : "Mettre à jour"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
