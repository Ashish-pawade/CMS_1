import React, { useEffect, useState } from 'react';
import axiosWrapper from '../../utils/AxiosWrapper';

export default function HostelDetails(){
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(()=>{
    if(!user || !user._id){ setLoading(false); return; }
    (async()=>{
      try{
        const res = await axiosWrapper.get(`/api/hostel/student-details/${user._id}`);
        setData(res.data);
      }catch(e){ console.error(e); setData(null); }
      setLoading(false);
    })();
  },[user]);

  if(loading) return <div className="container">Loading...</div>;
  if(!data) return <div className="container">No hostel data linked.</div>;

  return (
    <div className="container">
      <h2>Hostel Details</h2>
      <p><b>Hostel:</b> {data.hostelName || data.name}</p>
      <p><b>Room:</b> {data.roomNumber || data.room}</p>
      <p><b>Warden:</b> {data.wardenName || data.warden}</p>
    </div>
  )
}
