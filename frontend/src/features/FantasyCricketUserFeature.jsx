const FantasyCricketUserFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <fieldset className="field fieldset">
      <legend>Fantasy Cricket User</legend>
      <div className="option-row">
        <label>
          <input type="radio" name="fantasy_cricket_user" value="Yes" checked={value === 'Yes'} onChange={onChange} onBlur={onBlur} />
          Yes
        </label>
        <label>
          <input type="radio" name="fantasy_cricket_user" value="No" checked={value === 'No'} onChange={onChange} onBlur={onBlur} />
          No
        </label>
      </div>
      {error ? <small>{error}</small> : null}
    </fieldset>
  )
}

export default FantasyCricketUserFeature