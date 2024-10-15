import Spinner from "@/components/Spinner/Spinner"

function loading() {
  return (
    <div className='flex justify-center items-center h-[60vh]'>
      <Spinner />
    </div>
  )
}

export default loading