import {usePortfolio} from '../context/usePortfolio'

export function ContentNotice() {
  const {error} = usePortfolio()
  if (!error) return null

  return <div className="content-notice" role="alert">{error} <button type="button" onClick={() => window.location.reload()}>Try again</button></div>
}