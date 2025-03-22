import Link from "next/link";
import { Button } from "../ui/Button";

export function FollowUs({ wrapClassName, titleClassName, btnVariant }) {
    return <div className={`flex flex-col gap-2.5 ${wrapClassName}`}>
    <p className={`text-lg-bold ${titleClassName}`}>
    Follow us
    </p>
    <div className="flex flex-wrap gap-2">
      <Button as={Link} variant={btnVariant} href="https://www.instagram.com/nosara_bc" target="_blank" rel="noopener noreferrer" isIconOnly="md" className="hover:-translate-y-1" aria-label="Follow us on instagram">
      <i className="icon-[tabler--brand-instagram-filled] size-6" />
      </Button>
      <Button as={Link} variant={btnVariant} href="https://www.facebook.com/profile.php?id=61557653082047" target="_blank" rel="noopener noreferrer" isIconOnly="md" className="hover:-translate-y-1" aria-label="Visit our facebook page">
      <i className="icon-[mage--facebook-square] size-6" />
      </Button>
      <Button variant={btnVariant} isIconOnly="md" className="hover:-translate-y-1" aria-label="Just for decorating">
      <i className="icon-[tabler--brand-youtube-filled] size-6" />
      </Button>
    </div>
    </div>
}