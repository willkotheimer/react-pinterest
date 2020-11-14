import React from 'react';
import BoardContainer from '../components/BoardContainer';
import Auth from '../components/Auth';

export default function BoardForm({ authed }) {
  const loadComponent = () => {
    let component = '';
    if (authed) {
      component = <BoardContainer />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return <div>Board Form{loadComponent()}</div>;
}
