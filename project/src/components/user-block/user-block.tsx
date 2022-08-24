import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute } from '../../project.constants';
import { logoutAction } from '../../store/async-action';
import { useAppDispatch } from '../../hooks/storeHooks';
import { getItem, USER_AVATAR_KEY_NAME } from '../../services/localStorageItem';

const UserBlock = () => {
  const dispatch = useAppDispatch();
  const userAvatarUrl = getItem(USER_AVATAR_KEY_NAME);

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
          <img src={userAvatarUrl} alt='User avatar' width={63} height={63} />
        </div>
      </li>
      <li className='user-block__item'>
        <Link
          onClick={(evt) => handleSignOut(evt)}
          to='/'
          className='user-block__link'
          data-testid='test-signOut'
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
};
export default UserBlock;
