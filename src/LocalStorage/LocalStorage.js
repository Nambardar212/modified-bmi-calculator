export const getLocalData = (key) => {
    const lists = localStorage.getItem(key);
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };

export const storeData = (key, item) => {
    const lists = localStorage.setItem(key, JSON.stringify(item));
    if(lists) {
        return lists;
    }
    else {
        return {};
    }
}

//   export default {getLocalData, storeData};
 