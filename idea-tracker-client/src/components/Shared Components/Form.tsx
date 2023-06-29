type FormProps = {
  children: any,
  onSubmit: any
}

const Form = ({children, onSubmit}:FormProps) => {
  return (
    <form onSubmit={onSubmit}>
        {children}
    </form>
  )
}

export default Form