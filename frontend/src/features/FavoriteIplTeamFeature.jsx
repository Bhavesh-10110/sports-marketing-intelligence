const teamOptions = [
  'Mumbai Indians',
  'Royal Challengers Bengaluru',
  'Kolkata Knight Riders',
  'Delhi Capitals',
  'Rajasthan Royals',
  'Sunrisers Hyderabad',
  'Chennai Super Kings',
  'Lucknow Super Giants',
  'Gujarat Titans',
  'Punjab Kings',
]

const FavoriteIplTeamFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Favorite IPL Team</span>
      <select name="favorite_ipl_team" value={value} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(error)}>
        <option value="">Select team</option>
        {teamOptions.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default FavoriteIplTeamFeature