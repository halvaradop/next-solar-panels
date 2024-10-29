


const Login = () => {
    return   <div className="flex items-center justify-center min-h-screen">
    <div className=" w-80 h-100 mx-auto p-5 rounded-lg shadow-lg text-center">
    <h2 className="text-xl/[24px] text-left font-bold mb-5">Log In</h2>
    <form className="flex flex-col">
      <label className="text-left font-thin mb-1 text-neutral-500 text-sm">Email address or user name</label>
      <input
        type="email"
        className="rounded-lg  p-2 mb-3 rounded border border-gray-300 text-base"
        required
      />
      <label className="text-left font-thin mb-1 text-neutral-500 text-sm">Password</label>
      <input
        type="password"
  
   
        className="rounded-lg p-2 mb-3  border border-gray-300 text-base"
        required
      />
<p className="text-red-500 text-sm mb-3"></p>
      <p className="text-xs text-gray-500 mb-3">
        By continuing, you agree to the
    <a className="underline text-gray-600"> Terms of use</a> 
       <a className="underline text-gray-600"> and Privacy Policy</a>
      </p>
      <button type="submit" className="rounded-lg bg-gray-500 text-white py-2  text-base hover:bg-gray-800">Log In</button>
    </form>

      <a className="text-xs text-gray-600 underline block mt-3">Forget your password?</a>
    
  </div>
  </div>
}

export default Login
