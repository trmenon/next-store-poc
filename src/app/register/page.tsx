import React from "react";
import { RegisterForm } from "@/components/mounts";

const Register: React.FC = ()=> {
    return(
        <React.Fragment>
            <div className="page-wrapper center-flex">
                <div className="card">
                    <div className="label">Register</div>
                    <div style={{width: '100%'}}>
                        <RegisterForm/>
                    </div>                    
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default Register;