import profile from "@/api/profile";
import Profile from "@/components/fragments/authenticated/profile";
import { redirect } from "next/navigation";

export default async function Home() {
  try {
    const firebaseUserProfile = await profile();
    if ("message" in firebaseUserProfile && !("uid" in firebaseUserProfile))
      redirect("/login");
  } catch (error) {
    console.log(error);
    redirect("/login");
  }

  return (
    <Profile />
    // <div className="justify-center items-center flex h-screen">
    //   Authenticated
    // </div>
  );
}
