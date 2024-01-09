import React, { useState } from 'react';
import axios from 'axios';

const LonginForm = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit =  async (e) => {
        e.preventDefault();
        //username / password => chatengine -> give messages
        const authObject = {'Project-ID': "2899873d-1b11-4d59-9f52-1a919c6465a5", 'User-Name': userName, 'User-Secret': password};
        try{
            await axios.get('https://api.chatengine.io/chats', {headers: authObject});        
            // works out -> logged in
            localStorage.setItem('username', userName);
            localStorage.setItem('password', password);

            window.location.reload();
        }catch(error){// error -> try with new username
            setError('Oops, incorrect credentials.');
        }
    }
    return(
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>
                    ChatApp
                </h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} className = 'input' placeholder= "Username" required/>
                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} className = 'input' placeholder= "Password" required/>
                    <div align = "center">
                        <button type='submit' className='button'>
                            <span>Start Chatting</span>
                        </button>
                        <h2 className='error'> {error} </h2>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LonginForm;