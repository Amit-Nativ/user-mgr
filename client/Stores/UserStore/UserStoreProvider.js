import React, {createContext} from 'react';
import {UserStore} from './UserStore';

export const UserStoreContext = createContext();

export const UserStoreProvider = ({children}) => {
    return (
      <UserStoreContext.Provider value={new UserStore()}>
        {children}
      </UserStoreContext.Provider>
    );
};