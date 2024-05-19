import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BinaryTypes } from './types'

const initialState: { binaryFiles: BinaryTypes[] } = {
    binaryFiles: [],
}

const binarySlice = createSlice({
    name: 'binaryFiles',
    initialState,
    reducers: {
        addToBinaryFiles: (state, action: PayloadAction<BinaryTypes[]>) => {
            
            state.binaryFiles = action.payload
            return state
        },
        newBinaryFiles: (
            state,
            action: PayloadAction<BinaryTypes>
        ) => {
            state.binaryFiles.push(action.payload) 
            return state
        },
        removeBinaryFiles: (
            state,
            action: PayloadAction<{ name: string }>
        ) =>{
            state.binaryFiles = state.binaryFiles.filter(
                (item) => item.name !== action.payload.name
            )

            return state
        },

    },
})

export const { addToBinaryFiles, newBinaryFiles, removeBinaryFiles } =
    binarySlice.actions
export default binarySlice.reducer