"use client";
import React from "react";
import Link from "next/link";
import {usePathname, useRouter} from 'next/navigation';
import { Toaster, toast } from "react-hot-toast";
import {checkPublicPage} from '@/helpers/isPublicRoute';
import axios from "axios";

export const LayoutProvider: React.FC<{children: React.ReactNode}>=({children})=> {
    const path = usePathname();
    const router = useRouter();

    const hideHeader = checkPublicPage(path);
    const onLogout = async ()=> {
        await axios.post("/api/users/logout", {});
        toast("Logged out");
        router.push("/");
    }
    return(
        <React.Fragment>
            <Toaster/>
            <div>
                {
                    !hideHeader && (
                        <div className="header">
                            <div className="header-container">
                                <h4>Next Starter App</h4>
                                <div className='link-container'>
                                    <Link href="/">Home</Link>
                                    <Link href="/profile">Profile</Link>
                                    <button onClick={onLogout}>Sign Out</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                
                <div className="main">
                    <div className="main-container">
                        <div className="children">
                            {children}
                        </div>            
                    </div>
                </div>               
            </div>
        </React.Fragment>
    )
}