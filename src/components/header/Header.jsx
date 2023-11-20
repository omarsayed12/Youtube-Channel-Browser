import { useState } from 'react';
import logo from '../../images/logo.svg';
import './Header.css'
    
const Header = ({submitHandler}) => {
    const [channelId, setChannelId] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        submitHandler(channelId);
    }

    return (
        <header>
            <span className='logo-wrapper'>
                <img
                    src={logo}
                    alt='Logo'
                />
            </span>

            <form className='search-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    id='search'
                    value={channelId}
                    onChange={(e)=> setChannelId(e.target.value)}
                    placeholder='search...'
                    required
                />
                <button
                    type='submit'
                    className='submit-btn'
                >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14ZM8 12V7l4 2.5L8 12Z"/></svg>
                </button>
            </form>
        </header>
    );
};

export default Header;
