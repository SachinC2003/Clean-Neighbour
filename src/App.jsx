import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

/*components*/
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignUp';
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import WelcomePage from "./components/WelcomePage";
import Complain from "./components/Complain";
import Inbox from "./components/Inbox";
import Logout from "./components/Logout";
import Awareness from "./components/Awareness";
import Complaints from "./components/Complaints";
import TakeAction from "./components/TakeAction";
import Assignments from "./components/Assignments";
import Punish from "./components/Punish";
/**/

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<WelcomePage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm/>} />
          <Route path="home" element={
            <ProtectedRoute rRole={'user'}>
                <Home/>
            </ProtectedRoute>}>
          </Route>
          <Route path="complain" element={
            <ProtectedRoute rRole={'user'}>
                <Complain/>
            </ProtectedRoute>}>
          </Route>
          <Route path="inbox" element={
            <ProtectedRoute rRole={'any'}>
                <Inbox/>
            </ProtectedRoute>}>
          </Route>
          <Route path="awareness" element={
            <ProtectedRoute rRole={'any'}>
                <Awareness/>
            </ProtectedRoute>}>
          </Route>
          <Route path="complaints" element={
            <ProtectedRoute rRole={'admin'}>
                <Complaints/>
            </ProtectedRoute>}>
          </Route>
          <Route path="takeaction/:complaintid" element={
            <ProtectedRoute rRole={'admin'}>
                <TakeAction/>
            </ProtectedRoute>}>
          </Route>
          <Route path="punish" element={
            <ProtectedRoute rRole={'admin'}>
                <Punish/>
            </ProtectedRoute>}>
          </Route>
          <Route path="assignments" element={
            <ProtectedRoute rRole={'garbage-collector'}>
                <Assignments/>
            </ProtectedRoute>}>
          </Route>
          <Route path="logout" element={<Logout/>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
