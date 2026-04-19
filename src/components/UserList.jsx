import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await API.get("/user-api/users");

        setUsers(res.data.payload || []);
      } catch (err) {
        setError(err?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
        {users.map((user) => (
          <div
            key={user._id || user.email}
            onClick={() => gotoUser(user)}
            className="p-10 shadow-2xl cursor-pointer hover:scale-105 transition"
          >
            <p className="text-3xl">{user.name}</p>
            <p className="text-2xl text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;