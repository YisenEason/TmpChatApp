import SQLiteStorage, {ResultSet, SQLError, SQLiteDatabase} from 'react-native-sqlite-storage';
SQLiteStorage.DEBUG(true);

// 当前数据库
var db: SQLiteDatabase;


const deleteDB = () => {
  SQLiteStorage.deleteDatabase({
    name: 'quickdb.db',
    location: 'default'
  }).then(()=>{
    console.log('删除数据库成功');
  }).catch(()=>{
    console.log('删除数据库失败');
  });
}

const initDB = () => {
  try {
    db = SQLiteStorage.openDatabase(
      {
        name: 'quickdb.db', // 数据库名称
        location: 'default' 
      },
      ()=>{
        console.log('initDBSuccess')
      },
      (err)=>{
        console.log('quickdb.db' + 'initDBError error =',err)
      }
    )
  } catch (e) {
    console.log('initDB error =', e)
  } finally {
  }
}

const createTable = (sql:string, callback?:(status:boolean, err?: any)=>void) => {
  console.log(`createTable is =${sql}`)
  db.transaction((tx) => {
    tx.executeSql(
      sql,
      [],
      () => {
        callback && callback(true)
        console.log(`createTable executeSql success`)
      },
      (err) => {
        callback && callback(false, err)
        console.log('createTable  executeSql error=',err)
      })
    },
    (err) => {
      console.log('createTable  transaction error=',err)
    },
    () => {
      console.log(`createTable transaction success`)
    })
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

const initAllTable = () => {
  
  if (!db) {
    initDB();
  }

  // 好友表
  createTable(`
    CREATE TABLE IF NOT EXISTS User(
      id INTEGER PRIMARY KEY,
      name VARCHAR,
      avatar VARCHAR,
      no VARCHAR
    )
  `);
  // 聊天记录表, 记录所有聊天记录，包括单聊和群聊
  
  // 群聊表
  createTable(`
    CREATE TABLE IF NOT EXISTS Group(
      id INTEGER PRIMARY KEY,
      name VARCHAR
    )
  `);

  // 群聊成员表
  createTable(`
    CREATE TABLE IF NOT EXISTS Group_User(
      id INTEGER PRIMARY KEY,
      name VARCHAR,
      avatar VARCHAR,
      no VARCHAR
    )
  `);
}

const executeSQL = async (statement: string, params?: any[], callback?: (results: any[])=>void) => {
  if (!db) {
    openDB();
  }
  
  db.transaction((tx)=>{
    tx.executeSql(statement, params, (tx, result)=>{
      console.log('执行成功', result.rows.raw());
      callback && callback(result.rows.raw())
    }, (err)=>{
      console.log('执行失败', err);
    });
  });
}

export const SqlUtil = {
  openDB,
  executeSQL,
  deleteDB,
  initAllTable,
  initDB,
  createTable
}