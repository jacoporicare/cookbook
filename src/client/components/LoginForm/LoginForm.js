import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';

const LoginForm = ({
  username,
  password,
  rememberMe,
  isSubmitting,
  onChange,
  onSubmit,
}) => (
  <div>
    {isSubmitting && <Spinner overlay />}
    <div className="row">
      <div className="col-sm-12">
        <h1>Přihlášení</h1>
        <p className="lead">Zadej své uživatelské jméno a heslo.</p>
      </div>
      <div className="col-md-4">
        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label htmlFor="username" className="control-label">Uživatel</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="control-label">Heslo</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={onChange}
              />
              Neodhlašovat
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-lg btn-primary"
              disabled={isSubmitting}
            >
              Přihlásit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  rememberMe: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
