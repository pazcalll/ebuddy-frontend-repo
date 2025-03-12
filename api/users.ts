"use server";

import { TMessage } from "@/components/entities/message";
import { TUser } from "@/components/entities/user";
import { cookies } from "next/headers";

const users = async (): Promise<TUser[] | TMessage> => {
  try {
    const token = (await cookies()).get("token").value;
    const response = await fetch(process.env.BACKEND_URL + "/fetch-user-data", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default users;
