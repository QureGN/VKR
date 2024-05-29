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
        renameFiles: (
            state,
            action: PayloadAction<{ old_name: string, new_name: string }>
        ) => {
            const { old_name, new_name } = action.payload;
            const folderIndex = state.binaryFiles.findIndex(folder => folder.name === action.payload.old_name);
          
            if (folderIndex !== -1) {
                state.binaryFiles[folderIndex] = {
                    ...state.binaryFiles[folderIndex],
                    name: action.payload.new_name
                };
            }
            return state;
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

export const { addToBinaryFiles, newBinaryFiles, removeBinaryFiles, renameFiles } =
    binarySlice.actions
export default binarySlice.reducer