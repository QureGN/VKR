import { ComponentType, PropsWithChildren } from 'react';

export enum RouteName {
    START_PAGE = '/',
    AUTH = '/login',
    REGISTRATION = '/registration',
    STORAGE = '/storage',
    FOLDER = '/folders',
    TREES = '/trees',
    BINARY = '/binary/:folderId',
}

export interface RouteDescription {
    path: RouteName;
    component: ComponentType;
}