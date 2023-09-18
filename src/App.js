import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './SCSS/App.scss';

import UpdateDocFilmPage from './page/admin/UpdateDocFilmPage';
import CreateFilmPage from './page/admin/CreateFilmPage';
import Dashboard from './page/admin/Dashboard';
import ReviewAdminPage from './page/admin/ReviewPageAdmin';
import AllFilmPage from './page/public/AllFilmPage';

import HomePage from './page/public/HomePage';
import LoginPage from './page/public/LoginPage';
import DocFilmPage from './page/public/DocFilmPage';
import SignupPage from './page/public/Signin';
import UpdateUserPage from './page/admin/UpdateUserPage';
import AllUserPage from './page/admin/AllUserPage';
import AllFilmPageAdmin from './page/admin/AllFilmPageAdmin';
import UpdateReviewPage from './page/admin/UpdateReviewPage';

import Contact from './allUser/Contact';

function App() {
  return (
    <div className="Admin">
      <BrowserRouter>
      <Routes>
        <Route path="/admin/films" element={<AllFilmPageAdmin/>}/>
        <Route path= "/admin/films/create" element={<CreateFilmPage/>}/>
        <Route path="/admin/films/:id/update" element={<UpdateDocFilmPage/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path='/admin/reviews' element={<ReviewAdminPage/>}/>
        <Route path='/admin/users/:id/update' element={<UpdateUserPage/>}/>
        <Route path='/admin/users' element={<AllUserPage/>}/>
        <Route path='/admin/reviews/:id/update' element={<UpdateReviewPage/>}/>


        <Route path="/" element={<HomePage />} />
        <Route path='/films' element={<AllFilmPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/films/:id'element={<DocFilmPage/>}/>

        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
