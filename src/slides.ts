// If assets are not found, we use a placeholder string to prevent build failure
const boran = "https://ui-avatars.com/api/?name=Boran+Bodur&background=141414&color=fff";
import sabrihoca from './assets/sabrihoca.jpeg';
import engin from './assets/engin.jpg';
import fig1 from './assets/Fig1.png';
import fig2 from './assets/Fig2.png';
import fig3 from './assets/Fig3.png';
import fig4 from './assets/Fig4.png';
import fig5_6 from './assets/Fig5_6.png';
import fig7 from './assets/Fig7.png';
import fig8 from './assets/Fig8.png';
import fig9 from './assets/Fig9.png';
import fig10 from './assets/Fig10.png';
import fig11 from './assets/Fig11.png';

export interface Author {
  name: string;
  email?: string;
  web?: string;
  bio: string;
  photo?: string;
}

export interface SlideContent {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  figureNumber?: string;
  graphExplanation?: string;
  image?: string;
  layout: 'title' | 'content' | 'graph' | 'authors';
}

export const authors: Author[] = [

  {
    name: "T Sabri Öncü",
    web: "https://x.com/KeloglanBM",
    bio: "Economist based in Türkiye.",
    photo: sabrihoca
  },
  {
    name: "Engin Yılmaz",
    web: "https://veridelisi.substack.com/",
    bio: "Economist based in Türkiye.",
    photo: engin
  },
    {
    name: "Boran Bodur",
    email: "",
    bio: "Mechanical engineering student at İstanbul Technical University.",
    photo: boran
  },
];

