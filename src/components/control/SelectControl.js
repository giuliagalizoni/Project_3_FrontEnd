function SelectControl(props) {
  return (
    <div className="form-container">
      <label className={props.labelclass} htmlFor={props.id}>
        {props.label}
      </label>
      <select
        className="input"
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        multiple={props.multiple}
      >
        {props.children}
      </select>
    </div>
  );
}

export default SelectControl;
