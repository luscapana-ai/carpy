
import React from 'react';
import { WavesIcon, NavigationArrowIcon, GaugeIcon, WindIcon, TacticsIcon, SproutIcon, WarningIcon } from './icons';

const GuideSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-3 border-b-2 border-slate-700 pb-2">{title}</h2>
        <div className="space-y-4 text-slate-300">
            {children}
        </div>
    </div>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-lg font-semibold text-white mt-4">{children}</h3>
);

const ExpertTip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="mt-4 bg-cyan-900/40 border-l-4 border-cyan-500 text-cyan-200 p-3 rounded-r-lg">
        <p><span className="font-bold">Expert's Edge:</span> {children}</p>
    </div>
);

const RiverGuide: React.FC = () => {
    return (
        <div className="text-base pb-10">
            <h1 className="text-3xl font-bold text-white mb-4">The Master River Carp Guide</h1>
            <p className="mb-8 text-slate-400">River carp are the ultimate specimen. They are lean, powerful, and driven by the raw dynamics of the flow. Success on the river requires mastering three variables: <span className="text-cyan-400 font-bold">Levels, Flow, and Clarity.</span></p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                    <GaugeIcon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <h4 className="font-bold text-white text-sm">Levels</h4>
                    <p className="text-[10px] text-slate-500 uppercase">Track the 'Push'</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                    <WavesIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-bold text-white text-sm">Flow</h4>
                    <p className="text-[10px] text-slate-500 uppercase">Find the 'Crease'</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                    <NavigationArrowIcon className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <h4 className="font-bold text-white text-sm">Clarity</h4>
                    <p className="text-[10px] text-slate-500 uppercase">The 'Color' Factor</p>
                </div>
            </div>

            <GuideSection title="Strategic River Locations: Finding the Fish">
                <p>On a river, location is often synonymous with underwater geography. You aren't just looking for fish; you're looking for the structural anomalies that give them a break from the flow.</p>
                
                <SubHeading>1. Weir Pools & Sills</SubHeading>
                <p>Weir pools are the most oxygenated parts of the river. In the height of summer, these are absolute magnets for carp. Look for the 'tail-end' of the pool where the turbulent water begins to settle. Carp will often sit in the first deep hole after the sill.</p>
                
                <SubHeading>2. Confluences (River Junctions)</SubHeading>
                <p>Where a smaller stream or tributary joins the main river is a natural larder. The mixing of different water temperatures and the extra food being washed in from the tributary create a high-attract zone.</p>
                
                <SubHeading>3. The Tail-End of Islands</SubHeading>
                <p>Islands split the flow. The water behind an island is almost always slower and deeper. The point where the two channels meet again at the downstream end creates a natural 'crease' and a perfect ambush point.</p>
                
                <SubHeading>4. Sharp Outside Bends</SubHeading>
                <p>The current is strongest on the outside of a bend, which carves out deep 'undercut' banks. While the water is fast, these deep cavities provide a perfect sanctuary and resting spot for big, wary carp during the day.</p>
                
                <ExpertTip>Use a drone to scan for 'dark spots' in the flow. These are usually deeper holes or depressions in the gravel where carp will group up to conserve energy while waiting for the current to deliver food.</ExpertTip>
            </GuideSection>

            <GuideSection title="Understanding River Levels (Depths)">
                <p>A river's depth is the pulse of the waterway. Mastering levels allows you to predict feeding windows days in advance.</p>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li><strong>Steady/Normal Levels:</strong> The most predictable time. Carp will be in their standard patrol routes, often along marginal shelves or near structures like bridge pilings and fallen trees.</li>
                    <li><strong>Rising Water (The Feeding Trigger):</strong> As the river rises, it flushes natural food (worms, larvae) off the banks. This is a massive trigger for carp to feed aggressively. Look for them in the slack water right against the bank.</li>
                    <li><strong>Falling Water:</strong> Once the river peaks and begins to fall, the fishing can be electric. Carp move into the margins to find relief from the heavy flow while picking off the abundance of food washed in.</li>
                </ul>
            </GuideSection>

            <GuideSection title='Flow & Currents: Reading the "Push"'>
                <p>River carp spend their lives fighting current. To conserve energy, they seek out areas where the flow is disrupted.</p>
                <SubHeading>Anatomy of the Flow</SubHeading>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>The "Crease":</strong> The visible line on the surface where fast water meets slow water. Carp sit in the slow side, letting the fast water deliver food directly to them. This is the #1 patrol route.</li>
                    <li><strong>Eddies & Slacks:</strong> Large circular currents that flow backwards or stop. These are essential resting and feeding zones, especially when the river is high or in flood.</li>
                    <li><strong>Undercut Banks:</strong> The flow carves out deep cavities under the bank. These are prime holding spots for big, wary carp during the day.</li>
                </ul>
            </GuideSection>

            <GuideSection title='Water Clarity & "The Color"'>
                <p>Clarity dictates how you present your bait. River carp rely heavily on their sense of smell in murky water.</p>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li><strong>Clear Water:</strong> Requires ultimate stealth. Use long fluorocarbon hooklinks and natural particles (hemp, snails). Night fishing is usually more productive.</li>
                    <li><strong>"Tap Water" Clarity:</strong> A slight tint. Perfect conditions. Carp feel safe enough to feed during daylight but can still locate bait visually.</li>
                    <li><strong>Colored/Chocolate Water:</strong> After heavy rain. Switch to highly flavored, pungent baits. Fishmeals, glugged boilies, and large bunches of lobworms are essential.</li>
                </ul>
            </GuideSection>

            <GuideSection title="River Rigs: Stability in the Stream">
                <p>Stability is the foundation of river presentation. If your lead is rolling, your hookpoint is blunting.</p>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li><strong>Heavy "Gripper" Leads:</strong> Use 4oz to 6oz flat-sided leads. The goal is to anchor the rig so the current doesn't drag it into snags.</li>
                    <li><strong>The Backlead Setup:</strong> Essential for pinning your mainline to the riverbed. This prevents the flow from catching your line and creating a "bow," which can pull your lead off the spot and spook fish.</li>
                    <li><strong>Short, Strong Hooklinks:</strong> Keep hooklinks short (4-6 inches) and use strong materials like 25lb coated braid to prevent tangles in the turbulent flow.</li>
                </ul>
            </GuideSection>

            <GuideSection title="Flood Tactics: Targeting the Extremes">
                <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl mb-4">
                    <div className="flex items-center gap-2 mb-2 text-red-400">
                        <WarningIcon className="w-5 h-5" />
                        <h4 className="font-bold">Safety Warning</h4>
                    </div>
                    <p className="text-xs text-slate-300 italic">Flood fishing can be dangerous. Always fish with a partner, wear a life jacket, and never fish banks that are unstable or underwater.</p>
                </div>
                <p>When the river is in flood, the carp leave the main channel. They want to be as far away from the heavy current as possible.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>The "Near Margin" Slack:</strong> Look for any indentation in the bank that creates a small area of calm water. Even a 3ft square slack can hold multiple carp.</li>
                    <li><strong>Flooded Fields:</strong> If the river has broken its banks, carp will move into the grass to feed on worms. Fishing just 2ft into a flooded field can be devastating.</li>
                    <li><strong>Single Large Bait:</strong> Use a massive, highly scented bait (like two 20mm boilies) to ensure the fish can find it in the chaos of a flood.</li>
                </ul>
            </GuideSection>
        </div>
    );
};

export default RiverGuide;
