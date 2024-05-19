import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TreeTypes } from './types'

const initialState: { treeFiles: TreeTypes[] } = {
    treeFiles: [],
}

const treeSlice = createSlice({
    name: 'treeFiles',
    initialState,
    reducers: {
        addToTreeFiles: (state, action: PayloadAction<TreeTypes[]>) => {
            
            state.treeFiles = action.payload
            return state
        },
        newTreeFiles: (
            state,
            action: PayloadAction<TreeTypes>
        ) => {
            state.treeFiles.push(action.payload) 
            return state
        },
        changeTree: (
            state,
            action: PayloadAction<{ id: number; edit: TreeTypes }>
        ) => {
            const findItemIndex = state.treeFiles?.findIndex(
                (item) => item.pk === action.payload.id
            )
            state.treeFiles[findItemIndex] = action.payload.edit
        },
        removeTreeFiles: (
            state,
            action: PayloadAction<{ pk: number }>
        ) =>{
            state.treeFiles = state.treeFiles.filter(
                (item) => item.pk !== action.payload.pk
            )

            return state
        },

    },
})

export const { addToTreeFiles, newTreeFiles,changeTree, removeTreeFiles } =
    treeSlice.actions
export default treeSlice.reducer