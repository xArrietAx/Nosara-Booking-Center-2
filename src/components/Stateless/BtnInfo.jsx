import { Button } from "../ui/Button";
import Image from "next/image";

export function BtnInfo({ children, size, img, variant, className }) {
  return (
    <Button as="div" size={size} className={className} variant={variant}>
      { img ? <Image src={img} width={25} height={25} alt="" /> : null }
      {children}
    </Button>
  );
}