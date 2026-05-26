const MatchesWatchedPerSeasonFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Matches Watched Per Season</span>
      <input
        type="number"
        name="matches_watched_per_season"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min="0"
        max="74"
        step="1"
        placeholder="For example, 30"
        aria-invalid={Boolean(error)}
      />
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default MatchesWatchedPerSeasonFeature