const RegisterForm = ({
   handleSubmit,
   name,
   setName,
   email,
   setEmail,
   password,
   setPassword,
}) => (
   <form onSubmit={handleSubmit}>
      <div className=' p-5 bg-light mt-3 text-capitalize '>
         {' '}
         <div className='mb-3 form-group '>
            <label className='form-label'>Your name</label>
            <input
               type='text'
               className='form-control'
               placeholder='Enter name '
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </div>
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
            disabled={!name || !email || !password}
            className='btn btn-primary'>
            Submit
         </button>
      </div>
   </form>
);

export default RegisterForm;
