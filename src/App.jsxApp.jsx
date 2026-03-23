import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Home            from './pages/Home'
import GreenAI         from './pages/GreenAI'
import LumicsGrid      from './pages/LumicsGrid'
import PromptOptimizer from './pages/PromptOptimizer'
import Seal            from './pages/Seal'
import Simulator       from './pages/Simulator'
import Academy         from './pages/Academy'
import GlobalDashboard from './pages/GlobalDashboard'
import Reports         from './pages/Reports'
import ModelComparator from './pages/ModelComparator'
import CarbonGoals     from './pages/CarbonGoals'
import GreenNews       from './pages/GreenNews'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route element={<Layout />}>
          <Route path="/home"       element={<Home />}            />
          <Route path="/greenai"    element={<GreenAI />}         />
          <Route path="/grid"       element={<LumicsGrid />}      />
          <Route path="/optimizer"  element={<PromptOptimizer />} />
          <Route path="/seal"       element={<Seal />}            />
          <Route path="/simulator"  element={<Simulator />}       />
          <Route path="/academy"    element={<Academy />}         />
          <Route path="/global"     element={<GlobalDashboard />} />
          <Route path="/reports"    element={<Reports />}         />
          <Route path="/comparator" element={<ModelComparator />} />
          <Route path="/goals"      element={<CarbonGoals />}     />
          <Route path="/news"       element={<GreenNews />}       />
        </Route>
      </Routes>
    </Router>
  )
}
