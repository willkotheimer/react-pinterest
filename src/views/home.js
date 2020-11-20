import React from 'react';
import BoardContainer from '../components/BoardContainer';
import Auth from '../components/Auth';

export default function Home({ authed }) {
  const loadHome = () => {
    let component = '';
    if (authed) {
      component = <BoardContainer />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return <div>Home page{loadHome()}</div>;
}
