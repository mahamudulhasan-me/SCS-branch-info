import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import scsLogo from "../assets/scsLogo.jpg";

const Header = () => {
  return (
    <div className=" px-[5%] flex justify-between items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] py-4">
      <Link href="/">
        <Image width={50} height={20} src={scsLogo} alt="SCS Logo" />
      </Link>
      <div className="flex items-center gap-4 ">
        <Button className="bg-[#0C4A9A] hover:bg-[#3C74BD] text-white font-semibold py-2 px-4">
          Pickup Request
        </Button>
        <div className="ring rounded-full text-2xl p-0.5 ring-[#0C7D83]">
          <FaUserCircle size={30} color="#0C7D83" />
        </div>
      </div>
    </div>
  );
};

export default Header;
