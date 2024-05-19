import { instance } from './instance'

//Получение всех файлов из бакета
export function getAllBinFiles<T>() {
  return instance.get<T>(`/listObjectsObj/`)
}

//Скачивание файла из папки
export function getBiknFileByName<T>( bucket_name: string, file_name: string) {
  return instance.get<T>(`/download/${bucket_name}/${file_name}/`,)
}

//Загрузка файла в минио
export function uploadInMinio<T>( bucket_name: string, data: object,) {
    return instance.post<T>(`/upload/${bucket_name}/`, data)
}

//Удаление файла в минио
export function deleteInMinio<T>( bucket_name: string, file_name: string) {
    return instance.delete<T>(`/delete/${bucket_name}/${file_name}/`,)
}


//Получение всех деревьев из папки
export function getAllTrees<T>() {
    return instance.get<T>(`/trees/review/`)
  }
  
//Получение данных об определенном дереве
export function getTreesById<T>( tree_id: number) {
    return instance.get<T>(`/trees/${tree_id}/`,)
}
  
//Обновление данных о дереве
export function updateTree<T>( tree_id: string, data: object) {
    return instance.put<T>(`/trees/update/${tree_id}/`, data)
}
  
//Удаление дерева
  export function deleteTree<T>( tree_id: number) {
      return instance.delete<T>(`/trees/delete/${tree_id}/`,)
  }

//Создание дерева
export function createTree<T>( data: object) {
    return instance.post<T>(`/trees/create/`, data)
}


//Получение всех папок
export function getAllFolders<T>() {
    return instance.get<T>(`/folders/review/`)
  }

//Получение всех папок по поиску
export function getSearchFolders<T>(query: string) {
  return instance.get<T>(`/folders/search/?query=${query}`)
}

//Получение всех папок
export function getFolderById<T>( folder_id: number) {
  return instance.get<T>(`/folders/review/${folder_id}/`)
}
  
//Получение данных об определенной папке
export function getFolderByIdTree<T>(  folder_id: number) {
    return instance.get<T>(`/folders/${folder_id}/`,)
}

//Получение данных об определенной папке
export function getFolderByIdBinary<T>(  folder_name: string) {
  return instance.get<T>(`/folders/binary/${folder_name}/`,)
}

export function searchBinFiles<T>(folder_name: string, query: string){
  return instance.get<T>(`/binary/search/${folder_name}/?query=${query}`)
}

export function searchTreeFiles<T>( folder_id: number,  query: string,){
  return instance.get<T>(`/trees/search/${folder_id}/?query=${query}`)
}

//Обновление данных о папке
export function updateFolder<T>( folder_id: number, folder_name: string, data: object) {
    return instance.put<T>(`/folders/update/${folder_id}/${folder_name}/`, data)
}
  
//Удаление папки
  export function deleteFolder<T>( folder_id: number, folder_name: string) {
      return instance.delete<T>(`/folders/delete/${folder_id}/${folder_name}/`,)
  }

//Создание папки
export function createFolder<T>( data: object) {
    return instance.post<T>(`/folders/create/`, data)
}


