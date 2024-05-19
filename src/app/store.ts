// import type { Action, ThunkAction } from "@reduxjs/toolkit"
// import { combineSlices, configureStore } from "@reduxjs/toolkit"
// import { setupListeners } from "@reduxjs/toolkit/query"


// export const store = configureStore({
//   reducer: {},
// })
 
// export type AppStore = typeof store
// export type RootState= ReturnType<typeof store.getState>
// // Infer the `AppDispatch` type from the store itself
// export type AppDispatch = AppStore["dispatch"]
// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   RootState,
//   unknown,
//   Action
// >

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FolderReducer } from '../entities/Folders'
import { BinaryReducer } from '../entities/Files'
import { TreeReducer } from '../entities/Tree'

import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    folder: FolderReducer,
    binaryFiles: BinaryReducer,
    treeFiles: TreeReducer
})

const persistConfig = {
    key: 'root',
    storage,
    
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

export const appStore = persistStore(store)
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch
