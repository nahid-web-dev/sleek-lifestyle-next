import { getServerSession } from 'next-auth';
import { authOptions } from "../app/api/auth/[...nextauth]/route"

export default async function checkAdmin() {

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== 'admin') {
      return false; // Not an admin
    }

    return true; // User is an admin
  } catch (error) {
    return false
  }

}