import Image from "next/image";
import FurnitureIllustration from "../../public/images/furniture-illustration.jpg";
import { createClient } from "../utils/server";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: React.PropsWithChildren) {
  const supabase = createClient();

  const session = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="max-w-7xl min-h-screen relative container mx-auto">
      <div className="grid grid-cols-2 gap-x-20">
        {" "}
        <div className="my-auto">
          <Image src={FurnitureIllustration} alt="illustration" />
        </div>
        <div className="w-[80%]">{children}</div>
      </div>
    </div>
  );
}
