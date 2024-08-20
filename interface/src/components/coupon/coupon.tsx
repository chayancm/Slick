export default function CouponCard({ code, description }) {
  return (
    <div className="bg-muted rounded-lg p-6 shadow-sm group">
      <h2 className="text-2xl font-bold">{description}</h2>
      <p className="mt-2 text-muted-foreground">
        Use the coupon code {code} at checkout.
      </p>
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={code}
          readOnly
          className="flex-1 bg-background border-none shadow-none"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            alert("Coupon code copied to clipboard!");
          }}
          className="transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
