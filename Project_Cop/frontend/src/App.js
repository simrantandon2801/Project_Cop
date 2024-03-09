// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Image from 'mui-image'
import Final from './App2';
import {Route,Routes} from 'react-router-dom'
import Landingpage from './Landingpage';

function App() {


  return (
	  <Routes>
    <Route path='/landing' element={<Final/>} />
    <Route path='/' element={<Landingpage/>} />
    </Routes>
  );
}

export default App;
