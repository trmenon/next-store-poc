"use client";
import React, {useState} from "react";
import { toast } from "react-hot-toast";
import Loader from "./loader";
import './FetchButton.styles.css';

interface FetchButtonProps {
    label: string;
    bufferLabel: string;
    method: string;
    data: object;
    url: string;
    onSuccess: ()=> void;
}

enum requestMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
}

const FetchButton: React.FC<FetchButtonProps> = ({
    label,
    bufferLabel,
    method,
    data,
    url,
    onSuccess
})=> {
    // State
    const [loading, setLoading] = useState(false);

    // On Click Event Handler
    const onClick = ()=> {
        setLoading(true);
        let options: any = {
            method: method, // *GET, POST, PUT, DELETE, etc.
            headers: {"Content-Type": "application/json",},
        };
        if (method !== requestMethod.GET) {
            options = {
              ...options,
              body: data ? JSON.stringify(data) : null,
            };
        }
        try{
            fetch(url, options)
                .then((resp: any)=> resp.json())
                .then((data: any)=> {
                    if(data.status === 200) {
                        setLoading(false);
                        toast.success(data.message || 'Your request has been successful');
                        onSuccess();
                    }
                })
                .catch((error: any)=> {
                    console.log('[ERROR: API] API Failed');
                    console.log(error);
                    toast.error('Unable to process request at the moment. Please try after sometime');
                })
        }catch(err) {
            console.log('[ERROR] Fetch-Button api call error');
            console.log(err);
        }
    }

    // RENDERER
    return(
        <button 
            className="fetch-button"
            disabled={loading} 
            onClick={onClick}
        >
            {
                loading && (<Loader/>)
            }
            <h6>{loading? bufferLabel: label}</h6>
        </button>
    )
}

export default FetchButton;