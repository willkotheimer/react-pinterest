import React from 'react';
import BoardContainer from '../components/BoardContainer';
import Auth from '../components/Auth';

export default function PinDetails({ authed }) {
  const loadComponent = () => {
    let component = '';
    if (authed) {
      component = <BoardContainer />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return <div>Pin Details{loadComponent()}</div>;
}
