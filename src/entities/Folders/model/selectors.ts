import { createSelector } from '@reduxjs/toolkit'
import { FolderTypes } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.folder
)

export const selectFolder = createSelector(
    selectBase,
    (state: { folder: FolderTypes[] }) => state.folder
)