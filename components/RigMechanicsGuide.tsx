
import React from 'react';

const MechanicsSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
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

const KnotGuide: React.FC<{ name: string, use: string, steps: string[] }> = ({ name, use, steps }) => (
    <div className="bg-slate-700/40 p-4 rounded-lg border border-slate-600 mb-4">
        <h4 className="text-white font-bold text-lg mb-1">{name}</h4>
        <p className="text-cyan-400 text-sm mb-3">Primary Use: {use}</p>
        <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
            {steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
    </div>
);

const RigMechanicsGuide: React.FC = () => {
    return (
        <div className="text-base">
            <h1 className="text-3xl font-bold text-white mb-4">Rig Mechanics: The Science of Hooking</h1>
            <p className="mb-8 text-slate-400">Understanding *why* a rig works is more important than simply knowing *how* to tie it. Rig mechanics is the study of physics applied to the split-second interaction between a carp and your hooklink.</p>

            <MechanicsSection title="The Turning Effect (Prick & Flip)">
                <p>The core objective of almost every modern carp rig is to ensure that when a carp inhales the bait and then moves or tries to eject it, the hook flips over and pricks the bottom lip.</p>
                <SubHeading>How it works:</SubHeading>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Line Alignment:</strong> By using shrink tube, kickers, or a knotless knot, we create an angle at the eye of the hook. This acts as a lever.</li>
                    <li><strong>The Pivot Point:</strong> As the line tightens against the weight of the lead, that lever forces the hook to rotate. </li>
                    <li><strong>Point Down:</strong> A well-mechanical rig will always result in the hook point facing downwards toward the fleshy part of the mouth, regardless of how the bait was inhaled.</li>
                </ul>
                <ExpertTip>Test your rig in the palm of your hand. Drag the hooklink across your palm; the hook should flip and prick instantly. If it slides without turning, your lever is too short or the angle is wrong.</ExpertTip>
            </MechanicsSection>

            <MechanicsSection title="Hooklink Materials: Stiffness vs. Suppleness">
                <p>The material you choose for your hooklink changes how the rig behaves on the lakebed and during a pick-up.</p>
                <SubHeading>1. Supple Braid</SubHeading>
                <p>Offers maximum natural movement. The bait can be sucked in from any direction easily. However, it is prone to tangling on the cast and is easier for a carp to blow out without the hook taking hold.</p>
                <SubHeading>2. Stiff Monofilament / Fluorocarbon</SubHeading>
                <p>Excellent anti-tangle properties. Once inhaled, the stiffness makes it very difficult for the fish to eject the bait without the hook following. It "kicks" the bait away from the lead, ensuring perfect presentation every time.</p>
                <SubHeading>3. Coated Braid (The Hybrid)</SubHeading>
                <p>The most versatile material. By stripping back a small section near the hook, you get the natural movement of braid with the anti-tangle and anti-eject properties of a stiff boom.</p>
            </MechanicsSection>

            <MechanicsSection title="Bait Mounting: The Separation Principle">
                <p>The "Hair Rig" changed everything by separating the bait from the hook. This allows the hook to be bare and heavy, making it behave differently than the buoyant or balanced bait.</p>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li><strong>Hair Length:</strong> A short hair is more aggressive but easier to detect. A long hair (2-3cm) allows the bait to be mouthed more deeply before the hook is felt, but requires the fish to move further to tighten the rig.</li>
                    <li><strong>The Blowback Principle:</strong> Using a rig ring on the shank allows the bait to slide toward the eye of the hook. When a carp blows the bait out, the bait moves away, but the hook stays in place, increasing the chance of a "hang-on" hook hold.</li>
                    <li><strong>The D-Rig Loop:</strong> Creates a pivot point on the back of the shank. This gives a pop-up or wafter 360-degree movement, making it incredibly hard for a fish to eject without the hook point finding a home.</li>
                </ul>
            </MechanicsSection>

            <MechanicsSection title="Essential Knots for Reliability">
                <p>Your rig is only as strong as its weakest point: the knot. Master these four for 100% confidence.</p>
                
                <KnotGuide 
                    name="The Knotless Knot"
                    use="The standard for all hair rigs."
                    steps={[
                        "Pass the line through the back of the hook eye.",
                        "Form your hair loop to the desired length.",
                        "Wrap the line down the shank 7-8 times, trapping the hair.",
                        "Pass the tag end back through the back of the eye and pull tight."
                    ]}
                />

                <KnotGuide 
                    name="The Palomar Knot"
                    use="Attaching swivels or hooks to braid/mono. Extremely strong."
                    steps={[
                        "Double about 6 inches of line and pass the loop through the eye.",
                        "Tie a loose overhand knot with the loop and the doubled line.",
                        "Pass the hook/swivel through the loop.",
                        "Moisten and pull both the tag and mainline to tighten."
                    ]}
                />

                <KnotGuide 
                    name="The Grinner (Uni) Knot"
                    use="The best all-round knot for monofilament and fluorocarbon."
                    steps={[
                        "Pass the line through the eye and double back parallel to the mainline.",
                        "Form a loop with the tag end.",
                        "Wrap the tag end around the doubled line 5-6 times through the loop.",
                        "Moisten and slide the knot down to the eye."
                    ]}
                />

                <KnotGuide 
                    name="The Mahin Leader Knot"
                    use="Joining a thick shock leader to thinner mainline."
                    steps={[
                        "Tie an overhand knot in the thick leader but don't tighten it.",
                        "Pass the mainline through the overhand knot.",
                        "Wrap the mainline 10 times around the leader, then 10 times back over the wraps.",
                        "Pass the mainline back through the overhand knot.",
                        "Moisten and pull very slowly to seat the wraps perfectly."
                    ]}
                />
            </MechanicsSection>

            <MechanicsSection title="The Bolt Effect: Physics of the Lead">
                <p>The lead isn't just for casting; it is the "engine" that sets the hook. When a carp tightens the hooklink, the weight of the lead drives the hook point home before the fish even knows it's hooked.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Inline Leads:</strong> Offer the most immediate bolt effect as the tension goes directly to the heaviest part of the lead. Best for hard ground.</li>
                    <li><strong>Lead Clips:</strong> The lead hangs to the side. There is a tiny bit of "play" before the full weight is felt, which can sometimes be an advantage for tentative feeders.</li>
                    <li><strong>Running Leads:</strong> No bolt effect initially. Used for very wary fish where you want zero resistance on the pick-up.</li>
                </ul>
            </MechanicsSection>
        </div>
    );
};

export default RigMechanicsGuide;
