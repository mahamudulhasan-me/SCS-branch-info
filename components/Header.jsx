/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Header = () => {
  return (
    <div className=" px-[5%] flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-20">
      <Link href="/">
        <img src="/scsLogo.png" width="50" alt="SCS Logo"></img>
      </Link>
      <h2 className="font-semibold text-gray-800 md:text-2xl text-xl">
        Sundarban Courier Service (Pvt.) Ltd.
      </h2>
    </div>
  );
};

export default Header;
