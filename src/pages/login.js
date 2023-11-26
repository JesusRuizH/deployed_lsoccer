import { useState } from "react";
import {userServiceFactory} from "../../clientServices/userService";
import useUser from "../../lib/useUser";

const userService = userServiceFactory();

export default function Login() {
    const { user, mutateUser } = useUser({
        redirectTo: "/",
        redirectIfFound: true,
    });
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            mutateUser(
                await userService.login(username, password)
            );
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    const usernameHandler =  (e) => {
        setUsername(e.target.value);
    }

    const passwordHandler =  (e) => {
        setPassword(e.target.value);
    }

    return <div>
        {!user ? (<h1>Loading....</h1>) : 
                <>{!user.isLoggedIn && <form className="border-0 bg-gradient-to-r from-indigo-700 from-10% via-sky-800 via-30% to-gray-800 to-80%" onSubmit={handleSubmit}>

                        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                                <h1 className="text-3xl font-semibold text-center text-gray-800">
                                    Live Soccer
                                </h1>
                                <label 
                                htmlFor="uname"
                                className="block text-sm font-semibold text-gray-800"
                                ><b>Username</b></label>
                                <input 
                                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                type="text" placeholder="Enter Username" name="uname" required
                                    onChange={usernameHandler}/>

                                <label 
                                className="block text-sm font-semibold text-gray-800"
                                htmlFor="psw"><b>Password</b></label>
                                <input 
                                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                type="password" placeholder="Enter Password" name="psw" required
                                    onChange={passwordHandler}/>

                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-purple-blue"
                                        type="submit"
                                        
                                        >Login</button>
                                <a
                                    href="#"
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Forget Password?
                                </a>
                            </div>
                            
                        </div>
                </form>}</>}
    </div>;
}
