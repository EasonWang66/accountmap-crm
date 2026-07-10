import { Globe2, Mail, MapPin, Phone } from "lucide-react";
import type { Account } from "../data/types";

type AccountHeaderProps = {
  account: Account;
};

export function AccountHeader({ account }: AccountHeaderProps) {
  return (
    <section className="account-header" aria-label={`${account.name} account summary`}>
      <div className="logo-mark" aria-hidden="true">
        {account.logoUrl ? <img alt="" src={account.logoUrl} /> : null}
      </div>
      <div className="account-copy">
        <h1>{account.name}</h1>
        <div className="tag-row">
          {account.industryTags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <p>{account.description}</p>
      </div>
      <dl className="contact-list">
        <div>
          <Phone size={16} aria-hidden="true" />
          <dt>Phone</dt>
          <dd>{account.phone}</dd>
        </div>
        <div>
          <Mail size={16} aria-hidden="true" />
          <dt>Email</dt>
          <dd>{account.email}</dd>
        </div>
        <div>
          <Globe2 size={16} aria-hidden="true" />
          <dt>Website</dt>
          <dd>{account.website}</dd>
        </div>
        <div>
          <MapPin size={16} aria-hidden="true" />
          <dt>Address</dt>
          <dd>{account.address}</dd>
        </div>
      </dl>
    </section>
  );
}
