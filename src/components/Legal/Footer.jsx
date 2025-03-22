import { FollowUs } from "../Stateless/FollowUs";

export function Footer({ data }) {

  const {title} = data

  return (
    <div className="text-lg-medium text-[#4d4d4d]">

      <div className="space-y-6">
      <h3 className="heading-6 text-black">Thank you for visiting!</h3>
      <p> By using our website or services, you consent the {title} of our bussiness. Please review this policy periodically for updates or changes. </p>
      </div>

      <FollowUs wrapClassName="my-6" titleClassName="text-black" />

      <div>
        <p>Best regards,</p>
        <p className="text-lg-bold text-black">NBC Team</p>
      </div>

    </div>
  );
}
