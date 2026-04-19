import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import API from "../api";

function AddUser() {
  const { register, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onUserCreate = async (newUser) => {
    setLoading(true);
    setError(null);

    try {
      await API.post("/user-api/users", newUser);

      reset(); // clears form after success
      navigate("/users-list");

    } catch (err) {
      console.log("API Error:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-5xl text-gray-600">Add New User</h1>

      {loading && (
        <p className="text-orange-600 text-2xl mt-5">Loading....</p>
      )}

      {error && (
        <p className="text-red-600 text-2xl mt-5">{error}</p>
      )}

      <form
        onSubmit={handleSubmit(onUserCreate)}
        className="max-w-60 mx-auto mt-10"
      >
        <input
          type="text"
          {...register("name")}
          className="mb-5 border w-full"
          placeholder="Name"
          required
        />

        <input
          type="text"
          {...register("email")}
          className="mb-10 border w-full"
          placeholder="Email"
          required
        />

        <input
          type="date"
          {...register("dateOfBirth")}
          className="mb-10 border w-full"
          required
        />

        <input
          type="number"
          {...register("mobileNumber")}
          className="mb-10 border w-full"
          placeholder="Mobile Number"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;