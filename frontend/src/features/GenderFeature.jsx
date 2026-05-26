const GenderFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Gender</span>
      <select name="gender" value={value} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(error)}>
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default GenderFeature