const SportsEquipmentSpendingPerMonthFeature = ({ value, error, onChange, onBlur }) => {
  return (
    <label className="field">
      <span>Sports Equipment Spending Per Month</span>
      <input
        type="number"
        name="sports_equipment_spending_per_month"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min="0"
        step="0.1"
        placeholder="For example, 5500"
        aria-invalid={Boolean(error)}
      />
      {error ? <small>{error}</small> : null}
    </label>
  )
}

export default SportsEquipmentSpendingPerMonthFeature