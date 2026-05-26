const contentOptions = ['Short Video', 'Long Video', 'Image Post', 'Carousel Post']

const PreferredContentFormatFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Preferred Content Format</span>
      <select name="preferred_content_format" value={value} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(error)}>
        <option value="">Select format</option>
        {contentOptions.map((format) => (
          <option key={format} value={format}>
            {format}
          </option>
        ))}
      </select>
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default PreferredContentFormatFeature