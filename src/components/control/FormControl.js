import "./formControl.css";

function FormControl(props) {
  return (
    <div className="form-container">
      <label htmlFor={props.id} className={props.labelclass}>
        {props.label}
      </label>

      <input
        id={props.id}
        className="input"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        maxLength={props.max}
        // placeholder={props.placeholder}
      />
    </div>
  );
}

export default FormControl;
