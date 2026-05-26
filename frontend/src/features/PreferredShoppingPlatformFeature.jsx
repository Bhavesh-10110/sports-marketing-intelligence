const shoppingOptions = ['Amazon', 'Flipkart', 'Brand Website', 'Local Store']

const PreferredShoppingPlatformFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Preferred Shopping Platform</span>
      <select name="preferred_shopping_platform" value={value} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(error)}>
        <option value="">Select platform</option>
        {shoppingOptions.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default PreferredShoppingPlatformFeature