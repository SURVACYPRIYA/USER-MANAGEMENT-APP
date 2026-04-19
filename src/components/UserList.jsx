import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../api";

function UserList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      setError(null);

      try {
        const res = await API.get("/user-api/users");

        // safer fallback handling
        const data = res.data?.payload || res.data || [];

        setUsers(Array.isArray(data) ? data : []);

      } catch (err) {
        console.log("Fetch Users Error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  const gotoUser = (userObj) => {
    navigate("/user", { state: userObj });
  };

  if (loading) {
    return (
      <p className="text-center text-orange-600 text-3xl">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 text-3xl">
        {error}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-5xl text-gray-600">List of Users</h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No users found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {users.map((userObj, index) => (
            <div
              key={userObj.email || index}
              onClick={() => gotoUser(userObj)}
              className="p-10 shadow-2xl cursor-pointer hover:scale-105 transition"
            >
              <p className="text-3xl">{userObj.name}</p>
              <p className="text-2xl">{userObj.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;