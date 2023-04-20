import { useState } from 'react';
import { useAuthContext } from './Auth.context';
import { GlobalMessage } from '../../components';
import clsx from 'clsx';
import styles from './Auth.module.css';

export function EditDetails() {
  const { user, token } = useAuthContext();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [fNameError, setFNameError] = useState('');
  const [lNameError, setLNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [retypePasswordError, setRetypePasswordError] = useState('');

  const [globalMessage, setGlobalMessage] = useState({ message: '', type: 'error' });

  function handleFNameUpdate(e) {
    e.preventDefault();

    if (!fName.trim()) {
      setFNameError('Please enter a valid first name.');
      return;
    }

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ fName }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('An error occurred while updating your first name.');
        }
      })
      .then((data) => {
        setFName(data.fName);
        setFNameError('');
        setGlobalMessage({ message: 'First name updated successfully!', type: 'success' });
      })
      .catch((err) => {
        setFNameError(err.message);
        setGlobalMessage({ message: err.message, type: 'error' });
      });
  }

  function handleLNameUpdate(e) {
    e.preventDefault();

    if (!lName.trim()) {
      setLNameError('Please enter a valid last name.');
      return;
    }

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ lName }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('An error occurred while updating your last name.');
        }
      })
      .then((data) => {
        setLName(data.lName);
        setLNameError('');
        setGlobalMessage({ message: 'Last name updated successfully!', type: 'success' });
      })
      .catch((err) => {
        setLNameError(err.message);
        setGlobalMessage({ message: err.message, type: 'error' });
      });
  }

  function handleEmailUpdate(e) {
    e.preventDefault();
  
    if (!email.trim()) {
      setGlobalMessage({ message: 'Please enter a valid email address.', type: 'error' });
      return;
    }
  
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ email }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('An error occurred while updating your email address.');
        }
      })
      .then((data) => {
        setEmail(data.email);
        setGlobalMessage({ message: 'Email updated successfully.', type: 'success' });
      })
      .catch((err) => {
        setGlobalMessage({ message: err.message, type: 'error' });
      });
  }
  function handlePasswordUpdate(e) {
    e.preventDefault();
  
    if (!password.trim()) {
      setPasswordError('Please enter a valid password.');
      return;
    }
  
    if (password !== retypePassword) {
      setRetypePasswordError('Passwords do not match.');
      return;
    }
  
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ password }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setPassword('');
          setRetypePassword('');
          setPasswordError('');
          setRetypePasswordError('');
        } else {
          throw new Error('An error occurred while updating your password.');
        }
      })
      .catch((err) => {
        setPasswordError(err.message);
      });
  }
  return (
    <div className='EditDetails'>
      <h1>Edit Details</h1>
      <GlobalMessage
        type={globalMessage.type}
        onMessageClosed={() => setGlobalMessage({ message: '', type: 'error' })}
      >
        {globalMessage.message}
      </GlobalMessage>
      <form>
        <p className={clsx({ [styles['has-error']]: fNameError })}>
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            id="fName"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
          {fNameError && (
            <span className={styles['error-message']}>{fNameError}</span>
          )}
          <button onClick={handleFNameUpdate}>Update</button>
        </p>
        <p className={clsx({ [styles['has-error']]: lNameError })}>
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            id="lName"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
          {lNameError && (
            <span className={styles['error-message']}>{lNameError}</span>
          )}
          <button onClick={handleLNameUpdate}>Update</button>
        </p>
        <p className={clsx({ [styles['has-error']]: emailError })}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <span className={styles['error-message']}>{emailError}</span>
          )}
          <button onClick={handleEmailUpdate}>Update</button>
        </p>
        <p className={clsx({ [styles['has-error']]: passwordError })}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <span className={styles['error-message']}>{passwordError}</span>
          )}
        </p>
        <div className={clsx({ [styles['has-error']]: retypePasswordError })}>
          <label htmlFor="retypePassword">Retype Password</label>
          <input
            type="password"
            id="retypePassword"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
          {retypePasswordError && (
            <span className={styles['error-message']}>
              {retypePasswordError}
            </span>
          )}
        </div>
        <button onClick={handlePasswordUpdate}>Update</button>
      </form>
    </div>
  );
}