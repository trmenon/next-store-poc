"use client";
import FetchButton from "@/components/fetch-button";
import { useRouter } from "next/navigation";
import { MailIcon } from "@/components/icons";
import './VerifyClient.styles.css';

export const VerifyClient: React.FC = ()=> {
    const router = useRouter();

    return(
        <div className="verify-card">
            <MailIcon width={128} height={128}/>
            <h3>Welcome, Jane Doe</h3>
            <FetchButton
                label = {'Verify your email'}
                bufferLabel = {'Verifying...'}
                method = {'PUT'}
                data = {{}}
                url = {'/api/users/verify'}
                onSuccess = {()=> router.push('/')}
            />
        </div>
    )
}