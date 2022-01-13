import { Route, Redirect } from "react-router-dom";
import { LoadingPage} from '../pages/Loading';
export const   PrivateRoute = ({ component: Component, ...rest }) => {
  const {user, loading, error} = rest

  let component = <div/>;
  
  if(loading) component = <LoadingPage />

  if(!loading && error) {
    component = <Route {...rest} render={(props) => <Redirect to="/home" />}/>
  }
  
  if(!loading && !error) {
    component = <Route {...rest} render={(props) => user?.email ? <Component {...props} /> : <Redirect to="/login" />}/>
  }


return (component)
}
