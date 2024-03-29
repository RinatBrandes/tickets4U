import TicketApp from './views/ticket-app.jsx'
import Login from './views/login.jsx'
import Signup from './views/signup.jsx'
import EventEdit from './views/event-edit.jsx'
import EventDetails from './views/event-details.jsx'
import UserEvent from './views/user-event.jsx'
import ForgottenPassword from './views/forgotten-password.jsx'
import ResetPassword from './views/reset-password.jsx'

const routes = [
    {
        path: '/',
        component: <TicketApp />,
    },
    {
        path: '/login',
        component: <Login />,
    },
    {
        path: '/forgotpass',
        component: <ForgottenPassword />,
    },
    {
        path: '/resetpass:token',
        component: <ResetPassword />,
    },
    {
        path: '/signup',
        component: <Signup />,
    },
    {
        path: '/event/edit/:eventId',
        component: <EventEdit />,
    },
    {
        path: '/event/edit',
        component: <EventEdit />,
    },
    {
        path: '/event/:eventId',
        component: <EventDetails />,
    },
    {
        path: '/event/user/:userId',
        component: <UserEvent />,
    }
]

export default routes;