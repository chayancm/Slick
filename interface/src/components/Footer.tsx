import { Link } from "react-router-dom";

export default function FooterSection({ title, links }) {
  return (
    <div className="grid gap-1">
      <h3 className="font-semibold">{title}</h3>
      {links.map((link) => (
        <Link key={link} to="#" className="hover:underline">
          {link}
        </Link>
      ))}
    </div>
  );
}
