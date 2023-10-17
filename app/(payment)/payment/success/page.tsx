import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <>
      <h2 className="text-2xl">Payment Success</h2>
      <p>
        Click{" "}
        <Link className="text-blue-500" href="/dashboard">
          here
        </Link>{" "}
        to return to dashboard.
      </p>
    </>
  );
}
