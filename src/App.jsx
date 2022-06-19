import './App.css';
import Sidebar from './components/Siderbar/Sidebar';
import Feed from './components/Feed/Feed';
import Widgets from './components/Widgets/Widgets';
import { useStateValue } from './StateProvider';
import Login from './components/Login/Login';
import { useState, useEffect } from 'react';
import { RecoilRoot, atom } from 'recoil';
import ShowImage from './components/ShowImage/ShowImage';

export default function App() {

  const [{ user }, dispatch] = useStateValue();

  const size = atom({
    key: 'size',
    default: window.innerWidth,
  })

  const showImage = atom({
    key: 'showImage',
    default: false
  });
  
  const setImage = atom({
    key: 'setImage',
    default: ''
  })

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <RecoilRoot>
          <ShowImage showImage={showImage} setImage={setImage} />
          <div className="app__body">
            <Sidebar size={size} />
            <Feed showImage={showImage} setImage={setImage} size={size} />
            <Widgets/>
          </div>
        </RecoilRoot>
      )}

    </div>
  );
}

