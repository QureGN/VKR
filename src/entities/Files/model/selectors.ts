import { createSelector } from '@reduxjs/toolkit'
import { BinaryTypes } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.binaryFiles
)

export const selectBinaryFiles = createSelector(
    selectBase,
    (state: { binaryFiles: BinaryTypes[] }) => state.binaryFiles
)