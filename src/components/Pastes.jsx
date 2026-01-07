import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {remove} from '../redux/Slice'
import ViewPastes from './ViewPastes';
import { useNavigate } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

const Pastes = () => {
  const allpaste = useSelector((state) => state.paste.pastes);
const dispatch=useDispatch();
const Removed=(data)=>{
     dispatch(remove(data));
    
}
const navigate = useNavigate();

  return (
    <div>
       {allpaste.length === 0 && <p>No pastes found</p>}
      {allpaste.map((paste) => (
  <div key={paste.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }} >
    <h3>{paste.Title}</h3>
    <p>{paste.value}</p> 
    
    <button style={{margin:10}} onClick={() => Removed(paste.id)}>Delete</button>
    <button style={{margin:10}} onClick={() => navigate(`/?pasteid=${paste.id}`)}>Edit</button>
    <CopyToClipboard text={paste.Title} onCopy={()=>toast.success("Copied")}>
    <button style={{margin:10}}>Copy</button>
    </CopyToClipboard>
    <button style={{margin:10}} onClick={()=>navigate(`/viewpastes?id=${paste.id}`)}> View</button>
    
   
  </div>
))}
    </div>
  )
};

export default Pastes
