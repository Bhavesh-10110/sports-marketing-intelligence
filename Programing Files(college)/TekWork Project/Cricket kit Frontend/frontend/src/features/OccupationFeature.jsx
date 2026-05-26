const occupationOptions = ['Student', 'Working Professional', 'Business', 'Athlete', 'Coach']

const OccupationFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Occupation</span>
      <select name="occupation" value={value} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(error)}>
        <option value="">Select occupation</option>
        {occupationOptions.map((occupation) => (
          <option key={occupation} value={occupation}>
            {occupation}
          </option>
        ))}
      </select>
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default OccupationFeature