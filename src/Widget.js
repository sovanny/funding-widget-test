import React, { useState } from 'react';
import './Widget.css';

/*utility function that could be placed in other file
but kept here because it's small*/
const isPositiveInteger = input => {
  if (isNaN(input)) return false;
  if (!Number.isInteger(Number(input))) return false;
  if (Number(input) < 1) return false;
  return true;
};

const Widget = () => {
  const [funds, setFunds] = useState(0);
  const [pledgeSum, setPledgeSum] = useState('');
  const [showError, setShowError] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [hasPledged, setHasPledged] = useState(false);

  const handleUserInput = e => {
    //if input is valid or field is empty, set value and remove message
    if (isPositiveInteger(e.target.value) || e.target.value === '') {
      setPledgeSum(e.target.value);
      setShowError(false);
    } else {
      //show error when faulty input is typed
      setNotificationMessage('Please pledge only whole dollar amounts! ');
      setShowError(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    //if field is empty when submitting, show error
    if (!pledgeSum) {
      setNotificationMessage('Please pledge only whole dollar amounts! ');
      setShowError(true);
    } //if error message is NOT showing, pledge is valid
    else if (!showError) {
      setNotificationMessage('Thank you for your pledge! ');
      setFunds(funds + Number(pledgeSum));
      setHasPledged(true);
      setPledgeSum('');
    }
    // else case: error message is showing - do not submit (do nothing)
  };

  const progressBarStyles = {
    width: `${Math.min(funds / 10, 100)}%`,
    backgroundColor: `${funds >= 1000 ? '#1CBC2C' : '#EF5F3C'}`
  };

  return (
    <div className="widget">
      <div className="tooltip">
        {funds >= 1000 ? (
          <strong>Goal reached!</strong>
        ) : (
          <>
            <strong>{funds / 10}%</strong> of the goal funded
          </>
        )}
      </div>
      <div className="boxFrame">
        <div className="progressBar_container">
          <div className="progressBar_bar" style={progressBarStyles}></div>
        </div>
        <div className="boxFrame_content">
          <p>
            Only 3 days left to fund this project,
            <strong>{` $${funds} `}</strong>
            has been raised towards the goal to raise
            <strong> $1000</strong>.
          </p>
          <p>
            Pledge money by entering the sum in the field below and press
            pledge, we already know your credit card details.
          </p>
          {!hasPledged && (
            <form>
              <input type="text" onChange={handleUserInput} />
              <input onClick={handleSubmit} type="submit" value="Pledge" />
            </form>
          )}
          {(hasPledged || showError) && (
            <div className={`notification ${hasPledged ? 'success' : 'fail'}`}>
              {notificationMessage}
              {hasPledged && (
                <div
                  className="close-btn"
                  role="button"
                  onClick={() => setHasPledged(false)}
                >
                  Close
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
