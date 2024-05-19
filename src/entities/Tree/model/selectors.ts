import { createSelector } from '@reduxjs/toolkit'
import { TreeTypes } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.treeFiles
)

export const selectTree = createSelector(
    selectBase,
    (state: { treeFiles: TreeTypes[] }) => state.treeFiles
)