import axios from "axios";
import {cookies} from 'next/headers';
export async function getUser() {
  try{
    const token = cookies().get("token")?.value;
    const res:any = await axios.get('http://localhost:3000/api/users/me', {
      headers: {
        Cookie: `token=${token}`
      }
    });
    return res.data.data;
    
    
  }catch(err) {
    console.log('[ERROR] Calling for user information');
    console.log(err);
    return null;
  }
}
export default async function Home() {  
  const user = await getUser();
  
  // RENDER
  return (
    <div>
      <h2>Hi, {user?.email}</h2>      
      
    </div>
  )
}
