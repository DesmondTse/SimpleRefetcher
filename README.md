Example:
```
const reFetcher = createReFetcher({
    fetchActionFn: async (signal) => {
        const res = await fetch('/api/data', { signal })
        const data = await res.json()
        console.log('Fetched:', data)
    },
    blockFn: null,    
    exceptionHandle: (err) => console.warn('Fetch error:', err),
    refreshInterval: 5000
})

reFetcher.subscribe(() => {
    console.log('Refetch completed!')
})

reFetcher.startAutofetch()

// stop refetching
// reFetcher.stopAutofetch()
```
