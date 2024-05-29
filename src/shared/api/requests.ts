import { FolderDelete } from '@mui/icons-material'
import { instance } from './instance'

//Получение всех файлов из бакета
export function getAllBinFiles<T>(jwt_token: string,) {
  return instance.get<T>(`/listObjectsObj/`, {
    headers: {
      'Authorization': `${jwt_token}`
    }}
)
}

//Скачивание файла из папки
export function getBiknFileByName<T>( bucket_name: string, file_name: string, jwt_token: string,) {
  return instance.get<T>(`/download/${bucket_name}/${file_name}/`,{
    headers: {
      'Authorization': `${jwt_token}`
    }}
)
}

//Загрузка файла в минио
export function uploadInMinio<T>( bucket_name: string, jwt_token: string, data: object,) {
    return instance.post<T>(`/upload/${bucket_name}/`, data, {
      headers: {
        'Authorization': `${jwt_token}`
      }}
  )
}

//Удаление файла в минио
export function deleteInMinio<T>( bucket_name: string, file_name: string, jwt_token: string,) {
    return instance.delete<T>(`/delete/${bucket_name}/${file_name}/`, {
      headers: {
        'Authorization': `${jwt_token}`
      }}
  )
}

//
//Изменение название файла
export function updateFileInMinio<T>( bucket_name: string, old_file_name: string, jwt_token: string, data: object) {
  return instance.put<T>(`/update/${bucket_name}/${old_file_name}/`, data, {
    headers: {
      'Authorization': `${jwt_token}`
    }}
)
}


//Получение всех деревьев из папки
export function getAllTrees<T>(jwt_token: string,) {
    return instance.get<T>(`/trees/review/`, {
      headers: {
        'Authorization': `${jwt_token}`
      }}
  )
  }
  
//Получение данных об определенном дереве
export function getTreesById<T>( tree_id: number, jwt_token: string,) {
    return instance.get<T>(`/trees/${tree_id}/`, {
      headers: {
        'Authorization': `${jwt_token}`
      }}
  )
}
  
//Обновление данных о дереве
export function updateTree<T>( tree_id: string, jwt_token: string, data: object) {
    return instance.put<T>(`/trees/update/${tree_id}/`, data, {
      headers: {
        'Authorization': `${jwt_token}`
      }}
  )
}
  
//Удаление дерева
  export function deleteTree<T>( tree_id: number, jwt_token: string) {
      return instance.delete<T>(`/trees/delete/${tree_id}/`, {
        headers: {
          'Authorization': `${jwt_token}`
        }}
    )
  }

//Создание дерева
export function createTree<T>( jwt_token: string, data: object) {
    return instance.post<T>(`/trees/create/`, data, {
      headers: {
        'Authorization': `${jwt_token}`
      }}
  )
}


//Получение всех папок
export function getAllFolders<T>(jwt_token: string) {
    return instance.get<T>(`/folders/review/`, {
      headers: {
        'Authorization': `${jwt_token}`
      }})
  }

//Получение всех папок по поиску
export function getSearchFolders<T>(query: string, jwt_token: string,) {
  return instance.get<T>(`/folders/search/?query=${query}`,{
    headers: {
      'Authorization': `${jwt_token}`
    }})
}

//Получение всех папок
export function getFolderById<T>( folder_id: number, jwt_token: string,) {
  return instance.get<T>(`/folders/review/${folder_id}/`,{
    headers: {
      'Authorization': `${jwt_token}`
    }})
}
  
//Получение данных об определенной папке
export function getFolderByIdTree<T>(  folder_id: number, jwt_token: string,) {
    return instance.get<T>(`/folders/${folder_id}/`,{
      headers: {
        'Authorization': `${jwt_token}`
      }})
}

//Получение данных об определенной папке
export function getFolderByIdBinary<T>(  folder_name: string, jwt_token: string,) {
  return instance.get<T>(`/folders/binary/${folder_name}/`, {
    headers: {
      'Authorization': `${jwt_token}`
    }})
}

export function searchBinFiles<T>(folder_name: string, query: string, jwt_token: string,){
  return instance.get<T>(`/binary/search/${folder_name}/?query=${query}`, {
    headers: {
      'Authorization': `${jwt_token}`
    }})
}

export function searchTreeFiles<T>( folder_id: number,  query: string, jwt_token: string,){
  return instance.get<T>(`/trees/search/${folder_id}/?query=${query}`, {
    headers: {
      'Authorization': `${jwt_token}`
    }})
}

//Обновление данных о папке
export function updateFolder<T>( folder_id: number, folder_name: string,  jwt_token: string, data: object) {
    return instance.put<T>(`/folders/update/${folder_id}/${folder_name}/`, data, {
      headers: {
        'Authorization': `${jwt_token}`
      }})
}
  
//Удаление папки
export function deleteFolder<T>( folder_id: number, folder_name: string, jwt_token: string) {
  return instance.delete<T>(`/folders/delete/${folder_id}/${folder_name}/`,{
    headers: {
      'Authorization': `${jwt_token}`
    }})
}

//Создание папки
export function createFolder<T>( jwt_token: string, data: object, ) {
    return instance.post<T>(`/folders/create/`, data, {
      headers: {
        'Authorization': `${jwt_token}`
      }})
}

//Вход
export function Login<T>( data: object) {
  return instance.post<T>(`/api/login/`, data)
}


//Регистрация
export function Registration<T>( data: object) {
  return instance.post<T>(`/api/register/`, data)
}

//Поделиться с папкой
export function shareFolder<T>( folder_id:number, jwt_token: string, data: object) {
  return instance.put<T>(`folders/share/${folder_id}/`, data, {
    headers: {
      'Authorization': `${jwt_token}`
    }})
}
