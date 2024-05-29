import { createSelector } from '@reduxjs/toolkit'
import { UserTypes } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.user
)

export const selectUser = createSelector(
    selectBase,
    (state: { user: UserTypes[] }) => state.user
)