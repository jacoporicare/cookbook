import React, { ChangeEventHandler, FormEventHandler } from 'react';

import Spinner from '../Spinner/Spinner';

interface Props {
  username: string;
  password: string;
  rememberMe: boolean;
  isSubmitting: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const LoginForm = ({ username, password, rememberMe, isSubmitting, onChange, onSubmit }: Props) => (
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
            <label htmlFor="username" className="control-label">
              Uživatel
            </label>
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
            <label htmlFor="password" className="control-label">
              Heslo
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="clearfix">
            <div className="checkbox pull-left">
              <label>
                <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={onChange} />
                Neodhlašovat
              </label>
            </div>
            <div className="pull-right">
              <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                Přihlásit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default LoginForm;
