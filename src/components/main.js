import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Contact from "./contact";
import TermsandConditions from "./terms-and-conditions";
import RegisterForm from "../containers/registerForm";
import UserProfile from "../containers/userProfile";
import AllOrgs from "../containers/allOrgs";
import AllPhotographers from "../containers/allPhotographers";
import ProjectForm from "../containers/projectForm";
import ProjectPage from "../containers/projectPage";
import PasswordReset from "../containers/passwordReset";

export default function Main(props) {
    return (
        <main>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/contact-us" exact component={Contact} />
                <Route path="/register" exact component={RegisterForm} />
                <Route path="/photographers" exact component={AllPhotographers} />
                <Route path="/organizations" exact component={AllOrgs} />
                <Route path="/terms-and-conditions" exact component={TermsandConditions} />
                <Route
                    path="/create-a-project"
                    render={() =>
                        props.isAuthenticated === true && props.userType === "organization" ? (
                            <ProjectForm newProject />
                        ) : (
                            <Redirect to="/" />
                        )
                    }
                />
                <Route path="/login/pwreset/:token" component={PasswordReset} />
                <Route path="/project/:projId" component={ProjectPage} />
                <Route path="/:userType/:userId" component={UserProfile} />
            </Switch>
        </main>
    );
}
