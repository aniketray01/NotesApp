import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { add, update } from '../redux/Slice';
import { nanoid } from "@reduxjs/toolkit";

const Home = () => {
    const [Title, setTitle] = useState('');
    const [value, setvalue] = useState('');
    const [searchParam, setsearchParam] = useSearchParams();
    const pastid = searchParam.get("pasteid");
    const dispatch = useDispatch();
    const allpastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (!pastid) {
            setTitle("");
            setvalue("");
        };

        const paste = allpastes.find((p) => p.id === pastid);
        if (paste) {
            setTitle(paste.Title);
            setvalue(paste.value);

        }

    }, [pastid, allpastes]);
    function Create() {
        const data = { Title, value, id: pastid || nanoid(), createdAt: new Date().toISOString() };
        if (pastid) {
            dispatch(update(data));

        }
        else {
            dispatch(add(data));
        }
        setTitle('');
        setvalue('');
        setsearchParam({});
    }
    return (
        <div>
            <input
                type="text"
                placeholder='Enter Title here'
                value={Title}
                style={{ width: 500, padding: 10, margin: 20, border: '5px solid white' }}
                onChange={(e) => { setTitle(e.target.value) }}
            />
            {/* value :{Title} */}

            <button style={{ border: '3px solid white' }} onClick={Create}>
                {pastid ? "Update" : "Create"}

            </button>
            <br />
            <div>
                <textarea
                    value={value}
                    placeholder='Enter text'
                    //   type='text'    
                    onChange={(e) => { setvalue(e.target.value) }}
                    style={{ width: 500, padding: 10, margin: 20, border: '5px solid white' }}
                    rows={10} ></textarea>

            </div>
            {/* {value} */}


        </div>
    )
}

export default Home
