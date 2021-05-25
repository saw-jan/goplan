import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MainCalendar from './MainCalendar';

function MainCalendarWrapper() {
  const userObj = useSelector((state) => state.user);

  if (!userObj.id) {
    return <Redirect to='../' />;
  }

  return (
    <>
      <MainCalendar />
    </>
  );
}

export default MainCalendarWrapper;
