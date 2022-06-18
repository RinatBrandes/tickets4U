import TicketApp from './views/ticket-app.jsx'
import Login from './views/login.jsx'
import Signup from './views/signup.jsx'
import Event from './views/event.jsx'

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
        path: '/signup',
        component: <Signup />,
    },
    {
        path: '/event',
        component: <Event />,
    }
]

export default routes;