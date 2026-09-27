import {useEffect, useState, type ReactNode} from 'react'
import {fetchPortfolio} from '../lib/portfolio'
import {PortfolioContext, type PortfolioState} from './portfolioContext'

export function PortfolioProvider({children}: {children: ReactNode}) {
  const [state, setState] = useState<PortfolioState>({content: null, isLoading: true, error: null})

  useEffect(() => {
    let isCurrent = true

    fetchPortfolio()
      .then((content) => {
        if (isCurrent) setState({content, isLoading: false, error: null})
      })
      .catch(() => {
        if (isCurrent) setState({content: null, isLoading: false, error: 'Portfolio content is temporarily unavailable.'})
      })

    return () => {
      isCurrent = false
    }
  }, [])

  return <PortfolioContext.Provider value={state}>{children}</PortfolioContext.Provider>
}