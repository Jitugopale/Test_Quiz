import react from 'react'
import { Link,Outlet} from 'react-router-dom';
import Outleting from './Outleting';

const Main = () =>{
    return(
        <>
          <h1>Routing</h1>
          <Outleting/>
          <Outlet/>
        </>
    )
}

export default Main;