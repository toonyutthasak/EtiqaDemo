import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * Read and set information in local storage. 
 */
@Injectable()
export class StorageProvider {
  private static readonly KEY_ACCESS_TOKEN  = "access_token";
  private static readonly KEY_ROLE          = "role";
  private static readonly KEY_ROLE_LEVEL    = "roleLevel";
  private static readonly KEY_INIT_TABLES   = "initialiseTables";

  constructor(private storage: Storage) { }

  /**
   * Set value for key
   * @param key: Key
   * @param value: value 
   */
  private setKeyValue<T>(key : string, value : T) : Promise<void>{
    return this.storage.ready().then((localForage)=>{
      if (value != null) {
        //Return void
        return localForage.setItem(key, value).then(()=>{});
      } else {
        return localForage.removeItem(key);
      }
    });
  }

  /**
   * Get value for key
   * @param key: Key
   * @param defaultValue: default value
   * @return value for this key 
   */
  private getKeyValue<T>(key : string, defaultValue? : T) : Promise<T>{
    return this.storage.ready().then((localForage)=>{
      return localForage.getItem<T>(key)
      .then((value)=>{
        if(value != null || defaultValue == null){
          return value;
        }else{
          return defaultValue;
        }
      });
    });
  }

  /**
   * Clear local storage
   */
  purgeStorage() : Promise<void> {
    return this.storage.ready().then((localForage)=>{
      return localForage.clear();
    });
  }

  /**
   * Set value for table initialisation key
   */
  setInitTables() : Promise<void> {
    return this.setKeyValue(StorageProvider.KEY_INIT_TABLES, true);
  }

  /**
   * Get key for table initialisation
   * @return value for init table key
   */
  getInitTables() : Promise<boolean>{
    return this.getKeyValue<boolean>(StorageProvider.KEY_INIT_TABLES, false);
  }

  /**
   * Set access token
   * @param accessToken access token for user
   */
  setAccessToken(accessToken: string): Promise<void> {
    return this.setKeyValue(StorageProvider.KEY_ACCESS_TOKEN, accessToken);
  }

  /**
   * Get access token
   * @return  access token for user
   */
  getAccessToken(): Promise<string> {
    return this.getKeyValue<string>(StorageProvider.KEY_ACCESS_TOKEN, '');
  }

  /**
   * Set user role
   * @param role user role
   */
  setUserRole(role: string): Promise<void> {
    return this.setKeyValue(StorageProvider.KEY_ROLE, role);
  }

 /**
   * Get user role
   * @return  role for user
   */
  getUserRole(): Promise<string> {
    return this.getKeyValue<string>(StorageProvider.KEY_ROLE, '');
  }

   /**
   * Set user role level
   * @param roleLevel user role level
   */
  setUserRoleLevel(roleLevel: string): Promise<void> {
    return this.setKeyValue(StorageProvider.KEY_ROLE_LEVEL, roleLevel);
  }

  /**
   * Get user role level
   * @return user role level
   */
  getUserRoleLevel(): Promise<string> {
    return this.getKeyValue<string>(StorageProvider.KEY_ROLE_LEVEL, '');
  }
}