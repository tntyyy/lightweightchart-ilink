import { Outlet } from 'react-router-dom'

function App() {

    return (
    <div className={"max-w-[400px] w-full m-auto h-[100vh] flex flex-col justify-center"}>
        <Outlet />
        <div>navbar</div>
    </div>
  )
}

export default App
