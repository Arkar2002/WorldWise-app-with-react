import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome {user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default User;
