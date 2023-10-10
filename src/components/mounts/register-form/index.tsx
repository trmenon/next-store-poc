"use client";
import React, {useState} from "react";
import { Input } from "@/components";
import Link from "next/link";
import { Spinner } from "@/components/spinner";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const RegisterForm:React.FC = ()=> {
    // GLOBALS
    const router = useRouter();
    // STATE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);

    // Updater
    const trackChanges = (value: string, name: string)=> {
        if(name === 'email') {
            setEmail(value);
        }
        if(name === 'password') {
            setPassword(value);
        }
        if(name === 'firstName') {
            setFirstName(value);
        }
        if(name === 'lastName') {
            setLastName(value);
        }
    }

    // EVENTS
    const submitForm = async (event: React.FormEvent)=> {
        event.preventDefault();
        try{
            setLoading(true);
            const data = {email: email, password: password, firstName: firstName, lastName: lastName};
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            };
            fetch("/api/users/register", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('Response data:', data);
                    if(data) {
                        if(data.success === true && data.status === 200) {
                            toast.success(data.message);
                            router.push('/login');
                        }else {
                            toast.error(data.message);
                        }
                    }
                    
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.error("Unable to register at the moment. Please try after some time");
                })
                .finally(()=> setLoading(false));
        }catch(err) {
            console.log(err);
        }
    }

    // RENDER
    return(
        <React.Fragment>
            {
                loading &&(
                    <Spinner/>
                )
            }
            <div className="form-wrapper">
                <form onSubmit={submitForm}>
                    <div className="form-fields">           
                        <Input
                            name = {'firstName'}
                            value = {firstName}
                            type = {'text'}
                            label = {'First Name'}
                            placeholder = {'First name'}
                            required = {true}
                            onChange={trackChanges}
                        />         
                        <Input
                            name = {'lastName'}
                            value = {lastName}
                            type = {'text'}
                            label = {'Last Name'}
                            placeholder = {'Last Name'}
                            required = {true}
                            onChange={trackChanges}
                        />         
                    </div>
                    <div className="form-fields">           
                        <Input
                            name = {'email'}
                            value = {email}
                            type = {'email'}
                            label = {'Email'}
                            placeholder = {'Enter your email'}
                            required = {true}
                            onChange={trackChanges}
                        />         
                    </div>
                    <div className="form-fields">           
                        <Input
                            name = {'password'}
                            value = {password}
                            type = {'password'}
                            label = {'Password'}
                            placeholder = {'Secure your password'}
                            required = {true}
                            onChange={trackChanges}
                        />         
                    </div>
                    <div className="form-action">
                        <input 
                            type="submit"
                            value={'Register'}
                            disabled={loading}
                        />
                    </div>
                </form>
                <Link href='/login'>Take me to Login</Link>
            </div>
            
        </React.Fragment>
    )
}