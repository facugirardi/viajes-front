import {toast} from 'react-toastify';

export default async function googleAuth(){
    try{
		const url = `https://api.vaidteam.com/api/o/google-oauth2/?redirect_uri=${
			process.env.NODE_ENV === 'production'
				? 'https://vaidteam.com'
        : 'https://vaidteam.com'
		}/auth/google`;

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
			credentials: 'include',
		});
		const data = await res.json();

		if (res.ok) {
			window.location.replace(data.authorization_url);
		} else {
			toast.error('Something went wrong');
		}
    }
    catch{
        toast.error('Something went wrong')
    }
}
