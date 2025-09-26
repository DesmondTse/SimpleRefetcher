function createReFetcher({
    fetchActionFn,
    blockFn = null,
    exceptionHandle = null,
    refreshInterval = 5000
}) {
    let isAutoFetching = false
    let autoFetchController = null
    let intervalId = null
    const listeners = []

    const subscribe = (fn) => {
        if (typeof fn === 'function') listeners.push(fn)
    }

    const unsubscribe = (fn) => {
        const index = listeners.indexOf(fn)
        if (index !== -1) listeners.splice(index, 1)
    }

    const notify = () => {
        listeners.forEach(fn => fn())
    }

    const refetch = async () => {
        if (blockFn && blockFn()) return

        if (isAutoFetching && autoFetchController) {
            autoFetchController.abort()
        }

        isAutoFetching = true
        try {
            autoFetchController = new AbortController()
            const signal = autoFetchController.signal
            await fetchActionFn(signal)
            notify()
        } catch (err) {
            if (exceptionHandle) exceptionHandle(err)
            console.error(err)
        } finally {
            isAutoFetching = false
        }
    }

    const startAutofetch = () => {
        if (!intervalId) {
            intervalId = setInterval(refetch, refreshInterval)
        }
    }

    const stopAutofetch = () => {
        if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
        }
    }

    return {
        refetch,
        startAutofetch,
        stopAutofetch,
        subscribe,
        unsubscribe
    }
}
