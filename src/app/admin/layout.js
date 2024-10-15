
import { redirect } from "next/navigation";
import checkAdmin from "@/lib/checkAdmin";
import MenuStateWrapper from "@/components/MenuStateWrapper/MenuStateWrapper";

export default async function RootLayout({ children }) {

  const isAdminUser = await checkAdmin()
  if (isAdminUser) {
    return (
      <MenuStateWrapper>
        {children}
      </MenuStateWrapper>
    )
  }

  return redirect('/shop')
}

