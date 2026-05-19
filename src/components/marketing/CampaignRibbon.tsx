import { getActiveCampaign } from "@/data/campaigns";

/**
 * Thin site-wide strip shown only while a campaign is running.
 * Renders nothing when there is no active campaign.
 */
export default function CampaignRibbon() {
  const campaign = getActiveCampaign();
  if (!campaign) return null;

  return (
    <div className="bg-[var(--brand-primary)] px-4 py-1.5 text-center text-[12px] font-semibold leading-tight text-white">
      <span className="font-extrabold tracking-wide">{campaign.discountLabel}</span>
      <span className="mx-1.5 opacity-70">·</span>
      {campaign.title} — code{" "}
      <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[11px] font-bold">
        {campaign.code}
      </span>
      <span className="mx-1.5 opacity-70">·</span>
      <span className="opacity-90">ends {campaign.endDate}</span>
    </div>
  );
}
