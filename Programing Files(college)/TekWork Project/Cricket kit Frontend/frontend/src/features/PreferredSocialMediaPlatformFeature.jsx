const socialOptions = ['Instagram', 'YouTube', 'Facebook', 'Twitter']

const PreferredSocialMediaPlatformFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Preferred Social Media Platform</span>
      <select name="preferred_social_media_platform" value={value} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(error)}>
        <option value="">Select platform</option>
        {socialOptions.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default PreferredSocialMediaPlatformFeature