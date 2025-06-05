"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CategorySchema } from "@/src/types/Category"
import { getCategoryById, updateCategory } from "@/src/services/CategoryService"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FormField from "@/components/form/form-field"

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = use(params);
    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const category = await getCategoryById(parseInt(id))
                form.reset({
                    name: category.name,
                    description: category.description,
                })
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Impossible de charger la catégorie'
                toast.error('Erreur', {
                    description: errorMessage,
                    duration: 4000,
                })
                router.push("/admin/category")
            }
        }
        loadCategory()
    }, [id, router, form])

    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
        setIsLoading(true)
        try {
            toast.loading('Mise à jour en cours...', { id: 'update-category' })
            await updateCategory(parseInt(id), {
                ...values,
                description: values.description ?? "",
                id: parseInt(id),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })
            toast.success('Catégorie mise à jour', {
                id: 'update-category',
                description: 'La catégorie a été mise à jour avec succès',
                duration: 3000,
            })
            router.push("/admin/category")
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la mise à jour'
            toast.error('Échec de la mise à jour', {
                id: 'update-category',
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
                    <CardTitle>Modifier la catégorie</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center">
                            <div className="w-full flex flex-col items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    label="Nom"
                                    placeholder="Nom de la catégorie"
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    label="Description"
                                    placeholder="Description de la catégorie"
                                />
                            </div>

                            <div className="flex justify-center gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/admin/category")}
                                >
                                    Annuler
                                </Button>
                                <Button type="submit" disabled={isLoading}>
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
