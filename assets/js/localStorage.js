export function readFromStorage(key) {
    var data = localStorage.getItem(key);
    if (data) { data = JSON.parse(data) }
    else { data = [] }
    return data;
  };
  
export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};