import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function PageNotFound() {
  return (
    <div>
      <h1>Page not found 😢</h1>
      <Link to="/">
        <Button type="primary">Home</Button>
      </Link>
    </div>
  );
}
