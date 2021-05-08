import React, {useCallback, useEffect, useState} from 'react';
import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';
import { PrimaryButton, SecondaryButton} from '../components/Button.jsx'

export default function  Header ({logged}){

    const [user, setUser] = useState({})
    const [tryReload, setTryReload] = useState(false)

    useEffect((async () => {
        const u = localStorage.getItem('user')
        if(u){
            const t = JSON.parse(u)
            if(t.name){
                setUser(t)
                logged(true)
                setTryReload(true)
            }
        }
    }), [tryReload])

	const loginSuccess = (rep) => {
        localStorage.setItem('user', JSON.stringify(rep))
        setUser(rep)
        logged(true)
	}
    const logout = async () => {
        localStorage.clear()
        setUser({})
        logged(false)
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