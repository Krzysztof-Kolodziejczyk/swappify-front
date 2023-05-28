import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        setAuth(prev => console.log(JSON.stringify(prev)));
        const response = await axios.get('/token/refresh', {
            withCredentials: true
        });

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.token);
            return {...prev, token: response.data.token}
        });

        return response.data.token;
    };
}

export default useRefreshToken;