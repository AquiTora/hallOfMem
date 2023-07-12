import { useEffect, useRef, useState } from "react";
import style from './Header.module.scss';

const Header = () => {
    const [searchRequest, setSearchRequest] = useState('');

    const handleSearchRequestChange = (e) => {
        setSearchRequest(e.target.value);
    }

    return (
        <div>
            <div className={style.header}>
                <h1 className={style.header__title}>Зал памяти</h1>
                <div className={`${style.header} + ${style.search }`}>
                    <input
                        name='request'
                        type='searchRequest'
                        onChange={handleSearchRequestChange}
                    />
                    <button>Поиск</button>
                </div>
            </div>
        </div>
    );
};

export default Header;