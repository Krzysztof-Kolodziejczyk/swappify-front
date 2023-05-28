import {Routes, Route} from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";
import AddItem from "./components/AddItemForm";
import Items from "./components/ItemList";


function App() {
    return (
       <Routes>
           <Route path="/" element={<Layout />}>
               <Route path="/" element={<Profile />} />
               <Route path="login" element={<Login />} />
               <Route path="register" element={<Register />} />
               <Route path="unauthorized" element={<Unauthorized />} />

               <Route element={<RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} /> } >
                   <Route path="addItem" element={<AddItem />} />
               </Route>

               <Route element={<RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} /> } >
                   <Route path="profile" element={<Profile />} />
               </Route>

               <Route element={<RequireAuth allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} /> } >
                   <Route path="items" element={<Items />} />
               </Route>

           </Route>
       </Routes>
    )
}

export default App;