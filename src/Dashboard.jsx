import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [allRegistrations, setAllRegistrations] = useState([]);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "https://course-backend-a0oh.onrender.com/api/getAllCourse",
        { headers }
      );

      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRegisteredCourses = async () => {
    try {
      const res = await axios.get(
        "https://course-backend-a0oh.onrender.com/api/getRegisteredCourse",
        { headers }
      );

      setRegisteredCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllRegistrations = async () => {
    try {
      const res = await axios.get(
        "https://course-backend-a0oh.onrender.com/api/getAllStudentsCourseRegisteration"
      );

      setAllRegistrations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const registerCourse = async (courseId) => {
    try {
      await axios.post(
        "https://course-backend-a0oh.onrender.com/api/registerCourse",
        { courseId },
        { headers }
      );

      alert("Course Registered");
      fetchRegisteredCourses();
    } catch (err) {
      alert("Registration Failed");
    }
  };

  const unregisterCourse = async (courseId) => {
    try {
      await axios.post(
        "https://course-backend-a0oh.onrender.com/api/unregisterCourse",
        { courseId },
        { headers }
      );

      alert("Course Unregistered");
      fetchRegisteredCourses();
    } catch (err) {
      alert("Unregister Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchCourses();
    fetchRegisteredCourses();
    fetchAllRegistrations();
  }, []);

  return (
    <div className="p-6">

      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">
          Student Course Management
        </h1>

        <button
          onClick={logout}
          className="border px-4 py-2"
        >
          Logout
        </button>
      </div>

      {/* Available Courses */}

      <h2 className="text-xl font-semibold mb-2">
        Available Courses
      </h2>

      <table className="border w-full mb-6">
        <thead>
          <tr>
            <th className="border p-2">Course ID</th>
            <th className="border p-2">Course Name</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.courseId}>
              <td className="border p-2">
                {course.courseId}
              </td>

              <td className="border p-2">
                {course.courseName}
              </td>

              <td className="border p-2">
                <button
                  onClick={() =>
                    registerCourse(course.courseId)
                  }
                  className="border px-3 py-1"
                >
                  Register
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Registered Courses */}

      <h2 className="text-xl font-semibold mb-2">
        My Registered Courses
      </h2>

      <table className="border w-full mb-6">
        <thead>
          <tr>
            <th className="border p-2">Course ID</th>
            <th className="border p-2">Course Name</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {registeredCourses.map((course) => (
            <tr key={course.courseId}>
              <td className="border p-2">
                {course.courseId}
              </td>

              <td className="border p-2">
                {course.courseName}
              </td>

              <td className="border p-2">
                <button
                  onClick={() =>
                    unregisterCourse(course.courseId)
                  }
                  className="border px-3 py-1"
                >
                  Unregister
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* All Registrations */}

      <h2 className="text-xl font-semibold mb-2">
        All Student Registrations
      </h2>

      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-2">Student ID</th>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Course ID</th>
            <th className="border p-2">Course Name</th>
          </tr>
        </thead>

        <tbody>
          {allRegistrations.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">
                {row.studentId}
              </td>

              <td className="border p-2">
                {row.studentName}
              </td>

              <td className="border p-2">
                {row.courseId}
              </td>

              <td className="border p-2">
                {row.courseName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Dashboard;
