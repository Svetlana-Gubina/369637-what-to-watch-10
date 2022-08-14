import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute } from '../../project.constants';
import { logoutAction } from '../../store/async-action';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';

const UserBlock = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();

  const handleSignOut = (evt: React.KeyboardEvent | React.MouseEvent) => {
    evt.preventDefault();

    dispatch(logoutAction());
  };

  const avatarHandleClick = (): JSX.Element => (
    <Navigate to={AppRoute.MyList} />
  );

  return (
    <ul className='user-block'>
      <li className='user-block__item'>
        <div className='user-block__avatar' onClick={() => avatarHandleClick()}>
          <img
            src={userData?.avatarUrl || 'img/avatar.jpg'}
            alt='User avatar'
            width={63}
            height={63}
          />
        </div>
      </li>
      <li className='user-block__item'>
        <Link
          onClick={(evt) => handleSignOut(evt)}
          to='/'
          className='user-block__link'
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
};
export default UserBlock;
