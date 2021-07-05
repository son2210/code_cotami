import { Loading } from 'atoms'
import PropTypes from 'prop-types'
import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Routers } from 'utils'
const LoginPage = lazy(() => import('pages/Login'))
const DashboardPage = lazy(() => import('pages/Dashboard'))

const PreviewsPage = lazy(() => import('pages/Previews'))

const Routes = ({ isLoggedIn, ...rest }) => {
  const _renderPrivateRoute = React.useCallback(() => {
    return (
      <>
        <Route
          {...rest}
          exact
          path={Routers.PREVIEWS}
          render={props => {
            return <PreviewsPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.DASHBOARD}
          render={props => {
            return <DashboardPage {...rest} {...props} />
          }}
        />
      </>
    )
  }, [isLoggedIn])

  const _renderPublicRoute = React.useCallback(() => {
    return (
      <Route
        {...rest}
        exact
        path={Routers.LOGIN}
        render={props => {
          return <LoginPage {...rest} {...props} />
        }}
      />
    )
  }, [isLoggedIn])

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {isLoggedIn ? _renderPrivateRoute() : _renderPublicRoute()}
      </Switch>
    </Suspense>
  )
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default Routes
