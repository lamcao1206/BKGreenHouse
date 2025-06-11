import { useEffect, useState } from 'react';

export default function useLocalStorage(initialState, key) {
   
    // Lấy giá trị từ localStorage và gán cho value
   const [value, setValue] = useState (() => {
       const value_stored = localStorage.getItem(key);
       if (value_stored){
        return JSON.parse(value_stored);
       }
       else{
        return initialState;
       }
   })

  // SET lại value thành chuỗi JSON và lưu vào localStorage
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    // lưu chuỗi json vào localstorage với key tương ứng
    [value, key]
  );

  return [value, setValue];
}