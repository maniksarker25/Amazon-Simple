import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../Providers/AuthProvider";
import { FaGoogle, FaEye } from "react-icons/fa";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const { logIn, googleSignIn, resetPassword, logOut } =
    useContext(authContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useContext(authContext);
  // console.log(user);
  // console.log(showPassword)
  // console.log(location)

  const from = location.state?.form?.pathname || "/";
  // console.log(from)

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
    setError("");
    setSuccess("");

    // login user

    logIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        if (!loggedUser.emailVerified) {
          logOut();
          alert("Email not verified");
          sendEmailVerification(loggedUser)
          return;
        } else {
          setSuccess("User Login Successfully");
          form.reset();
          navigate(from, { replace: true });
        }
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  // google sign in
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  // handle reset password ----
  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      setError("Provide email for reset password");
    }
    resetPassword(email)
      .then(() => {})
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  ref={emailRef}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-12 top-44 cursor-pointer"
                  >
                    <FaEye />
                  </span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <p onClick={handleResetPassword}>
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </p>
                </label>
                <p className="text-red-600">{error}</p>
                <p className="text-green-500">{success}</p>
              </div>
              <div className="form-control mt-6">
                <button className=" bg-orange-300 px-4 py-3 rounded-lg font-semibold ">
                  Login
                </button>
                <button
                  onClick={handleGoogleSignIn}
                  className="bg-orange-300 px-4 py-3 rounded-lg font-semibold mt-3 flex items-center gap-1 justify-center"
                >
                  {" "}
                  <FaGoogle /> Sign in with Google
                </button>
              </div>
              <p>
                New to amazon?Please{" "}
                <Link to="/signUp">
                  <button className="link text-indigo-400">Sign Up</button>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
