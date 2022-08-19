export default function FormAction({
    handleSubmit,
    type,
    action='submit',
    text,
    isLoading
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="group relative w-full flex justify-center py-2 px-4 border-2 border-slate-900 text-xl font-medium rounded-md text-white bg-slate-900 hover:text-slate-900 hover:bg-transparent mt-10 mb-20"
                onClick={handleSubmit}
                disabled={isLoading}
            >

                {text}
            </button>
            :
            <></>
        }
        </>
    )
}