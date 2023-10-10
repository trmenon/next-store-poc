import { VerifyClient } from '@/components/mounts';

const VerifyEmail: React.FC = ()=> {
    
    // RENDERER
    return(
        <div 
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <VerifyClient/>
        </div>
    )
}

export default VerifyEmail;