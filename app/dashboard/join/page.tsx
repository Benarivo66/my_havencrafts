// app/dashboard/join/page.tsx

export default function JoinPage() {
  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Join Handcraft Haven</h1>
      <p className="text-lg text-gray-700 mb-6">
        To join our community of artisans and sellers, please send an email or give us a call.
      </p>
      <div className="text-lg space-y-2">
        <p>
          📧 Email us at:{" "}
          <a
            href="mailto:join@handcrafthaven.com"
            className="text-secondary hover:underline"
          >
            join@handcrafthaven.com
          </a>
        </p>
        <p>
          📞 Call us at:{" "}
          <a
            href="tel:+1234567890"
            className="text-secondary hover:underline"
          >
            +1 (234) 567-890
          </a>
        </p>
      </div>
    </div>
  );
}
