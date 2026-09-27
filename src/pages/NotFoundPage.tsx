import {Link} from 'react-router-dom'
import {SEO} from '../components/SEO'

export function NotFoundPage() {
  return (
    <>
      <SEO title="Page not found | Yousef Wael" description="This portfolio page could not be found." />
      <section className="page-intro section-wrap">
        <p className="eyebrow">404 / Not found</p>
        <h1>This page took<br /><span>a different route.</span></h1>
        <Link className="text-link" to="/">Back to the homepage <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  )
}