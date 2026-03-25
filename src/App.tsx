import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add more routes later, e.g.:
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/case-studies/:slug" element={<CaseStudy />} />
        */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
