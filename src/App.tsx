import { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import Loader from './components/Loader';
import { GlobalLayout } from './layouts';
import { publicRoutes } from './router';

const App: React.FC = (): JSX.Element => {
  return (
    <Fragment>
      <BrowserRouter>
        <GlobalLayout>
          <Suspense
            fallback={
              <div className='loader'>
                <Loader />
              </div>
            }
          >
            <Switch>
              {publicRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                );
              })}
            </Switch>
          </Suspense>
        </GlobalLayout>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
