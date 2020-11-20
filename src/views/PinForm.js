import React from 'react';
import PinsContainer from '../components/PinsContainer';
import Auth from '../components/Auth';

export default function PinForm({ authed }) {
  const loadComponent = () => {
    let component = '';
    if (authed) {
      component = <PinsContainer />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return <div>Pin Form{loadComponent()}</div>;
}
