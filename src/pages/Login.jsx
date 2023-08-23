import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Button from "../components/Button";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  function handleSumit(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSumit}>
        <div className={styles.row}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Button type={"primary"}>Login</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
