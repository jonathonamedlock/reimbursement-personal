import * as React from 'react';


export class LoginComponent extends React.Component<any, any> {

  public render() {
    return (
        <form action="/login">
            <input type="text" name="username" placeholder="Username"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" value="Log in"/>
        </form>
    );
  }
}