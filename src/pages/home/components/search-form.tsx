import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { BlogContext } from '../../../contexts/blog-context'
const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
    const fetchIssues = useContextSelector(BlogContext, (context) => context.fetchIssues)

    const { register, handleSubmit } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    })

    async function handleSearchIssues(data: SearchFormInputs) {
        await fetchIssues(data.query)
    }

    return (
        <form>
            <input
                type="text"
                placeholder="Buscar conteúdo"
                className="w-full px-4 py-3 rounded-md border border-base-border bg-base-input text-base-text placeholder:text-base-label focus:outline-none focus:ring-2 focus:ring-blue transition-all"
                {...register('query')}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSubmit(handleSearchIssues)()
                    }
                }}
            />
            <button type="submit" hidden />
        </form>
    )
}