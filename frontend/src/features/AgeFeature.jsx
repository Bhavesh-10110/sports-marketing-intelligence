const AgeFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Age</span>
      <input
        type="number"
        name="age"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min="10"
        max="60"
        step="1"
        placeholder="Enter Age"
        aria-invalid={Boolean(error)}
      />
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default AgeFeature