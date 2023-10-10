"use client";
import React, {useState} from "react";
import { Input } from "@/components";
import Link from "next/link";
import { Spinner } from "@/components/spinner";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const LoginForm:React.FC = ()=> {
    // GLOBALS
    const router = useRouter();

    // STATE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Updater
    const trackChanges = (value: string, name: string)=> {
        if(name === 'email') {
            setEmail(value);
        }
        if(name === 'password') {
            setPassword(value);
        }
    }

    // EVENTS
    const submitForm = (event: React.FormEvent)=> {
        event.preventDefault();
        try{
            setLoading(true);
            const data = {email: email, password: password};
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            };
            fetch("/api/users/login", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('Response data:', data);
                    if(data) {
                        if(data.status === 200) {
                            toast.success(data.message)
                            if(data?.success) {
                                router.push('/');
                            }
                        }
                    }                    
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.error("Unable to login at the moment. Please try after some time");
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
                            placeholder = {'Enter your password'}
                            required = {true}
                            onChange={trackChanges}
                        />         
                    </div>
                    <div className="form-action">
                        <input 
                            type="submit"
                            value={'Login'}
                            disabled={loading}
                        />
                    </div>
                </form>
                <Link href='/register'>Sign me up</Link>
            </div>
            
        </React.Fragment>
    )
}