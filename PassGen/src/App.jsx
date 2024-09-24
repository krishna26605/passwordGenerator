import { useState , useCallback , useEffect , useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [Lenght, setLenght] = useState(8)
  const [NumberAllow, setNumberAllow] = useState(false)
  const [CharAllow, setCharAllow] = useState(false)
  const [Password, setPassword] = useState("")

  const PasswordRef = useRef(null)

  const PasswordGenerator=useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (NumberAllow) str += "0123456789"
    if(CharAllow) str+= "!@~#$%^&*()_+{}[]"
    
    for (let i= 1; i<=Lenght;i++) {
      let char =Math.floor(Math.random()*str.length+1);

      pass+=str.charAt(char);

      setPassword(pass)
    }

  } , [length,NumberAllow ,CharAllow , setPassword])

  const copyPasswordtoClipBoard = useCallback(()=> {
    PasswordRef.current?.select();
    
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(()=>{
    PasswordGenerator()}, [Lenght,NumberAllow ,CharAllow , PasswordGenerator])

  return (
    <>
     <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-8 my-5 text-orange-500 bg-gray-700 '>
      <h1 className='text-white text-4xl text-center pb-4'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
        <input type="text"
        value={Password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={PasswordRef} />
        <button onClick={copyPasswordtoClipBoard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '>copy</button>
      </div>
      <div className='flex text-sm gap-x-4'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={Lenght}
          className='cursor-pointer'
          onChange={(e)=>{setLenght(e.target.value)}} />
          <label >Lenght :{Lenght}</label>
        </div>
        <div className='flex items-center gap-x-2 '>
          <input
          type='checkbox'
          defaultChecked={NumberAllow}
          id='numberInput'
          onChange={()=>{
            setNumberAllow((prev)=>!prev);
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={CharAllow}
          id='characterInput'
          onChange={()=>{
            setCharAllow((prev)=>!prev);
          }}
          />
          <label htmlFor="charInput">Characters</label>
           
        </div>
      </div>
  </div>
    </>
  )
}

export default App
