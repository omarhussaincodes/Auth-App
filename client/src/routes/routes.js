import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Recover from '../components/Recover';
import Reset from '../components/Reset';
import Sigin from '../components/Sigin';
import Signup from '../components/Signup';

const createRoutes = () => (
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Sigin />} />
        <Route path='/recoverpassword' element={<Recover />} />
        <Route path='/reset' element={<Reset />} />
        {/* <Route path='/user' component={ } > */}
        {/* </Route> */}
        <Route path='*' element={null} />
    </Routes >
);

export default createRoutes;
