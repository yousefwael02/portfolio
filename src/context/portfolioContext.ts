import {createContext} from 'react'
import type {PortfolioContent} from '../lib/portfolio'

export type PortfolioState = {
  content: PortfolioContent | null
  isLoading: boolean
  error: string | null
}

export const PortfolioContext = createContext<PortfolioState>({content: null, isLoading: true, error: null})