import { loginFields } from "../../constants/loginFormFields";
import Input from "./Input";
import { useEffect, useState } from "react";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";


const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const {login, isLoading, error, successful} = useLogin();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async () => {
        await login(loginState.email_address, loginState.password)
    }

    useEffect(() => {
        if(successful){
            setTimeout(() => {
                setLoginState(fieldsState)
                    if(loginState.email_address === 'mirianangelk@gmail.com'){
                        navigate('/cook')
                    }else{
                        navigate('/tickets')
                    }
                
            }, 3000);
        }
    }, [successful, navigate, loginState.email_address]);


    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-1">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
            </div>

            <FormExtra/>
        <FormAction handleSubmit={handleSubmit} type="Button"  text="Login"  isLoading={isLoading}/>

        <div>{error}</div>

        </form>
    )
}