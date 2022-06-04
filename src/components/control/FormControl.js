function FormControl(props) {
    return (
      <div className="form-group row mb-3">
        <label htmlFor={props.id} className="col-sm-2 col-form-label">
          {props.label}
        </label>
        <div className="col-sm-10">
          <input
            id={props.id}
            className="form-control"
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            min={props.min}
            max={props.max}
            placeholder={props.placeholder}
          />
        </div>
      </div>
    );
  }
  
  export default FormControl;
  