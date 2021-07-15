import { Loading } from 'atoms'
import PropTypes from 'prop-types'
import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Routers } from 'utils'
import { PublicTemplate, PrivateTemplate } from 'templates'

//  public page
const LoginPage = lazy(() => import('pages/UnAuthPages/Login'))
const RegisterPage = lazy(() => import('pages/UnAuthPages/Register'))
const ForgotPasswordPage = lazy(() =>
  import('pages/UnAuthPages/ForgotPassword')
)
const ResetPasswordPage = lazy(() => import('pages/UnAuthPages/ResetPassword'))

// private page
const DashboardPage = lazy(() => import('pages/AuthPages/Dashboard'))
const StatisticsPage = lazy(() => import('pages/AuthPages/Statistics'))
const HistoryPage = lazy(() => import('pages/AuthPages/History'))
const CheckInRequestPage = lazy(() => import('pages/AuthPages/CheckInRequest'))

const ProfilePage = lazy(() => import('pages/AuthPages/Profile'))
const ProfileUpdatePage = lazy(() =>
  import('pages/AuthPages/Profile/UpdateProfile')
)
const UpdatePasswordPage = lazy(() =>
  import('pages/AuthPages/Profile/UpdatePassword')
)

const PreviewsPage = lazy(() => import('pages/Previews'))

const Routes = ({ isLoggedIn, ...rest }) => {
  const _renderPrivateNormalAdminRoute = React.useCallback(() => {
    return (
      <PrivateTemplate menuList={Routers.NORMAL_ADMIN.MENU}>
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
          path={Routers.NORMAL_ADMIN.MENU[0].URL}
          render={props => {
            return <DashboardPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.NORMAL_ADMIN.MENU[1].URL}
          render={props => {
            return <StatisticsPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.NORMAL_ADMIN.MENU[2].URL}
          render={props => {
            return <HistoryPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.NORMAL_ADMIN.MENU[3].URL}
          render={props => {
            return <CheckInRequestPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.NORMAL_ADMIN.PROFILE.URL}
          render={props => {
            return <ProfilePage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.NORMAL_ADMIN.PROFILE.CHILD[0].URL}
          render={props => {
            return <UpdatePasswordPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.NORMAL_ADMIN.PROFILE.CHILD[1].URL}
          render={props => {
            return <ProfileUpdatePage {...rest} {...props} />
          }}
        />
      </PrivateTemplate>
    )
  }, [isLoggedIn])

  // eslint-disable-next-line no-unused-vars
  const _renderPublicRoute = React.useCallback(() => {
    return (
      <PublicTemplate>
        <Route
          {...rest}
          exact
          path={Routers.LOGIN}
          render={props => {
            return <LoginPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.REGISTER}
          render={props => {
            return <RegisterPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.FORGOT_PASSWORD}
          render={props => {
            return <ForgotPasswordPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          path={Routers.RESET_PASSWORD}
          render={props => {
            return <ResetPasswordPage {...rest} {...props} />
          }}
        />
      </PublicTemplate>
    )
  }, [isLoggedIn])

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* {isLoggedIn ? _renderPrivateNormalAdminRoute() : _renderPublicRoute()} */}
        {/* {_renderPublicRoute()} */}
        {_renderPrivateNormalAdminRoute()}
      </Switch>
    </Suspense>
  )
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default Routes
