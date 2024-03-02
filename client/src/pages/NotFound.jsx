import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <div>
      <FaExclamationTriangle />
      <h2>404</h2>
      <p>Sorry, this page does not exist</p>
      <Link to='/'>Go back</Link>
    </div>
  )
}
