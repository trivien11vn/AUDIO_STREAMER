import { useState } from "react";
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useSelector, useDispatch} from 'react-redux'
import { Home, Login, Public, Personal, Album} from "./pages/public";
import {Route, Routes} from 'react-router-dom'
import path from "./utils/path";
import { useEffect } from "react";
import {getHome} from './store/actions'


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHome())
  }, [])
  
  return (
    <>
    <div className="">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.MY_MUSIC} element={<Personal />} />
          <Route path={path.ALBUM__TITLE__ID} element={<Album />} />
          <Route path={path.PLAYLIST__TITLE__ID} element={<Album />} />

          <Route path={path.STAR} element={<Home />} />
        </Route>
      </Routes>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </>
    
  );
}

export default App;
