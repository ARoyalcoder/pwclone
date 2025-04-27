import { createBrowserRouter } from "react-router-dom"
import Navbar from "./components/navbar"
import Login from "./pages/login"
import HeroSection from "./pages/student/HeroSection"
import MainLayout from "./layout/MainLayout"
import { RouterProvider } from "react-router-dom"
import Courses from "./pages/student/Courses"
import MyLearning from "./pages/student/MyLearning"
import Profile from "./pages/student/Profile"
import Sidebar from "./pages/admin/course/Sidebar"
import Dashboard from "./pages/admin/Dashboard"
import CourseTable from "./pages/admin/course/CourseTable"
import AddCourse from "./pages/admin/course/AddCourse"
import EditCourse from "./pages/admin/course/EditCourse"
import CreateLecture from "./pages/admin/lecture/CreateLecture"
import EditLecture from "./pages/admin/lecture/EditLecture"
import CourseDetail from "./pages/student/CourseDetails"
import CourseProgress from "./pages/student/CourseProgress"
import SearchPage from "./pages/student/SearchPage"
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from "./components/ProtectedRoute"
import PurchaseCourseProtected from "./components/PurchaseCourse"
import { ThemeProvider } from "./components/ThemeProvider"


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <>
          <HeroSection />
          {/* courses */}
          <Courses />
        </>
      },
      {
        path: "login",
        element: <AuthenticatedUser><Login /></AuthenticatedUser>
      },
      {
        path: "my-learning",
        element: <MyLearning />
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: "course/search",
        element: <ProtectedRoute><SearchPage /></ProtectedRoute>
      },
      {
        path: "course-detail/:courseId",
        element: <ProtectedRoute><CourseDetail /></ProtectedRoute>
      },
      {
        path: "course-progress/:courseId",
        element:
          <ProtectedRoute>
            <PurchaseCourseProtected>
              <CourseProgress />
            </PurchaseCourseProtected>
          </ProtectedRoute>
      },
      // admin roots start from here 
      {
        path: "admin",
        element: <AdminRoute><Sidebar /></AdminRoute>,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "course",
            element: <CourseTable />
          },
          {
            path: "course/create",
            element: <AddCourse />
          },
          {
            path: "course/:courseId",
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          },
        ]
      }
    ]
  }
])

function App() {

  return (
    <>
      <main>
          <RouterProvider router={appRouter} />
      </main>
    </>
  )
}

export default App
