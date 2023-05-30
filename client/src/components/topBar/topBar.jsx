import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth/authProvider";
import "./topBar.scss";

const unselectedPaths = ["/edit-pet"];

export default function TopBar() {
  const auth = useAuth();
  const location = useLocation();
  const currentRoute = location.pathname;
  const handleLogout = async () => {
    await auth.signOut();
  };

  console.log(auth);
  return (
    <div id="topBar">
      <Tabs
        textColor="inherit"
        value={unselectedPaths.includes(currentRoute) ? false : currentRoute}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab label="Home" value="/" to="/" component={Link} />
        <Tab label="About" value="/about" to="/about" component={Link} />
        <Tab label="Pets" value="/pets" to="/pets" component={Link} />
        <Tab
          label="Add Pet"
          value="/add-pet"
          to="/add-pet"
          component={Link}
          style={{ display: auth?.user?.role === "admin" ? undefined : "none" }}
        />
        <Tab
          key="Favorites"
          label="Favorites"
          value="/favorites"
          to="/favorites"
          component={Link}
        />
        <Tab
          key="Logout"
          label="Logout"
          value="/login"
          onClick={handleLogout}
          style={{ display: auth.user ? undefined : "none" }}
        />
        <Tab
          label="Login"
          value="/login"
          to="/login"
          component={Link}
          style={{ display: !auth.user ? undefined : "none" }}
        />
        <Tab
          label="Signup"
          value="/signup"
          to="/signup"
          component={Link}
          style={{ display: !auth.user ? undefined : "none" }}
        />
      </Tabs>
    </div>
  );
}
