import { format } from "date-fns";

interface CampaignDayStat {
  name: string;
  spendTl: number;
  clicks: number;
  conversions: number;
}

export interface TodayAdsStats {
  totalSpendTl: number;
  budgetTl: number;
  totalClicks: number;
  totalConversions: number;
  campaigns: CampaignDayStat[];
}

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  return data.access_token as string;
}

export async function fetchTodayAdsStats(): Promise<TodayAdsStats> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN!;
  const today = format(new Date(), "yyyy-MM-dd");

  const token = await getAccessToken();

  const query = `
    SELECT campaign.name, campaign.status,
           metrics.impressions, metrics.clicks, metrics.cost_micros,
           metrics.conversions, campaign_budget.amount_micros
    FROM campaign
    WHERE segments.date = '${today}'
    AND campaign.status = 'ENABLED'
    ORDER BY metrics.cost_micros DESC
  `;

  const res = await fetch(
    `https://googleads.googleapis.com/v20/customers/${customerId}/googleAds:search`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "developer-token": devToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );

  const data = await res.json();
  const rows = (data.results ?? []) as Array<{
    campaign: { name: string; status: string };
    campaignBudget?: { amountMicros?: string };
    metrics: { costMicros?: string; clicks?: string; conversions?: string };
  }>;

  let totalSpend = 0;
  let totalClicks = 0;
  let totalConversions = 0;
  let totalBudget = 0;
  const campaigns: CampaignDayStat[] = [];

  for (const row of rows) {
    const spend = Number(row.metrics.costMicros ?? 0) / 1_000_000;
    const clicks = Number(row.metrics.clicks ?? 0);
    const convs = Number(row.metrics.conversions ?? 0);
    const budget = Number(row.campaignBudget?.amountMicros ?? 0) / 1_000_000;

    totalSpend += spend;
    totalClicks += clicks;
    totalConversions += convs;
    totalBudget += budget;

    campaigns.push({ name: row.campaign.name, spendTl: spend, clicks, conversions: convs });
  }

  return {
    totalSpendTl: totalSpend,
    budgetTl: Math.round(totalBudget),
    totalClicks,
    totalConversions,
    campaigns,
  };
}
