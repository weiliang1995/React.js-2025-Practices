import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as eventDetailAction,
} from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import RootPage from "./pages/RootPage";
import EventsRootLayout from "./pages/EventsRoot";
import { action as eventFormAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventid",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDetailAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: eventFormAction,
              },
            ],
          },
          { path: "new", element: <NewEventPage />, action: eventFormAction },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage/>,
        action: newsletterAction,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
