import React from 'react';
import PinsHome from '../components/PinsHome';
import Auth from '../components/Auth';
import Loader from '../components/Loader';

export default function Home({ user }) {
  const loadHome = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (!user) {
      component = (
        <>
          <Auth />
          <PinsHome />
        </>
      );
    } else {
      component = <Auth />;
    }
    return component;
  };

  return <div>Home page{loadHome()}</div>;
}
