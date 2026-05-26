const activityOptions = ['High', 'Medium', 'Low']

const SocialMediaActivityDuringMatchesFeature = ({ value, error, onChange }) => {
  return (
    <fieldset className="field fieldset">
      <legend>Social Media Activity During Matches</legend>
      <div className="option-row activity-row">
        {activityOptions.map((level) => (
          <label key={level}>
            <input type="radio" name="social_media_activity_during_matches" value={level} checked={value === level} onChange={onChange} />
            {level}
          </label>
        ))}
      </div>
      {error ? <small>{error}</small> : null}
    </fieldset>
  )
}

export default SocialMediaActivityDuringMatchesFeature