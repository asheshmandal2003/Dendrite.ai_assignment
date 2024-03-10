import { Button } from "./Button";
import Keycloak from "keycloak-js";

let initOptions = {
  url: "http://localhost:8080",
  realm: "master",
  clientId: "react-client",
};

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: "login-required",
  checkLoginIframe: true,
  pkceMethod: "S256",
}).then(
  (auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      kc.onTokenExpired = () => {
        console.log("Token Expired!");
      };
    }
  },
  () => {
    console.error("Authentication failed");
  }
);

const login = () => {
  kc.login();
};

const logout = () => {
  kc.logout();
};

export default function Navbar() {
  return (
    <nav className="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <a
          href="/"
          className="navbar-brand"
          style={{ cursor: "pointer", fontWeight: 600 }}
        >
          Drawing App
        </a>
        {kc ? (
          <Button
            onClick={logout}
            variant="btn btn-danger"
            btnText="Logout"
            icon="/images/logout.svg"
          />
        ) : (
          <Button
            onClick={login}
            variant="btn btn-light"
            btnText="Login"
            icon="/images/login.svg"
          />
        )}
      </div>
    </nav>
  );
}
