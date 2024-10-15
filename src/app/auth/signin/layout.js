export const metadata = {
  title: "Signin Page",
  description: "Sleek-lifestyle user signin page"
}


export default async function AuthLayout({ children }) {

  return (
    <div className="h-[70vh] flex justify-center items-center ">
      {children}
    </div>
  )
}