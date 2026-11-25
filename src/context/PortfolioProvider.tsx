import {useEffect, useState, type ReactNode} from 'react'
import {fetchPortfolio} from '../lib/portfolio'
import {PortfolioContext, type PortfolioState} from './portfolioContext'

// Content is fetched from Sanity's CDN at runtime, so a publish shows up on the next page load.
// For visitors who keep a tab open, content is refetched when they return to it, at most this often.
const REFRESH_INTERVAL_MS = 5 * 60 * 1000

export function PortfolioProvider({children}: {children: ReactNode}) {
  const [state, setState] = useState<PortfolioState>({content: null, isLoading: true, error: null})

  useEffect(() => {
    let isCurrent = true
    let lastFetchedAt = Date.now()

    fetchPortfolio()
      .then((content) => {
        if (isCurrent) setState({content, isLoading: false, error: null})
      })
      .catch(() => {
        if (isCurrent) setState({content: null, isLoading: false, error: 'Portfolio content is temporarily unavailable.'})
      })

    function refreshWhenVisible() {
      if (document.visibilityState !== 'visible' || Date.now() - lastFetchedAt < REFRESH_INTERVAL_MS) return
      lastFetchedAt = Date.now()
      // A failed background refresh keeps the content already on screen.
      fetchPortfolio()
        .then((content) => {
          if (isCurrent) setState({content, isLoading: false, error: null})
        })
        .catch(() => {})
    }

    document.addEventListener('visibilitychange', refreshWhenVisible)
    return () => {
      isCurrent = false
      document.removeEventListener('visibilitychange', refreshWhenVisible)
    }
  }, [])

  return <PortfolioContext.Provider value={state}>{children}</PortfolioContext.Provider>
}
