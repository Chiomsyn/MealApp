export default function FormExtra(){
    return(
        <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="\forget_password" className="font-medium text-slate-900 hover:text-gray-200">
            Forgot your password?
          </a>
        </div>
      </div>
    )
}