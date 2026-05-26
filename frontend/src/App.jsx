
// Libs
import { Routes, Route } from 'react-router-dom'

// Components
import Landing from './pages/Landing'
import Home from './pages/Home'
import Result from './pages/Result'

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/Home" element={<Home />} />
				<Route path="/result" element={<Result />} />
			</Routes>
		</div>
	)
}

export default App