export const slides: SlideContent[] = [
  {
    id: "title",
    title: "Dollar, Eurodollar, and the Myths of Petrodollar and Dedollarisation",
    subtitle: "Economic and Political Weekly, Vol. 61, Issue No. 20, 16 May, 2026",
    content: "Boran Bodur, T Sabri Öncü and Engin Yılmaz",
    layout: "title"
  },
  {
    id: "authors",
    title: "The Authors",
    content: "Our objective in this brief note is to show that there has been no such thing as the petrodollar, and that although the US dollar's dominance has been eroding, global dedollarisation has not been reached.",
    layout: "authors"
  },
  {
    id: "fig-1",
    title: "Rise of the US Dollar",
    figureNumber: "Figure 1",
    subtitle: "US Share of Global Monetary Gold Stock",
    image: fig1,
    content: "The dollar's ascent began with WWI. By 1919, the US held nearly 40% of the world's monetary gold stock, up from 23% in 1913. By WWII (1945), this reached a peak of nearly 67%.",
    graphExplanation: "Figure 1 tracks the US share of global monetary gold from 1913 to 1945. It illustrates how the US transitioned from a minor gold holder to the world's dominant monetary power, supplying goods to war-torn Europe in exchange for gold, eventually holding 2/3rds of global gold reserves.",
    layout: "graph"
  },
  {
    id: "eurodollar-intro",
    title: "Emergence of the Eurodollar Market",
    subtitle: "A shadow market outside US borders",
    content: "The market likely owes its name to the Soviet-owned Banque Commerciale pour l'Europe du Nord (BCEN) in Paris (telex: EUROBANK). To protect assets from US seizure, the Soviet bloc moved dollar holdings to European banks.",
    layout: "content"
  },
  {
    id: "fig-2",
    title: "Collapse of Bretton Woods",
    figureNumber: "Figure 2",
    subtitle: "US Gold Reserves and Foreign Official Liabilities",
    image: fig2,
    content: "Triffin's Dilemma predicted that Bretton Woods would collapse under the weight of expanding dollar claims abroad. By the late 1960s, foreign claims exceeded US gold reserves.",
    graphExplanation: "Figure 2 shows the intersection where foreign official liabilities crossed above US gold reserves in the late 1960s. This gap created the instability that led to the 'Nixon Shock' in 1971, when gold convertibility was suspended.",
    layout: "graph"
  },
  {
    id: "fig-3",
    title: "Monetary Hierarchies",
    figureNumber: "Figure 3",
    subtitle: "Evolution of the Monetary Pyramid",
    image: fig3,
    content: "The transition from Bretton Woods to the Post-Bretton Woods system moved the world from a gold-backed hierarchy to a fiat hierarchy centered on US Treasuries.",
    graphExplanation: "Figure 3 visualizes the shift: (a) Bretton Woods had Gold at the apex, then Dollars, then other currencies. (b) Post-Bretton Woods has the Dollar at the apex, backed by US Treasuries, with other currencies at the base.",
    layout: "graph"
  },
  {
    id: "petrodollar-myth",
    title: "The Petrodollar Myth",
    subtitle: "Debunking the 'Oil in Dollars' security underpin",
    content: "Oil was priced in dollars since the 1860s. The 1974 US-Saudi agreement was about *investing* surplus revenues into Treasuries, not the currency of trade itself. There never was a separate 'petrodollar system'.",
    layout: "content"
  },
  {
    id: "fig-4",
    title: "The sudden jump of 1971",
    figureNumber: "Figure 4",
    subtitle: "Foreign Holdings of US Treasury Securities",
    image: fig4,
    content: "Foreign holdings tripled in 18 months (June 1970 - Dec 1971) *before* the 1973 oil shock. This was due to central banks defending exchange rate pegs as Bretton Woods collapsed.",
    graphExplanation: "Figure 4 reveals that the massive surge in foreign treasury holdings happened *before* the petrodollar agreement, proving that the dollar's dominance is structural, not dependent on an oil-for-security deal.",
    layout: "graph"
  },
  {
    id: "fig-5-6",
    title: "Dedollarisation or Not?",
    figureNumber: "Figures 5 & 6",
    subtitle: "Composition of Official Reserves",
    image: fig5_6,
    content: "The dollar's share fell from 71% to 57% over 25 years. This modest decline (0.5% per year) reflects diversification at the margins, not a collapse. No alternative currency has emerged to displace it.",
    graphExplanation: "Figures 5 and 6 show the gradual erosion of the dollar's share in global reserves. However, the combined share of Dollar + Gold remains stable at 65-68%, indicating central banks are supplementing dollars with gold rather than replacing them.",
    layout: "graph"
  },
  {
    id: "fig-7",
    title: "Official Gold Reserves",
    figureNumber: "Figure 7",
    subtitle: "The Sanction Hedge",
    image: fig7,
    content: "Gold purchases accelerated dramatically after the US froze Russian assets in 2022. Reserves rose from 2,000 tons to over 4,300 tons by 2025.",
    graphExplanation: "Figure 7 illustrates the recent spike in gold buying by central banks. This is a 'sanction hedge'—a portfolio shift within the dollar system to protect against asset freezes, rather than a currency substitution.",
    layout: "graph"
  },
  {
    id: "fig-8",
    title: "Publicly Held Treasuries",
    figureNumber: "Figure 8",
    subtitle: "Domestic vs Foreign Shares",
    image: fig8,
    content: "While foreign official holdings declined modestly after 2022, foreign private holdings surged, reflecting continued global demand for dollar assets.",
    graphExplanation: "Figure 8 shows that while central banks (Official) have diversified slightly, private investors (Private) have increased their dollar appetite, maintaining the dollar's overall dominance in the treasury market.",
    layout: "graph"
  },
  {
    id: "fig-9",
    title: "Foreign Holdings of US Securities",
    figureNumber: "Figure 9",
    subtitle: "Treasury vs 'Other' Securities",
    image: fig9,
    content: "Treasury securities are only part of the story. Equities and corporate bonds have consistently exceeded Treasury holdings, growing from $4.3T (2002) to $35.3T (2025).",
    graphExplanation: "Figure 9 highlights that the world is more invested in the US economy (equities/bonds) than just its government debt, further cementing the dollar's role as the primary global capital market.",
    layout: "graph"
  },
  {
    id: "fig-10",
    title: "Eurodollar Resilience",
    figureNumber: "Figure 10",
    subtitle: "Eurodollar Loans and Debt Securities",
    image: fig10,
    content: "The offshore dollar market has reached $14.25 trillion—larger than the GDP of every country except the US and China. Deep offshore demand remains the dollar's ultimate anchor.",
    graphExplanation: "Figure 10 demonstrates the relentless growth of the eurodollar market. Its resilience through crises (2008, COVID, 2022 tightening) proves that global commerce cannot function without the offshore dollar liquidity system.",
    layout: "graph"
  },
  {
    id: "fig-11",
    title: "SWIFT Payments",
    figureNumber: "Figure 11",
    subtitle: "Share of International Payments",
    image: fig11,
    content: "The dollar's share of SWIFT payments rose from 29% in 2012 to over 51% in 2026, while the Euro's share halved from 44% to 21%.",
    graphExplanation: "Figure 11 shows that in the realm of actual transactions, the dollar is becoming *more* dominant relative to its closest competitor, the Euro, even as people talk about dedollarisation.",
    layout: "graph"
  },
  {
    id: "conclusion",
    title: "Conclusion",
    subtitle: "Resilience in a dollar-centered order.",
    content: "The 'petrodollar system' is a myth—oil has been dollar-priced since the start. Dedollarisation is better described as 'diversification' at the margins. The world has entered a period of sanctions-driven hedging, but the monetary order remains fundamentally dollar-centered.",
    layout: "content"
  }
];
