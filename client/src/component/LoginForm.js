const LoginForm = ({
   handleSubmit,
   email,
   setEmail,
   password,
   setPassword,
}) => (
   <form onSubmit={handleSubmit} className='mt-3'>
      <div className='mb-3 form-group'>
         <label className='form-label'> email</label>
         <input
            type='email'
            className='form-control'
            placeholder='Enter email '
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
      </div>
      <div className='mb-3 form-group'>
         <label className='form-label'> password</label>
         <input
            type='password'
            className='form-control'
            placeholder='Enter password '
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
      </div>{' '}
      <button
         disabled={!email || !password}
         className='btn btn-primary btn-rounded '>
         Submit
      </button>
   </form>
);

export default LoginForm;
