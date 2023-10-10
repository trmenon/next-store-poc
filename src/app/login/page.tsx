import React from "react";
import { LoginForm } from "@/components/mounts";

const Login: React.FC = ()=> {
    return(
        <React.Fragment>
            <div className="page-wrapper center-flex">
                <div className="card">
                    <div className="label">Login</div>
                    <div style={{width: '100%'}}>
                        <LoginForm/>
                    </div>                    
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;