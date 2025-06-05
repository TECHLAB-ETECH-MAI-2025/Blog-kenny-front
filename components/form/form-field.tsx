import type { Control, FieldValues, Path } from "react-hook-form"
import { FormControl, FormField as FormFieldUI, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    label: string
    placeholder?: string
    type?: "text" | "email" | "password" | "file" | "textarea"
    rows?: number // Pour le textarea
}

const FormField = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = "text",
    rows = 3,
}: FormFieldProps<T>) => (
    <FormFieldUI
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="w-full max-w-lg">
                <label className="text-sm font-medium">{label}</label>
                <FormControl>
                    {type === "textarea" ? (
                        <Textarea className="border-2 border-border" placeholder={placeholder} rows={rows} {...field} />
                    ) : (
                        <Input className="border-2 border-border" placeholder={placeholder} type={type} {...field} />
                    )}
                </FormControl>
                <FormMessage className="text-sm" />
            </FormItem>
        )}
    />
)

export default FormField
