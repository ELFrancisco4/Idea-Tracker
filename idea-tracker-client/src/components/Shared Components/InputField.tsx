type InputProps = {
    type: string,
    value?: string,
    placeholder?: string
}

const InputField = ({type, value, placeholder}: InputProps) => {
  return (
    <input type={type} value={value} placeholder={placeholder}></input>
  )
}

export default InputField