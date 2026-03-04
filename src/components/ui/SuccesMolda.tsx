import successImage from "@/assets/success.png";
import Image from "next/image";
import Link from "next/link";

export default function SuccesMolda({
  title,
  route,
}: {
  title?: string;
  route?: string;
}) {
  return (
    <div>
      <div className="h-48 w-48 mx-auto ">
        <Image
          src={successImage}
          alt="Success"
          className="w-full h-full mx-auto mb-4"
        />
      </div>
      {title && (
        <h2 className="text-2xl font-semibold text-center pt-8 ">{title}</h2>
      )}

      <div className="mx-auto w-full flex  justify-center pt-8">
        <Link
          href={route || "/"}
          className="w-48 bg-primaryColor text-white py-2 px-3 rounded-md text-center"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
