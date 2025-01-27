import { BtnInfo } from "../Stateless/BtnInfo";

export function Header({ data }) {
  const { title, date } = data;

  return (
    <div className="space-y-10 mb-8">
      <div className="flex flex-col items-center justify-center gap-5 text-center">
      <BtnInfo img="/legal/document_emoji.webp">AGREEMENT</BtnInfo>
      <h1 className="heading-2">{title}</h1>
      <p className="text-xl-medium">Last Update {date}</p>
    </div>

    <div className="space-y-[10.4px]">
      <h2 className="heading-6">Welcome to Nosara Booking Center</h2>
      <p className="text-lg-medium text-[#4d4d4d]">Before you begin using our platform, please take a moment to review the {title} that govern your use of our website and services.</p>
    </div>
    </div>
  );
}