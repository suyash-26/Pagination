import {useState,useEffect} from 'react';
const useDebounce = (val,delay=500)=>{
    const [debouncedValue,setDebouncedValue] = useState(val);
    useEffect(()=>{
        let timer = setTimeout(()=>{
            setDebouncedValue(val);
        },delay)
        return ()=>{
            if(timer){
                clearTimeout(timer);
            }
        }
    },[val,delay])
    return debouncedValue;
}
export default useDebounce
