import React, { useState } from 'react';
import axiosWrapper from '../utils/AxiosWrapper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_DATA, USER_TOKEN } from '../redux/action';

export default function Login(){
  const [form,setForm] = useState({ email:'', password:''});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiPost = async(url,payload) => {
    try{
      const res = await axiosWrapper.post(url,payload);
      return res.data;
    }catch(e){ console.error(e); return null; }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const f = await apiPost('/api/details/faculty/login', form);
    if(f && f.success && f.data){
      const { token, user } = f.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: USER_TOKEN, payload: token });
      dispatch({ type: USER_DATA, payload: user });
      if(user.designation === 'Hostel Administrator'){
        window.location.href = (import.meta.env.VITE_HMS_ADMIN_URL || '/hms-admin');
        return;
      }
      navigate('/student');
      return;
    }
    const s = await apiPost('/api/details/student/login', form);
    if(s && s.success && s.data){
      const { token, user } = s.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: USER_TOKEN, payload: token });
      dispatch({ type: USER_DATA, payload: user });
      navigate('/student');
      return;
    }
    alert('Invalid credentials');
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={form.email} name="email" onChange={(e)=>setForm({...form, email:e.target.value})} required />
        </div>
        <div style={{marginTop:8}}>
          <label>Password</label>
          <input value={form.password} name="password" type="password" onChange={(e)=>setForm({...form, password:e.target.value})} required />
        </div>
        <button type="submit" style={{marginTop:12}}>Login</button>
      </form>
    </div>
  )
}
