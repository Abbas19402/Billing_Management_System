import axios from 'axios'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const base_url = "https://billing-management-server.vercel.app/api"

const useAuth = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ loading, setLoading ] = useState(false)

    const login = async (email, password) => {
        const response = await axios.request({
            method: 'POST',
            url: `${base_url}/auth/login`,
            data: {email,password}
        })
    
        if (response.status == 200) {
            setLoading(false)
            const userData = response.data.user
            setIsLoggedIn(true);
            localStorage.setItem('user', JSON.stringify(userData));
            router.push('/dashboard')
        } else {
            setLoading(false)
            console.error('Login failed:', response.statusText);
        }
    }
    
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        router.push('/')
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setIsLoggedIn(true);
        }
    },[])
    return {
        login, logout
    }
}

export default useAuth