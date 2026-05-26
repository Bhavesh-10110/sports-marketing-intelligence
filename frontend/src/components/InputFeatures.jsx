import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import AgeFeature from '../features/AgeFeature'
import CityFeature from '../features/CityFeature'
import OccupationFeature from '../features/OccupationFeature'
import MonthlyIncomeFeature from '../features/MonthlyIncomeFeature'
import FavoriteIplTeamFeature from '../features/FavoriteIplTeamFeature'
import MatchesWatchedPerSeasonFeature from '../features/MatchesWatchedPerSeasonFeature'
import SportsContentWatchHoursPerWeekFeature from '../features/SportsContentWatchHoursPerWeekFeature'
import SportsEquipmentSpendingPerMonthFeature from '../features/LikelyToBuyCricketKitFeature'

const initialFormState = {
  age: '',
  city: '',
  occupation: '',
  monthly_income: '',
  favorite_ipl_team: '',
  matches_watched_per_season: '',
  sports_content_watch_hours_per_week: '',
  sports_equipment_spending_per_month: '',
}

const getInitialErrors = () => ({
  age: '',
  city: '',
  occupation: '',
  monthly_income: '',
  favorite_ipl_team: '',
  matches_watched_per_season: '',
  sports_content_watch_hours_per_week: '',
  sports_equipment_spending_per_month: '',
})

const numericFieldValidators = {
  age: { min: 10, max: 60, integer: true, message: 'Age must be an integer between 10 and 60.' },
  monthly_income: { min: 1, integer: false, message: 'Monthly income must be a positive number.' },
  matches_watched_per_season: { min: 0, max: 74, integer: true, message: 'Matches watched must be a non-negative integer.' },
  sports_content_watch_hours_per_week: {
    min: 0,
    max: 60,
    integer: false,
    message: 'Watch hours must be a non-negative number.',
  },
  sports_equipment_spending_per_month: {
    min: 0,
    integer: false,
    message: 'Equipment spending must be a non-negative number.',
  },
}

const InputFeatures = () => {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState(getInitialErrors())
  const [submitMessage, setSubmitMessage] = useState('')
  const { submitCricketKitData, isSubmitting, backendError } = useGlobalContext()
  const navigate = useNavigate()

  const validateField = (name, value) => {
    if (numericFieldValidators[name]) {
      if (value === '' || value === null || value === undefined) {
        return 'This field is required.'
      }

      const numberValue = Number(value)
      const { min, max, integer, message } = numericFieldValidators[name]

      if (!Number.isFinite(numberValue)) {
        return message
      }

      if (integer && !Number.isInteger(numberValue)) {
        return message
      }

      if (numberValue < min || (max !== undefined && numberValue > max)) {
        return message
      }

      return ''
    }

    if (!String(value).trim()) {
      return 'This field is required.'
    }

    return ''
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }))

    setSubmitMessage('')
  }

  const handleBlur = (event) => {
    const { name, value } = event.target

    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = Object.entries(formData).reduce((accumulator, [name, value]) => {
      accumulator[name] = validateField(name, value)
      return accumulator
    }, getInitialErrors())

    setErrors(nextErrors)

    const hasErrors = Object.values(nextErrors).some(Boolean)

    if (hasErrors) {
      setSubmitMessage('Please fix the highlighted fields before submitting.')
      return
    }

    submitCricketKitData(formData).then((result) => {
      if (result.success) {
        navigate('/result', { state: { response: result.data } })
        return
      }

      setSubmitMessage(result.error || 'Unable to send data to the backend.')
    })
  }

  return (
    <section className="input-features-shell">

      <form className="input-features-card" onSubmit={handleSubmit} noValidate>
        <div className="input-features-header">
          <h2 className='font-extrabold tracking-wider text-5xl'>Cricket Kit Audience Form</h2>
          <p>Collect the backend feature columns with validated inputs and a clean centered layout.</p>
        </div>

        <div className="input-grid">
          <AgeFeature value={formData.age} error={errors.age} onChange={handleChange} onBlur={handleBlur} />
          <CityFeature value={formData.city} error={errors.city} onChange={handleChange} onBlur={handleBlur} />
          <OccupationFeature value={formData.occupation} error={errors.occupation} onChange={handleChange} onBlur={handleBlur} />
          <MonthlyIncomeFeature value={formData.monthly_income} error={errors.monthly_income} onChange={handleChange} onBlur={handleBlur} />
          <FavoriteIplTeamFeature value={formData.favorite_ipl_team} error={errors.favorite_ipl_team} onChange={handleChange} onBlur={handleBlur} />
          <MatchesWatchedPerSeasonFeature value={formData.matches_watched_per_season} error={errors.matches_watched_per_season} onChange={handleChange} onBlur={handleBlur} />
          <SportsContentWatchHoursPerWeekFeature value={formData.sports_content_watch_hours_per_week} error={errors.sports_content_watch_hours_per_week} onChange={handleChange} onBlur={handleBlur} />
          <SportsEquipmentSpendingPerMonthFeature value={formData.sports_equipment_spending_per_month} error={errors.sports_equipment_spending_per_month} onChange={handleChange} onBlur={handleBlur} />
        </div>

        {submitMessage || backendError ? <p className="submit-message">{submitMessage || backendError}</p> : null}

        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Data'}
        </button>
      </form>
    </section>
  )
}

export default InputFeatures
