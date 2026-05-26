const MonthlyIncomeFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Monthly Income</span>
      <input
        type="number"
        name="monthly_income"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min="1"
        step="1"
        placeholder="For example, 85000"
        aria-invalid={Boolean(error)}
      />
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default MonthlyIncomeFeature