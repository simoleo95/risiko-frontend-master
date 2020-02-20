import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


const STORAGE_KEY = 'local_todolist';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  anotherTodolist = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
  public storeOnLocalStorage(taskTitle: Object): void {
       // get array of tasks from local storage
       const currentTodoList = this.storage.get(STORAGE_KEY) || [];
       // push new task to array
       currentTodoList.push({
           title: taskTitle,
           isChecked: false 
       });
      
       // insert updated array to local storage
       this.storage.set(STORAGE_KEY, currentTodoList);
       console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  public retriveInfo(){
    return this.storage.has(STORAGE_KEY);
  }
  public getPartita(){
      return this.storage.get(STORAGE_KEY);
      
  }

  clear() {
    this.storage.clear();
  }
}

