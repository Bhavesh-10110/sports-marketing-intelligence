const cityOptions = [
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Jaipur',
  'Pune',
  'Lucknow',
  'Delhi',
  'Indore',
  'Chennai',
  'Ahmedabad',
  'Kolkata',
  'Patna',
  'Nagpur',
  'Surat',
  'Kanpur',
  'Bhopal',
  'Chandigarh',
  'Visakhapatnam',
  'Coimbatore',
  'Kochi',
  'Noida',
  'Raipur',
  'Vadodara',
  'Ludhiana',
  'Thane',
]

const CityFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>City</span>
      <select name="city" value={value} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(error)}>
        <option value="">Select city</option>
        {cityOptions.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default CityFeature