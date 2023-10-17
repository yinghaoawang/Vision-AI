import Link from "next/link";

export default function PaymentCancelledPage() {
  return (
    <>
      <h2 className="text-2xl">Payment Cancelled</h2>
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
