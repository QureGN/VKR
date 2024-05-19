import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FolderTypes } from './types'

const initialState: { folder: FolderTypes[] } = {
    folder: [],
}

const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        addToFolders: (state, action: PayloadAction<FolderTypes[]>) => {
            
            state.folder = action.payload
            return state
        },
        changeFolder: (
            state,
            action: PayloadAction<{ id: number; name: string }>
        ) => {
            const findItemIndex = state.folder?.findIndex(
                (item) => item.pk === action.payload.id
            )
            state.folder[findItemIndex].name_folder = action.payload.name
        },
        newFolder: (
            state,
            action: PayloadAction<FolderTypes>
        ) => {
            state.folder.push(action.payload) 
            return state
        },
        removeFolder: (
            state,
            action: PayloadAction<{ pk: number }>
        ) =>{
            state.folder = state.folder.filter(
                (item) => item.pk !== action.payload.pk
            )

            return state
        },

    },
})

export const { addToFolders, changeFolder, newFolder, removeFolder } =
    folderSlice.actions
export default folderSlice.reducer