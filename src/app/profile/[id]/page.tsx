import React from "react";

const UserProfile: React.FC<any> = ({params})=> {
    // RENDER
    return(
        <React.Fragment>
            <h4>PROFILE page</h4>
            <h6>User {params.id}</h6>
        </React.Fragment>
    )
}

export default UserProfile;