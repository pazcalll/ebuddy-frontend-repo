import { TFirebaseUserProfile } from "@/components/entities/firebaseUser";
import { TMessage } from "@/components/entities/message";
import { cookies } from "next/headers";

const profile = async (): Promise<TFirebaseUserProfile | TMessage> => {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("No token found");

    const response = await fetch(process.env.BACKEND_URL + "/profile", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error: TMessage = await response.json();
      throw new Error(error.message);
    }

    const data: TFirebaseUserProfile = await response.json();
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    throw error;
  }
};

export default profile;
