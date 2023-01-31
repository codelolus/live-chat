function App() {
  const join = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nick = e.currentTarget.nick.value
    window.location.href = `/chat/${nick}`
  }
  return (
    <div className="">
      <form className='flex justify-center items-center flex-col' onSubmit={join}>
        <input className='flex w-[50rem]' type="text" placeholder='Enter your username..' name="nick" />
        <button className='flex text-sky-500' type='submit'>Join room</button>
      </form>
    </div>
  )
}

export default App