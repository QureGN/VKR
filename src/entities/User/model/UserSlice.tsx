import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserTypes } from './types'

const initialState: { user: UserTypes } = {
    
    user: {
        pk: 0,
        username: '',
        email: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToUser: (state, action: PayloadAction<UserTypes>) => {
            
            state.user = action.payload
            return state
        },
       
        removeUser: (
            state,
            action: PayloadAction<{ pk: number }>
        ) =>{
            state.user.pk = 0
            state.user.username = ""
            state.user.email = ""

            return state
        },

    },
})

export const { addToUser, removeUser } =
    userSlice.actions
export default userSlice.reducer