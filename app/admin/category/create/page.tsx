"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CategorySchema } from "@/src/types/Category"
import { createCategory } from "@/src/services/CategoryService"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FormField from "@/components/form/form-field"

export default function CreateCategoryPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
        setIsLoading(true)
        try {
            toast.loading('Création en cours...', { id: 'create-category' })
            await createCategory({
                ...values,
                description: values.description ?? "",
                id: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })
            toast.success('Catégorie créée', {
                id: 'create-category',
                description: 'La catégorie a été créée avec succès',
                duration: 3000,
            })
            router.push("/admin/category")
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la création'
            toast.error('Échec de la création', {
                id: 'create-category',
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
                    <CardTitle>Créer une nouvelle catégorie</CardTitle>
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
                                    {isLoading ? "Création..." : "Créer"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
