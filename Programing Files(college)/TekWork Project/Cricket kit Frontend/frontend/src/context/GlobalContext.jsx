import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const GlobalContext = createContext(null)

const API_BASE_URL = 'https://sports-marketing-intelligence.onrender.com'
const API_PATH = '/predict'

const numericFields = new Set([
	'age',
	'monthly_income',
	'matches_watched_per_season',
	'sports_content_watch_hours_per_week',
	'sports_equipment_spending_per_month',
])

//  These are the values which should be sent to the backend
// {
//   "age": 28,
//   "city": "Mumbai",
//   "occupation": "Software Engineer",
//   "monthly_income": 85000.0,
//   "favorite_ipl_team": "Mumbai Indians",
//   "matches_watched_per_season": 60,
//   "sports_content_watch_hours_per_week": 18.5,
//   "sports_equipment_spending_per_month": 5500.0
// }



const requiredFields = [
	'age',
	'city',
	'occupation',
	'monthly_income',
	'favorite_ipl_team',
	'matches_watched_per_season',
	'sports_content_watch_hours_per_week',
	'sports_equipment_spending_per_month',
]

const normalizePayload = (payload) => {
	const normalized = { ...payload }

	for (const fieldName of numericFields) {
		const rawValue = normalized[fieldName]

		if (rawValue === undefined || rawValue === null || rawValue === '') {
			continue
		}

		normalized[fieldName] = Number(rawValue)
	}

	return normalized
}

const isValidPayload = (payload) => {
	if (!payload || typeof payload !== 'object') {
		return { isValid: false, message: 'Invalid form data.' }
	}

	for (const fieldName of requiredFields) {
		const fieldValue = payload[fieldName]

		if (fieldValue === undefined || fieldValue === null || String(fieldValue).trim() === '') {
			return { isValid: false, message: `Missing required field: ${fieldName}.` }
		}
	}

	const ageValue = Number(payload.age)
	const monthlyIncomeValue = Number(payload.monthly_income)
	const matchesWatchedValue = Number(payload.matches_watched_per_season)
	const contentHoursValue = Number(payload.sports_content_watch_hours_per_week)
	const spendingValue = Number(payload.sports_equipment_spending_per_month)

	if (!Number.isInteger(ageValue) || ageValue < 10 || ageValue > 60) {
		return { isValid: false, message: 'age must be an integer between 10 and 60.' }
	}

	if (!Number.isFinite(monthlyIncomeValue) || monthlyIncomeValue <= 0) {
		return { isValid: false, message: 'monthly_income must be a positive number.' }
	}

	if (!Number.isInteger(matchesWatchedValue) || matchesWatchedValue < 0) {
		return { isValid: false, message: 'matches_watched_per_season must be a non-negative integer.' }
	}

	if (!Number.isFinite(contentHoursValue) || contentHoursValue < 0) {
		return { isValid: false, message: 'sports_content_watch_hours_per_week must be a non-negative number.' }
	}

	if (!Number.isFinite(spendingValue) || spendingValue < 0) {
		return { isValid: false, message: 'sports_equipment_spending_per_month must be a non-negative number.' }
	}

	return { isValid: true, message: '' }
}

export const GlobalContextProvider = ({ children }) => {
	const [lastSubmittedData, setLastSubmittedData] = useState(null)
	const [lastBackendResponse, setLastBackendResponse] = useState(null)
	const [backendError, setBackendError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const submitCricketKitData = async (payload) => {
		const verification = isValidPayload(payload)

		if (!verification.isValid) {
			setBackendError(verification.message)
			setLastBackendResponse(null)
			return { success: false, error: verification.message, data: null }
		}

		setIsSubmitting(true)
		setBackendError('')

		try {
			const normalizedPayload = normalizePayload(payload)
			const response = await axios.post(`${API_BASE_URL}${API_PATH}`, normalizedPayload)

			console.log('FastAPI response:', response.data)

			setLastSubmittedData(normalizedPayload)
			setLastBackendResponse(response.data)
			return { success: true, error: '', data: response.data }
		} catch (error) {
			const message = error?.response?.data?.detail || error?.message || 'Failed to send data to the backend.'

			setBackendError(message)
			setLastBackendResponse(null)
			return { success: false, error: message, data: null }
		} finally {
			setIsSubmitting(false)
		}
	}

	const value = {
		lastSubmittedData,
		lastBackendResponse,
		backendError,
		isSubmitting,
		submitCricketKitData,
	}

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = () => {
	const context = useContext(GlobalContext)

	if (!context) {
		throw new Error('useGlobalContext must be used within GlobalContextProvider')
	}

	return context
}
