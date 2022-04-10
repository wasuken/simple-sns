import { createContext, useContext, useState } from 'react';
import { initUserInfoState, UserInfo } from '../types/type';

import { PostItem, PostPageState, initPostPageState } from "../types/type";

const PostPageContext = createContext<PostPageState>(initPostPageState);

export function usePostPage(){
  return useContext(PostPageContext);
}

export function UserProvider({ children }){
  return (
	<PostPageContext.Provider value={ value } >
	  { children }
	</PostPageContext.Provider>
  );
}
