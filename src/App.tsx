import {Route, Routes} from 'react-router-dom'
import {SiteLayout} from './components/SiteLayout'
import {AboutPage} from './pages/AboutPage'
import {ContactPage} from './pages/ContactPage'
import {HomePage} from './pages/HomePage'
import {NotFoundPage} from './pages/NotFoundPage'
import {ProjectsPage} from './pages/ProjectsPage'
import {ServicesPage} from './pages/ServicesPage'
import {ProjectDetailPage} from './pages/ProjectDetailPage'
import {PortfolioProvider} from './context/PortfolioProvider'

export default function App() {
  return (
    <PortfolioProvider>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </PortfolioProvider>
  )
}