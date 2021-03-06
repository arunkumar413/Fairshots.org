import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PhotographerForm from "../registerForm/photographerform";
import OrganizationForm from "../registerForm/organizationform";
import { renderField, validate } from "../registerForm/helper-functions";
import { update } from "../../actions";

/**
 *
 */
class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: window.location.href.match("photographer") ? "photographer" : "organization"
        };
    }

    render() {
        const { doUpdate, handleSubmit, token, initialValues, id } = this.props;
        return (
            <div>
                {this.state.userType === "photographer" ? (
                    <PhotographerForm
                        handleSubmit={handleSubmit(
                            doUpdate(this.state.userType, id, initialValues, token)
                        )}
                        renderField={renderField}
                    />
                ) : (
                    <OrganizationForm
                        handleSubmit={handleSubmit(
                            doUpdate(this.state.userType, id, initialValues, token)
                        )}
                        renderField={renderField}
                    />
                )}
            </div>
        );
    }
}
const mapStateToProps = state => {
    const { id, createdAt, updatedAt, error, Photos, __proto__, ...initialValues } = state.profile;
    return {
        id,
        initialValues,
        token: state.auth.user.token
    };
};
const mapDispatchToProps = dispatch => ({
    doUpdate: (userType, id, initialValues, token) => formFilled => {
        const updateForm = Object.keys(formFilled)
            .filter(k => formFilled[k] !== initialValues[k])
            .reduce((obj, i) => ({ ...obj, [i]: formFilled[i] }), {});
        console.log(updateForm);
        dispatch(update(userType, id, updateForm, token));
    }
});

const up = reduxForm({
    form: "registerNewForm",
    validate,
    enableReinitialize: true
})(UpdateProfile);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(up);
