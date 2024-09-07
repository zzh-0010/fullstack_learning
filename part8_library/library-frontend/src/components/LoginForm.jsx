import { useState, useEffect } from "react";
import { LOGIN } from "../../queries";
import { useMutation } from "@apollo/client";
import { ME } from "../../queries";


const LoginForm = ( { show, setPage, setToken } ) => { //eslint-disable-line

  const [username, setUsername] = useState("ladygaga");
  const [password, setPassword] = useState("secret");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
        console.log(error.graphQLErrors[0].message)
    },
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if(result.data){
        const token = result.data.login.value
        console.log('token in logform', token)
        localStorage.setItem('library-user-token', token)
        setToken(token)
        setPage('books')
    }
  },[result.data, setToken, setPage]) //eslint-disable-line

  if (!show) {
    return null;
  }

  console.log('we good?')

  const submit = async(event) => {
    event.preventDefault();
    login({variables: {username, password}})
  };

  return (
    <div>
      <h1>login</h1>
      <form onSubmit={submit}>
        <div>
          username
          <input value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input value={password} onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
