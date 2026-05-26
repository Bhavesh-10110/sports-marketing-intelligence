const SportsContentWatchHoursPerWeekFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Sports Content Watch Hours Per Week</span>
      <input
        type="number"
        name="sports_content_watch_hours_per_week"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min="0"
        max="60"
        step="1"
        placeholder="For example, 18"
        aria-invalid={Boolean(error)}
      />
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default SportsContentWatchHoursPerWeekFeature