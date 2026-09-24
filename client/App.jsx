import AppRoutes from "./src/routes/AppRoutes"
import {Link} from "react-router-dom";
function App(){
  return (
  <div className="Outer-pokedex-wrapper">
    <h1 className = "pokedex-heading">
      <Link to="/">Pokedex</Link>
    </h1>
    <AppRoutes/>
  </div>
  )
}

export default App;