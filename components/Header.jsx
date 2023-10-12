import scsLogo from "@/public/scsLogo.jpg";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className=" px-[5%] flex justify-between items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] py-4">
      <Link href="/">
        <Image width={50} height={20} src={scsLogo} alt="SCS Logo" />
      </Link>
      <div className="flex items-center gap-4 "></div>
    </div>
  );
};

export default Header;
