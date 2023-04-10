type InputProps = {
    type: string,
    value?: string,
    placeholder?: string,
    id: string,
    classname:string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: any,
}

const InputField = ({type, value, placeholder, classname, onChange, onBlur, id}: InputProps) => {
  return (
    <input id={id} className={classname} type={type} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur} ></input>
  )
}

export default InputField