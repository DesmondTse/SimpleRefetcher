Example:
```
const reFetcher = createReFetcher({
    fetchActionFn: async (signal) => {
        const res = await fetch('/api/data', { signal })
        const data = await res.json()
        console.log('Fetched:', data)
    },
    exceptionHandle: (err) => console.warn('Fetch error:', err)
})

reFetcher.subscribe(() => {
    console.log('Refetch completed!')
})

reFetcher.startAutofetch()

// stop refetching
// reFetcher.stopAutofetch()
```
