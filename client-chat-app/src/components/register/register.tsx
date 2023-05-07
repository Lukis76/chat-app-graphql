import { SvgEmail } from "@assets/svg/@";
import { SvgPass } from "@assets/svg/Pass";
import { SvgOffView } from "@assets/svg/offView";
import { SvgUser } from "@assets/svg/user";
import { SvgView } from "@assets/svg/view";
import { Loading } from "@components/utils/loading";
import { useAuthorization, useForm } from "@hooks/index";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { SvgAlert } from "@assets/svg/alert";
import css from "@styles/signIn_signUp/form.module.css";

export const Register = () => {
  const [viewPass, setViewPass] = useState<boolean>(false);

  const { handleChange, handleSubmit, values, errors, errorValues, loading } = useForm("REGISTER", {
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const { check } = useAuthorization();

  return (
    <div className={`container ${css.container}`}>
      {check === true ? (
        <Navigate to={"/chat"} />
      ) : check === undefined || loading ? (
        <Loading />
      ) : (
        <section className={`${css.form_container}`}>
          <h3>Register</h3>
          <form className={`${css.form}`} onSubmit={handleSubmit}>
            {/* ============================================================= */}
            <label className={`${css.label_username}`}>
              <input
                autoFocus
                name="username"
                value={values?.username || ""}
                onChange={handleChange}
                placeholder="Username"
                className={`${errors.username} `}
              />
              <em className={`${css.name}`}>Username</em>
              <i aria-checked={true}>
                <SvgUser />
              </i>
              {values.username !== undefined && (
                <p className={`${css.info}`}>
                  <SvgAlert size={18} />
                  <small>{errorValues.username}</small>
                </p>
              )}
            </label>
            {/* ============================================================= */}
            <label className={`${css.label_email}`}>
              <input
                type="email"
                name="email"
                value={values?.email || ""}
                onChange={handleChange}
                placeholder="Email"
                className={`${errors.email} `}
              />
              <em className={`${css.name}`}>Email</em>
              <i aria-checked={true}>
                <SvgEmail />
              </i>
              {values.email !== undefined && (
                <p className={`${css.info}`}>
                  <SvgAlert size={18} />
                  <small>{errorValues.email}</small>
                </p>
              )}
            </label>
            {/* ============================================================= */}
            <label className={`${css.label_password}`}>
              <input
                type={viewPass ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className={`${errors.password} `}
              />
              <em className={`${css.name}`}>Password</em>
              <i aria-checked={true}>
                <SvgPass />
              </i>
              <span aria-checked={true} onClick={() => setViewPass((p) => !p)}>
                {viewPass ? <SvgOffView /> : <SvgView />}
              </span>
              {values.password !== undefined && (
                <p className={`${css.info}`}>
                  <SvgAlert size={18} />
                  <small>{errorValues.password}</small>
                </p>
              )}
            </label>
            {/* ============================================================= */}
            <label className={`${css.label_confirmPassword}`}>
              <input
                type={viewPass ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm password"
                className={`${errors.confirmPassword} `}
              />
              <em className={`${css.name}`}>Confirm password</em>
              <i aria-checked={true}>
                <SvgPass />
              </i>
              <span onClick={() => setViewPass((p) => !p)}>
                {viewPass ? <SvgOffView /> : <SvgView />}
              </span>
              {values.confirmPassword !== undefined && (
                <p className={`${css.info}`}>
                  <SvgAlert size={18} />
                  <small>{errorValues.confirmPassword}</small>
                </p>
              )}
            </label>
            {/* ============================================================= */}
            <button
              type="submit"
              className="text-center py-1 px-6 rounded-lg bg-blue-500 hover:opacity-30"
              disabled={
                (errors.username && errors.email && errors.password && errors.confirmPassword) !==
                "success"
              }
            >
              SignUp
            </button>
          </form>
          <span>
            <em>ya estas registrado?</em>
            <Link to={"/login"}>SignIn</Link>
          </span>
        </section>
      )}
    </div>
  );
};
