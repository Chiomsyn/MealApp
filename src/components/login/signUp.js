import { useEffect, useState } from "react";
import { signupFields } from "../../constants/loginFormFields";
import Input from "./Input";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import FormAction from "./FormAction";

const fields = signupFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function SignUp(){
    const [signupState, setSignUpState] = useState(fieldsState);
    const {signup, error, isLoading, successful} = useSignup()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSignUpState({ ...signupState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

       registerUser()     
    }

    const registerUser = async () => {
        await signup(signupState.email_address, signupState.username, signupState.password)
    }

    
    useEffect(() => {
        if(successful){
            setTimeout(() => {
                setSignUpState(fieldsState)
                    navigate('/login')
                
            }, 3000);
        }
    }, [successful, navigate]);

        return(
            <form className="mt-8 space-y-6">
                <div className="">
                    {
                        fields.map(field =>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={signupState[field.id]}
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
    
            <FormAction handleSubmit={handleSubmit} type="Button" text="Register" isLoading={isLoading}/>
                    {error && <div>{error}</div>}
            </form>
        )

    
}