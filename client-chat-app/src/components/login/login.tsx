import { useAuthorization, useForm } from "@hooks/index";
import { Link, Navigate } from "react-router-dom";
import css from "@styles/signIn_signUp/form.module.css";
import { Loading } from "@components/utils/loading";
import { useState } from "react";
import { SvgEmail } from "@assets/svg/@";
import { SvgPass } from "@assets/svg/Pass";
import { SvgView } from "@assets/svg/view";
import { SvgOffView } from "@assets/svg/offView";

export const Login = () => {
  const [viewPass, setViewPass] = useState<boolean>(false);
  const { handleChange, handleSubmit, errorValues, loading } = useForm("LOGIN", {
    email: undefined,
    password: undefined,
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
          <h3>Login</h3>
          <form className={`${css.form}`} onSubmit={handleSubmit}>
            <label className={`${css.label_email}`}>
              <input autoFocus name="email" onChange={handleChange} placeholder="Email" />
              <em className={`${css.name}`}>Email</em>
              <i aria-checked={true}>
                <SvgEmail />
              </i>
            </label>
            <label className={`${css.label_password}`}>
              <input
                type={viewPass ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
              <em className={`${css.name}`}>Password</em>
              <i>
                <SvgPass />
              </i>
              <span aria-checked={true} onClick={() => setViewPass((p) => !p)}>
                {viewPass ? <SvgOffView /> : <SvgView />}
              </span>
            </label>
            <button
              type="submit"
              disabled={(errorValues.email && errorValues.password) !== "success"}
            >
              SignIn
            </button>
          </form>
          <span>
            <em>todavia no estas registrado?</em>
            <Link to={"/register"}>SignUp</Link>
          </span>
        </section>
      )}
    </div>
  );
};
