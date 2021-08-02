import SQLiteStorage, {SQLiteDatabase} from 'react-native-sqlite-storage';
SQLiteStorage.DEBUG(true);

// 当前数据库
let db: SQLiteDatabase;
 
const initDB = () => {
  openDB();
}

const openDB = () => {
  db = SQLiteStorage.openDatabase({
    name: 'quickdb.db',
    location: 'default'
  }, ()=>{
    console.log('打开数据库成功');

  }, ()=>{
    console.log('打开数据库失败');

  })
}

const executeSQL = (statement: string, params?: any[]) => {
  if (!db) {
    openDB();
  }
  db.transaction(()=>{
    db.executeSql(statement, params);
  }, ()=>{
    console.log('成功');
  }, ()=>{
    console.log('失败');
  })
}

export const SqlUtil = {
  openDB,
  executeSQL
}