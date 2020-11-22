import React from 'react';
import PinsForm from '../components/Forms/pinsForm';
import Auth from '../components/Auth';

export default function PinDetails({ authed }) {
  const loadComponent = () => {
    let component = '';
    if (authed) {
      component = <PinsForm />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return <div>Pin Details{loadComponent()}</div>;
}
