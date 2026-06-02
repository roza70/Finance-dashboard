import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/logo.svg" alt="BudgetIQ" height={40} width={40} />
        <p className="font-bold text-white text-2xl ml-2.5">
          Budget<span className="text-indigo-400">IQ</span>
        </p>
      </div>
    </Link>
  );
};