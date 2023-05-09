//https://www.robinwieruch.de/react-checkbox/
const Select = ({label, value, options, onChange}) => {
    return (
        <div className="row m-0">
            { label ? <span className="col-4 align-self-center p-0">{label}</span> : <></> }
            <div className={ label ? "col-8 px-0" : "col-12 px-0"}>
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