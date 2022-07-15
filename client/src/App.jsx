import {Navbar , Footer , Welcome , Transaction , Services , } from "./components"
import "./App.css"

// Set a same-site cookie for first-party contexts
document.cookie = 'cookie1=value1; SameSite=Lax';
// Set a cross-site cookie for third-party contexts
document.cookie = 'cookie2=value2; SameSite=None; Secure';
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