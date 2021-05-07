import React, {useState} from 'react';
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';
import { PrimaryButton, SecondaryButton} from '../components/Button.jsx'

export default function  Header (){

    const [user, setUser] = useState({})

	const loginSuccess = (rep) => {
        setUser(rep)
	}
    const logout = async () => {
        setUser({})
    }

	return (
        <div className="header">
            {user.name ? 
                <div className='flex'>
                    <p className="h4 center">
                        Bonjour {user.name}
                    </p>
                    <div className="flex">
                        <div className="mr1">
                            <SecondaryButton size='small'>
                                Paramètre
                            </SecondaryButton> 
                        </div>
                        <div>                        
                            <PrimaryButton size='small' onClick={logout}>
                                Déconnexion
                            </PrimaryButton> 
                        </div>
                    </div>
                </div> : 
                <div className='flex'>
                    <div>
                        
                    </div>
                    <div className="flex">
                        <div className="mr1">
                            <SignUp signupSuccess={loginSuccess}></SignUp>
                        </div>
                        <div>
                            <SignIn signinSuccess={loginSuccess}></SignIn>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
};
