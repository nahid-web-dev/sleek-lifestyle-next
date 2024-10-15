import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Spinner from "@/components/Spinner/Spinner"
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'



export default async function UserInfoLayout({ children }) {

  const session = await getServerSession(authOptions)

  if (!session) {
    throw redirect('/auth/signin')
  }

  return (
    <div>
      {children}
    </div>
  )

}