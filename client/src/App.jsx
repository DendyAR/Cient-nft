import {Navbar , Footer , Welcome , Transaction , Services , } from "./components"
import "./App.css"
const App = () => {
  return (
    <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar/>
          <Welcome/>
        </div>
        <Services/>
        <Transaction/>
        <Footer/>
    </div>
  )
}

export default App;