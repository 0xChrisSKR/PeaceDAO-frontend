export interface ProposalSummary {
  id: number;
  title: string;
  region: string;
  org: string;
  goalBNB: string;
  raisedBNB: string;
  cover: string;
  short: string;
  receiver: `0x${string}`;
  description: string;
}

export const proposals: ProposalSummary[] = [
  {
    id: 1,
    title: "Tainan School Rebuild",
    region: "Tainan, Taiwan",
    org: "Local Education Foundation",
    goalBNB: "50",
    raisedBNB: "12.5",
    cover: "/images/proposals/tainan-school.svg",
    short: "Repair classrooms damaged by flooding.",
    receiver: "0x000000000000000000000000000000000000dEaD",
    description:
      "Flash floods in Tainan left classrooms without safe flooring, lighting, or supplies. This proposal funds resilient repairs, new desks, and emergency kits so students can return to learning without fear of future storms."
  },
  {
    id: 2,
    title: "Kyiv Community Shelter",
    region: "Kyiv, Ukraine",
    org: "Hope Housing Collective",
    goalBNB: "80",
    raisedBNB: "44",
    cover: "/images/proposals/kyiv-shelter.svg",
    short: "Expand winterized shelter capacity.",
    receiver: "0x000000000000000000000000000000000000dEaD",
    description:
      "Volunteers are upgrading a basement network into a heated, stocked shelter for 60 residents. Funds cover insulation, backup power, and trauma-informed supplies that keep families safe during nightly sirens."
  },
  {
    id: 3,
    title: "Gaza Trauma Relief",
    region: "Gaza City, Palestine",
    org: "Frontline Medics",
    goalBNB: "120",
    raisedBNB: "68.4",
    cover: "/images/proposals/gaza-relief.svg",
    short: "Equip mobile trauma response teams.",
    receiver: "0x000000000000000000000000000000000000dEaD",
    description:
      "Emergency doctors are coordinating cross-border deliveries of trauma kits, stretchers, and telemedicine tablets. The grant keeps mobile units stocked and connected so lifesaving care reaches civilians faster."
  },
  {
    id: 4,
    title: "Sudan Solar Wells",
    region: "Gezira, Sudan",
    org: "Blue Nile Water Guild",
    goalBNB: "95",
    raisedBNB: "22.3",
    cover: "/images/proposals/sudan-water.svg",
    short: "Solar pumps for three conflict-displaced camps.",
    receiver: "0x000000000000000000000000000000000000dEaD",
    description:
      "Three camps host thousands of newly displaced families relying on trucked water. Installing solar borehole pumps restores clean water locally and reduces the risk of violence during daily collection routes."
  },
  {
    id: 5,
    title: "Myanmar Rural Clinic",
    region: "Kayah State, Myanmar",
    org: "Border Health Alliance",
    goalBNB: "65",
    raisedBNB: "15.75",
    cover: "/images/proposals/myanmar-clinic.svg",
    short: "Mobile clinic for conflict-affected villages.",
    receiver: "0x000000000000000000000000000000000000dEaD",
    description:
      "Nurses and medics travel by motorcycle to provide prenatal visits, vaccinations, and wound care. Funding keeps fuel, medicines, and communications devices active while the region awaits stable infrastructure."
  },
  {
    id: 6,
    title: "Haiti Renewal Hub",
    region: "Les Cayes, Haiti",
    org: "Bay Fò Kominote",
    goalBNB: "70",
    raisedBNB: "19.8",
    cover: "/images/proposals/haiti-renewal.svg",
    short: "Community rebuilding workshop and seed bank.",
    receiver: "0x000000000000000000000000000000000000dEaD",
    description:
      "Grassroots organizers are reopening a multi-use hub to teach resilient construction, store seeds, and coordinate disaster drills. Support pays for tools, training stipends, and stipends for women-led cooperatives."
  }
];

export function getProposalById(id: number) {
  return proposals.find((proposal) => proposal.id === id);
}
