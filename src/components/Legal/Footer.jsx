import { MdOutlineMail, MdFacebook, MdWhatsapp } from "@/icons/index";
import { Button } from "../ui/Button";
import Link from "next/link";

export function Footer({ data }) {

  const {title} = data

  return (
    <div className="text-lg-medium text-[#4d4d4d]">

      <div className="space-y-6">
      <h6 className="heading-6 text-black">Thank you for visiting!</h6>
      <p> By using our website or services, you consent the {title} of our bussiness. Please review this policy periodically for updates or changes. </p>
      </div>

      <div className="space-y-2.5 my-6">
      <span className="text-lg-bold text-black">Contact us</span>
      <div className="flex flex-wrap gap-2 text-black">
        <Button as={Link} href="https://www.facebook.com/profile.php?id=61557653082047" target="_blank" rel="noopener noreferrer" isIconOnly className="hover:-translate-y-1" >
          <MdFacebook className="size-6" />
        </Button>
        <Button as={Link} href="https://wa.me/50686012266?text=Hello Nosara Booking Center." target="_blank" rel="noopener noreferrer" isIconOnly className="hover:-translate-y-1" >
          <MdWhatsapp className="size-6" />
        </Button>
        <Button as={Link} href="mailto:nbc@nosarabookingcenter.com" target="_blank" rel="noopener noreferrer" isIconOnly className="hover:-translate-y-1" >
          <MdOutlineMail className="size-6" />
        </Button>
      </div>
      </div>

      <div>
        <p>Best regards,</p>
        <p className="text-lg-bold text-black">NBC Team</p>
      </div>

    </div>
  );
}
