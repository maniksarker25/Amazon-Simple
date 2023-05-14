import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Providers/AuthProvider";
import { sendEmailVerification } from "firebase/auth";
import { FaEye } from "react-icons/fa";

const SignUp = () => {
  const { createUser, logIn } = useContext(authContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);
    setError("");
    setSuccess("");

    // validation
    if (password.length < 6) {
      setError("Password must have 6 character");
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must have 1 uppercase");
      return;
    } else if (!/(?=.*[0-9])/.test(password)) {
      setError("Password must have 1 numeric");
      return;
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError("Password must have 1 special character");
      return;
    }
    // create user
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;

        handleSendEmailVerification(result.user);
        console.log(loggedUser);

        // if(!loggedUser.emailVerified){
        //   setError('Email not verified')
        //   return
        // }
        setSuccess("User Login Successfully");
        form.reset();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  // email verification
  const handleSendEmailVerification = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("Please verify you email");
    });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">Sign Up</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-12 bottom-56 cursor-pointer"
                  >
                    <FaEye />
                  </span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {error ? (
                <div>
                  <p className="text-red-600">{error}</p>
                </div>
              ) : (
                <div>
                  <p className="text-green-500 text-2xl">{success}</p>
                </div>
              )}
              <div className="form-control mt-6">
                <button className=" bg-orange-300 px-4 py-3 rounded-lg font-semibold ">
                  Sign Up
                </button>
              </div>
              <p>
                Already have an account?Please{" "}
                <Link to="/login">
                  <button className="link text-indigo-400">Login</button>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
