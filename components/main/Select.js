//https://www.robinwieruch.de/react-checkbox/
const Select = ({label, value, options, onChange}) => {
    return (
        <div className="row">
            { label ? <label className="col-4 col-form-label pr-0">Guds navn</label> : <></> }
            <div className={ label ? "col-8" : "col-12"}>
                <select value={value} className="form-select" onChange={onChange}>
                    {(Array.isArray(options)) ? (options.map((option, i) => 
                        <option key={i} value={option}>{option}</option>
                    )) : ""}
                </select>
            </div>
        </div>
    )
}

export default Select;