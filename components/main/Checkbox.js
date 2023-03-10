//https://www.robinwieruch.de/react-checkbox/
const Checkbox = ({label, value, onChange}) => {
    return (
        <div className="form-check">
            <label className="form-check-label">
                <input 
                    className="form-check-input"
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                />
                {label}
            </label>
        </div>
    )
}

export default Checkbox;