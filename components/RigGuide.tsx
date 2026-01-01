import React from 'react';

const RigSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
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

const RigCategoryTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-xl font-bold text-slate-100 mt-6 border-l-4 border-cyan-500 pl-3">{children}</h3>
);


const KnotTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h4 className="text-md font-semibold text-slate-100 mt-4">{children}</h4>
);


const KnotSteps: React.FC<{ steps: string[] }> = ({ steps }) => (
     <div className="mt-2 bg-slate-700/50 p-4 rounded-lg border border-slate-600">
        <h4 className="font-semibold text-cyan-400 mb-2">Step-by-Step Guide:</h4>
        <ol className="list-decimal list-inside space-y-2">
            {steps.map((step, index) => (
                <li key={index}>{step}</li>
            ))}
        </ol>
    </div>
);

const RigTyingGuide: React.FC<{ title?: string, components: string[], steps: string[] }> = ({ title = "How to Tie This Rig", components, steps }) => (
     <div className="mt-4 bg-slate-700/50 p-4 rounded-lg border border-slate-600">
        <h4 className="font-semibold text-cyan-400 mb-2">{title}:</h4>
        <div className="mb-3">
            <h5 className="font-semibold text-slate-200 mb-1">Components Needed:</h5>
            <ul className="list-disc list-inside text-sm">
                {components.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
        <div>
             <h5 className="font-semibold text-slate-200 mb-1">Step-by-Step:</h5>
            <ol className="list-decimal list-inside space-y-2">
                {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    </div>
);

const RigStats: React.FC<{ useCase: string, lakebed: string, hookbait: string, bestHookbaits?: string }> = ({ useCase, lakebed, hookbait, bestHookbaits }) => (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-800/60 p-3 rounded-lg border border-slate-700 text-center text-sm">
        <div>
            <p className="font-semibold text-slate-400">Primary Use Case</p>
            <p className="text-white font-medium">{useCase}</p>
        </div>
        <div>
            <p className="font-semibold text-slate-400">Ideal Lakebed</p>
            <p className="text-white font-medium">{lakebed}</p>
        </div>
        <div>
            <p className="font-semibold text-slate-400">Hookbait Type</p>
            <p className="text-white font-medium">{hookbait}</p>
        </div>
        {bestHookbaits && (
            <div>
                <p className="font-semibold text-slate-400">Best Hookbaits</p>
                <p className="text-white font-medium">{bestHookbaits}</p>
            </div>
        )}
    </div>
);

const ExpertTip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="mt-4 bg-cyan-900/40 border-l-4 border-cyan-500 text-cyan-200 p-3 rounded-r-lg">
        <p><span className="font-bold">Expert's Edge:</span> {children}</p>
    </div>
);


const RigGuide: React.FC = () => {
    return (
        <div className="text-base">
            <h1 className="text-3xl font-bold text-white mb-4">The Ultimate Carp Rig Guide</h1>
            <p className="mb-8 text-slate-400">The rig is the most critical part of your setup—it’s what hooks the fish. Understanding how different rigs work and when to use them will dramatically increase your catch rate. This guide covers the essential components and the most effective rigs in modern carp angling.</p>

            <RigSection title="What Makes a Good Rig? The Core Mechanics">
                <p>An effective carp rig needs to do three things perfectly:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Present the bait well:</strong> It must place your hookbait where a carp can find it, without tangles.</li>
                    <li><strong>Hook the fish:</strong> It must turn and catch hold in the carp's mouth when the bait is taken. This is called the "turning effect".</li>
                    <li><strong>Set the hook:</strong> It must use the weight of the lead to drive the hook point home. This is the "bolt effect". A good rig is difficult for a carp to eject.</li>
                </ul>
            </RigSection>

            <RigSection title="Terminal Tackle: The Components">
                <p>These are the small but vital items that make up the end of your line.</p>
                <SubHeading>Leads (Weights)</SubHeading>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Lead Systems:</strong> The three most common are the 'Lead Clip' (allows the lead to be ejected in weed or on a snag), the 'Helicopter/Chod' setup (hooklink rotates around the leader, great for long casts and soft bottoms), and 'Inline' (line passes through the lead, offering maximum bolt effect on hard ground).</li>
                    <li><strong>Lead Shape:</strong> 'Distance' leads are for range; 'Gripper' leads hold on slopes; 'Pear' leads are good all-rounders.</li>
                </ul>
                <SubHeading>Hooklinks</SubHeading>
                <p>The material used to connect your hook to the swivel.</p>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Coated Braid:</strong> A soft braided inner with a removable plastic coating. Highly versatile for creating combination rigs ('combi-rigs').</li>
                    <li><strong>Fluorocarbon:</strong> A stiff, clear material that is virtually invisible in water. Its stiffness helps to push the bait away from the lead, preventing tangles.</li>
                    <li><strong>Monofilament:</strong> Often used for specific stiff rigs like the Chod Rig or Stiff Hinge Rig.</li>
                </ul>
                <SubHeading>Hooks: The Business End</SubHeading>
                <p>The hook is arguably the single most important item of your terminal tackle. It is the only point of contact with the fish. A deep understanding of different patterns, sizes, and sharpness is a massive edge. Always use the sharpest, strongest, and most reliable hooks you can afford.</p>

                <KnotTitle>Anatomy of a Hook</KnotTitle>
                <p>Understanding the parts of a hook helps you understand why different patterns are designed the way they are.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong>Point:</strong> The sharp end. Can be straight, beaked (curved in), or needle-point.</li>
                    <li><strong>Barb:</strong> The small projection behind the point that helps the hook hold in place. Barbless and micro-barbed are common. Always check fishery rules.</li>
                    <li><strong>Eye:</strong> Where you tie the hooklink. Can be straight, in-turned, or out-turned, which drastically affects how a rig performs.</li>
                    <li><strong>Shank:</strong> The main body of the hook. Can be long, short, or curved.</li>
                    <li><strong>Bend:</strong> The curved section of the hook.</li>
                    <li><strong>Gape:</strong> The distance between the hook point and the shank. A 'wide gape' offers a better chance of a secure hook hold.</li>
                </ul>

                <KnotTitle>Essential Hook Patterns & Their Uses</KnotTitle>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li>
                        <strong>Wide Gape:</strong> The ultimate all-rounder. Its large gape provides a secure hook hold, making it perfect for bottom baits and wafters. It's a highly versatile pattern that works well with rigs like the standard Hair Rig, German Rig, and KD Rig.
                    </li>
                    <li>
                        <strong>Curve Shank:</strong> Has a progressively curved shank that helps the hook to flip and turn aggressively in the carp's mouth. This makes it brilliant for rigs where you want a fast turning action, like the Ronnie/Spinner rig and Blowback rigs.
                    </li>
                    <li>
                        <strong>Chod Hook:</strong> A specialist pop-up hook. Its key feature is an 'out-turned' eye, which allows it to sit correctly on stiff materials like chod filament. It's essential for the Chod Rig and Stiff Hinge Rig.
                    </li>
                    <li>
                        <strong>Longshank Hook:</strong> Features a long, straight shank. This creates a lever effect that makes the hook turn very aggressively. It's the classic hook for the Blowback Rig. Use with caution, as the long lever can sometimes cause mouth damage if not used with care.
                    </li>
                    <li>
                        <strong>Stiff Rigger / Beaked Point:</strong> Another specialist pop-up hook, often featuring a beaked (inwardly curved) point and an out-turned eye. The beaked point is excellent for protecting the hook point in gravel and offers a very secure hold. It's a superb alternative for Chod and Stiff Hinge Rigs.
                    </li>
                </ul>
                <ExpertTip>Match your hook size to your bait size and the size of fish you expect. A size 6 is a great all-round starting point for a 15mm boilie. For a huge bait or fishing for giant carp, step up to a size 4. For delicate presentations, go down to a size 8.</ExpertTip>

                <KnotTitle>Hook Sharpening: The Ultimate Edge</KnotTitle>
                <p>While most hooks are sharp out of the packet, hand-sharpening takes them to another level. A hand-sharpened hook will prick and take hold with the absolute minimum of pressure, converting even the most tentative pick-ups into runs. It takes practice, but the rewards are huge.</p>
                
                <h5 className="font-semibold text-slate-200 mt-3 mb-1">The Essential Tools:</h5>
                <ul className="list-disc list-inside space-y-1 pl-2 mb-3">
                    <li><strong>Hook File:</strong> A high-quality, fine diamond file is essential.</li>
                    <li><strong>Jeweller's Loupe:</strong> You cannot sharpen accurately without magnification (x20 is ideal).</li>
                    <li><strong>Hook Clamp/Vice:</strong> To hold the hook steady while you work.</li>
                    <li><strong>Point Protector:</strong> Vaseline or a specialist marker pen to prevent rust.</li>
                </ul>

                <h5 className="font-semibold text-slate-200 mt-3 mb-1">Step-by-Step Sharpening Guide:</h5>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                     <li><strong>Secure the Hook:</strong> Clamp the hook firmly by the bend in your vice. Stability is key for precision.</li>
                     <li><strong>The Top Face:</strong> Hold the file flat against the top of the hook point (the back). Make 3-4 smooth, forward strokes towards the tip. You are aiming to remove the coating and create a flat plane.</li>
                     <li><strong>The Side Faces:</strong> Now file the sides. Angle the file slightly and stroke down the side of the point towards the tip. Repeat on the other side. You are effectively turning the round point into a triangle shape.</li>
                     <li><strong>The Refinement:</strong> Use your loupe to check. The point should be tapering to a needle-sharp finish. Make very gentle, light strokes to smooth off any burrs.</li>
                     <li><strong>The Thumbnail Test:</strong> Gently drag the point across your fingernail. A standard sharp hook will grip. A sticky-sharp, hand-sharpened hook will dig in instantly with zero pressure and stay there.</li>
                     <li><strong>Protect It:</strong> You have removed the protective coating, so the point will rust instantly in water. Cover the sharpened point with a dab of Vaseline or a specialist marker pen immediately.</li>
                </ol>
                <ExpertTip>Don't over-file. You only want to remove a tiny amount of metal to refine the point. Take too much off, and you weaken the hook significantly. Practice on old hooks first!</ExpertTip>
                
                <SubHeading>Swivels, Sleeves & Connectors: The Junctions</SubHeading>
                <p>These small, often overlooked components are the critical junctions of your rig. They provide connection points, create movement, prevent tangles, and enhance hooking mechanics. Using the right component for the job is essential for rig efficiency.</p>

                <KnotTitle>Swivels: The Rotation Points</KnotTitle>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li>
                        <strong>Standard Barrel Swivel (Size 8):</strong> The industry standard for lead clips. Its dimensions are specifically designed to lock securely into the internal housing of most lead clips, ensuring the lead can be ejected safely while maintaining a strong connection.
                    </li>
                    <li>
                        <strong>Ring Swivel:</strong> A barrel swivel with an extra metal ring. This ring creates an additional hinge point, allowing the hooklink much more natural movement. Essential for Combi-rigs and the base of Helicopter/Chod setups (where a size 11 is common).
                    </li>
                    <li>
                        <strong>Quick-Change (QC) Swivel:</strong> Features an open 'crook' or hook on one end. This allows you to loop a rig on and off in seconds without re-tying a knot. <em>Crucial:</em> Always cover the crook with an anti-tangle sleeve to lock the rig in place.
                    </li>
                    <li>
                        <strong>Ronnie/Spinner Swivel:</strong> A specialist QC swivel with a larger ring and a wider crook. It is designed to be attached directly to the eye of the hook for the Ronnie/Spinner rig, providing 360-degree rotation.
                    </li>
                    <li>
                        <strong>Micro Ring Swivel:</strong> Tiny swivels used on the hook shank (German Rig, Ronnie Rig) to mount a bait. They provide more movement than a simple rig ring, making it harder for fish to eject the bait.
                    </li>
                </ul>

                <KnotTitle>Sleeves & Tubing: Alignment & Protection</KnotTitle>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li>
                        <strong>Anti-Tangle Sleeve:</strong> A tapered rubber sleeve that slides over your swivel and onto the hooklink. It pushes the hooklink away from the lead during the cast, preventing tangles and ensuring the rig lands flat.
                    </li>
                    <li>
                        <strong>Shrink Tubing:</strong> A plastic tube that shrinks when heated (usually over steam). Used to create 'line aligners' or 'kickers' on the hook eye. By extending the shank at an angle, it forces the hook to flip and turn much faster when inhaled.
                    </li>
                    <li>
                        <strong>Kickers:</strong> Pre-formed rubber versions of shrink tube. They perform the same job (improving the turn of the hook) but are more convenient as they don't require steaming.
                    </li>
                    <li>
                        <strong>Tungsten Putty/Sleeves:</strong> High-density weights used to 'pin' your rig to the lakebed. Placing a blob of putty or a tungsten sleeve a few inches above the hook ensures the line lies flush and doesn't spook patrolling fish.
                    </li>
                </ul>

                <KnotTitle>Hook Connectors: Mounting the Bait</KnotTitle>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li>
                        <strong>Rig Rings:</strong> Small metal rings used on the hook shank or in a 'D' loop. The bait is tied to the ring with floss. This allows the bait to slide or pivot independently of the hook, increasing its 'anti-eject' properties.
                    </li>
                    <li>
                        <strong>Bait Screws:</strong> Small plastic or metal screws that thread into the bait. The fastest way to mount pop-ups and wafters. Often used with a hook bead to position them on the shank.
                    </li>
                    <li>
                        <strong>Hook Beads:</strong> Small, grippy rubber beads that slide onto the hook shank. They are used to 'stop' or position other components like bait screws or rig rings at a specific point on the bend.
                    </li>
                    <li>
                        <strong>Silicone Tubing:</strong> Fine-bore tubing used to trap a hair against the hook shank or create a blowback effect.
                    </li>
                </ul>

                <KnotTitle>How to Use These Components Effectively</KnotTitle>
                <div className="mt-4 bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                    <h5 className="font-semibold text-cyan-400 mb-2">Technique Tips:</h5>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li><strong>Steaming Shrink Tube:</strong> Use a kettle. Hold the rig with pliers and steam the tube until it shrinks. While it's still warm and pliable, use your fingers to set the desired 'kicker' angle. Hold it until it cools to set the shape.</li>
                        <li><strong>Using QC Swivels:</strong> Slide an anti-tangle sleeve onto your hooklink <em>first</em>. Hook the loop of your rig onto the QC swivel. Slide the sleeve back down to cover the connection fully. If the sleeve is loose, add a small piece of silicone tube to the swivel first.</li>
                        <li><strong>Positioning Hook Beads:</strong> Moisten the hook shank with saliva before sliding the bead on. This prevents the rubber from tearing. For most rigs (German, Ronnie), position the bead so the bait sits just at the start of the hook bend.</li>
                        <li><strong>Bait Floss Attachment:</strong> When using rig rings, use the 'blob' method. Pass floss through the ring, tie a simple overhand knot around the bait, then use a lighter to melt the ends into a small 'blob' to secure it.</li>
                    </ul>
                </div>
                <ExpertTip>When choosing sleeves and swivels, try to match the color to the lakebed. Most manufacturers offer 'Gravel', 'Weed', and 'Silt' variations. This small detail can make your rig virtually invisible to cautious carp.</ExpertTip>
            </RigSection>

            <RigSection title="The Essential Rigs">
                <p>Master these rigs, and you'll be prepared for almost any carp fishing situation.</p>
                
                <RigCategoryTitle>Bottom Bait & Wafter Rigs</RigCategoryTitle>

                <SubHeading>The Hair Rig</SubHeading>
                <p>The foundation of all modern carp rigs. Its genius lies in separating the bait from the hook. This allows the hook to be fully exposed and behave more naturally, dramatically improving its hooking potential. When a carp sucks in the bait and tries to eject the hook, the bare hook is free to catch hold in the mouth.</p>
                <RigStats useCase="All-purpose bottom bait presentation" lakebed="Firm ground (Gravel, Clay)" hookbait="Bottom Baits, Wafters" bestHookbaits="Boilies, Tiger Nuts, Maize" />
                <ExpertTip>The length of the hair is critical. Start with about 1cm of separation between the hook and the bait. For very wary fish, try a longer hair of 2-3cm.</ExpertTip>
                <RigTyingGuide 
                    components={["Coated Braid", "Size 6-8 Hook (e.g., Wide Gape)", "Baiting Needle & Boilie Stop"]}
                    steps={[
                        "Cut a 10-inch length of coated braid.",
                        "Strip back about 2 inches of the coating using a stripping tool.",
                        "Tie a small loop in the end of the soft, stripped section for your bait stop.",
                        "Mount your hookbait onto the hair.",
                        "Pass the other end of the hooklink through the BACK of the hook's eye.",
                        "Position the bait so it hangs 1-2cm below the hook's bend.",
                        "Tie a standard Knotless Knot with 7-10 wraps down the shank (trapping the hair).",
                        "Pass the hooklink back through the BACK of the hook's eye. This is crucial for the hook to turn correctly.",
                        "Tie a Figure-of-Eight loop knot at the other end to attach to a swivel."
                    ]}
                />

                <SubHeading>The Balanced Bait Rig (Wafter Rig)</SubHeading>
                <p>This isn't a specific rig pattern, but a principle of bait presentation that is incredibly effective. The goal is to create a hookbait that is 'critically balanced' or 'wafts'. It sinks slowly under the weight of the hook and line, behaving like a natural, safe food item. When a carp mouths the bait, it flies into the back of the mouth with minimal effort, leading to fantastic hook holds.</p>
                <RigStats useCase="Fooling wary, light-feeding fish" lakebed="Any (especially over light debris)" hookbait="Wafters, custom-balanced boilies" bestHookbaits="Wafters, Snowman Rigs" />
                 <RigTyingGuide
                    title="How to Set Up a Balanced Rig"
                    components={["Wafter Hookbait", "Sinking Boilie & Cork Stick", "Bottom Bait & Plastic Corn"]}
                    steps={[
                        "The simplest way: Use a ready-made wafter hookbait straight from the pot with a standard hair rig.",
                        "Test it in the margins: The wafter should sink slowly, with the hook lying flat on the bottom.",
                        "DIY method: Drill out a small cavity in a sinking boilie using a bait drill.",
                        "Plug the cavity with a piece of cork or buoyant foam until it sinks slowly.",
                        "Tip it off: Alternatively, add a small, buoyant piece of artificial corn to a standard bottom bait on the hair. This will counterbalance the weight of the hook."
                    ]}
                />

                <SubHeading>The KD Rig</SubHeading>
                <p>A brilliantly subtle yet highly aggressive presentation, named after its creator, Kenny Dorsett. The KD rig is designed to maximize the hook's ability to turn and prick a fish. The unique hair exit point creates an unbalanced pivot, forcing the hook to flip aggressively the moment a carp tightens to the lead.</p>
                <RigStats useCase="Subtle presentation for pressured fish" lakebed="Clean, firm bottoms" hookbait="Wafters, critically-balanced baits" bestHookbaits="Wafters, Plastic Corn, Tiger Nuts" />
                <ExpertTip>This rig is at its best with a curved shank hook, as the shape complements the aggressive flipping action created by the hair placement.</ExpertTip>
                <RigTyingGuide 
                    components={["Soft Coated Braid or Supple Braid", "Curve Shank Hook (Size 6-8)", "Split Shot or Putty"]}
                    steps={[
                        "Take a 10-inch length of supple braid.",
                        "Pass it through the back of the hook's eye and wrap it down the shank just ONCE (this is key).",
                        "Bring the line back up and pass it through the back of the eye again, creating the hair.",
                        "Mount your wafter onto the hair.",
                        "Now, continue wrapping the mainline down the shank 5-7 more times, but this time, DO NOT trap the hair. The hair should exit separately after the first wrap.",
                        "Pass the mainline back through the back of the hook's eye and pull tight.",
                        "Add a small split shot or a piece of tungsten putty on the hair just below the bait to balance it perfectly."
                    ]}
                />

                <SubHeading>The Combi Rig</SubHeading>
                <p>A highly effective and versatile rig, the Combi Rig is constructed from two different hooklink materials. This 'combination' of a stiff boom section and a flexible, curved hook section. This gives you the best of both worlds: excellent anti-tangle properties and natural bait movement.</p>
                <RigStats useCase="Anti-tangle bottom bait presentation" lakebed="Most bottoms, including light gravel" hookbait="Bottom baits, Wafters" bestHookbaits="Boilies, Wafters, Large Particles" />
                <ExpertTip>The length of the supple section is key. Start with around an inch for most situations. In silt, you can try extending it to two inches for better presentation.</ExpertTip>
                <RigTyingGuide 
                    components={["Stiff material (e.g., Fluorocarbon)", "Soft Braid", "Size 6-8 Hook", "Size 8 Swivel"]}
                    steps={[
                        "Tie your hook to a 3-inch section of soft braid using a Knotless Knot.",
                        "Take a 7-inch section of your stiff fluorocarbon boom material.",
                        "Join the soft braid section to the stiff boom section using an Albright Knot or a small back-to-back Grinner Knot.",
                        "Ensure the knot is neat and the supple section is about 1-2 inches long.",
                        "Tie the other end of the stiff boom to a size 8 swivel using a Grinner Knot or Palomar Knot."
                    ]}
                />

                <SubHeading>The German Rig</SubHeading>
                <p>A simple yet devastatingly effective presentation. It's a low-profile rig tied with a semi-stiff hooklink, with the hookbait mounted directly on the shank via a swivel or screw. Its aggressive angle and freedom of movement lead to fantastic hook holds, especially with wafters.</p>
                <RigStats useCase="Aggressive hooking with wafters" lakebed="Firm to medium-soft bottoms" hookbait="Wafters, balanced baits" bestHookbaits="Wafters, Double Plastic Corn" />
                <ExpertTip>For extra attraction, slide a small PVA mesh bag of crushed boilies and micro pellets down your hooklink before casting.</ExpertTip>
                 <RigTyingGuide 
                    components={["Semi-stiff Coated Braid or Fluorocarbon", "Curve Shank Hook", "Micro Ring Swivel or Bait Screw", "Hook Bead"]}
                    steps={[
                        "Take a 10-inch length of your hooklink material.",
                        "Slide a micro ring swivel or bait screw onto the hooklink.",
                        "Tie the hook on using a Palomar Knot or a 5-turn Grinner Knot.",
                        "Slide the ring swivel/bait screw down so it sits at the start of the hook's bend.",
                        "Secure it in place by sliding a hook bead over the hook point and onto the shank, trapping the swivel.",
                        "Attach your wafter to the bait screw or tie it to the ring swivel with bait floss.",
                        "Tie a loop at the other end to attach to a quick-change swivel."
                    ]}
                />

                <SubHeading>The D-Rig</SubHeading>
                <p>A legendary rig known for its excellent anti-eject properties. It gets its name from the small 'D'-shaped loop of stiff material on the back of the hook shank. The bait is mounted on a ring that moves freely on this 'D'.</p>
                <RigStats useCase="Superb anti-eject properties" lakebed="Clean, firm bottoms" hookbait="Wafters, Hard bottom baits" bestHookbaits="Hardened Boilies, Wafters" />
                <RigTyingGuide 
                    components={["Stiff Fluorocarbon or Monofilament", "Wide Gape Hook", "Rig Ring", "Lighter"]}
                    steps={[
                        "Take a 10-inch length of fluorocarbon.",
                        "Pass it through the front of the hook's eye and tie a Knotless Knot (3-4 turns is enough).",
                        "Instead of passing the tag end back through the eye, pass it through the front of the eye to form a loop ('the D').",
                        "Slide a rig ring onto the loop.",
                        "Pass the tag end back through the hook eye from the front.",
                        "Hold the 'D' at the desired size, and use a lighter to carefully blob the tag end against the hook eye to secure it.",
                        "Tie your hookbait to the rig ring using bait floss."
                    ]}
                />

                <SubHeading>The Blowback Rig</SubHeading>
                <p>Another classic anti-eject rig. The 'blowback' feature is a small rig ring that is free to slide up and down the hook shank. When a carp tries to spit the hook, the bait can slide away, leaving the hook point bare and heavy.</p>
                <RigStats useCase="Outwitting carp that eject rigs" lakebed="Most bottoms" hookbait="Bottom baits, Wafters, Snowman" bestHookbaits="Snowman Rigs, Bottom Boilies" />
                <ExpertTip>Pair this rig with a line-aligner or a piece of shrink tube on the hook eye to enhance its turning speed even further.</ExpertTip>
                <RigTyingGuide 
                    components={["Coated Braid", "Curve Shank Hook", "Rig Ring", "Hook Bead or Silicone"]}
                    steps={[
                        "Take a 10-inch length of coated braid and strip about 3 inches of coating.",
                        "Tie a small hair loop in the supple section.",
                        "Slide a rig ring onto the supple section.",
                        "Tie a Knotless Knot, but position the rig ring on the shank where you want the hair to exit.",
                        "The hair should pass through the ring, with the ring itself free to move on the hook shank.",
                        "You can trap the ring's movement with a small piece of silicone or a hook bead just before the hook bend.",
                        "Mount your bait onto the hair loop as normal."
                    ]}
                />

                <RigCategoryTitle>Pop-Up Rigs</RigCategoryTitle>
                <p>
                    Pop-up rigs are designed to present a buoyant hookbait that floats a set distance off the lakebed. This guarantees your hookbait is visible and not hidden by low-lying weed, silt, or debris.
                </p>

                <SubHeading>The Ronnie / Spinner Rig</SubHeading>
                <p>An incredibly popular and aggressive pop-up rig. The hook is mounted on a special swivel that allows it to spin 360 degrees. Easy to tie, rarely tangles, and highly effective.</p>
                <RigStats useCase="Low-lying pop-up presentation" lakebed="Most bottoms, ideal for light debris" hookbait="Pop-ups" bestHookbaits="Pop-ups (12mm-15mm)" />
                <ExpertTip>This rig allows you to change the hook in seconds. If your hook point feels even slightly dull after a catch, swap it for a new one instantly.</ExpertTip>
                <RigTyingGuide 
                    components={["Stiff Boom Material (e.g., Fluorocarbon)", "Curve Shank Hook", "Ronnie/Spinner Swivel", "Hook Bead", "Bait Screw or Micro Ring Swivel", "Shrink Tubing"]}
                    steps={[
                        "Take your stiff boom material and tie a small loop at one end.",
                        "Slide a piece of shrink tubing onto the boom material.",
                        "Take a Ronnie/Spinner swivel and hook the looped end of the boom onto the swivel's crook.",
                        "Slide the shrink tubing over the connection and steam it to secure it.",
                        "Take your hook and slide a bait screw or micro ring swivel onto the shank.",
                        "Secure it in place with a hook bead, leaving it enough room to move freely.",
                        "Hook the hook's eye onto the open crook of the Ronnie/Spinner swivel.",
                        "Close the crook with another piece of shrink tubing and steam it carefully. Your hook can now rotate freely."
                    ]}
                />

                <SubHeading>The Multi Rig</SubHeading>
                <p>A highly versatile and popular rig for presenting pop-ups and wafters. Its genius lies in the ability to change the hook in seconds without having to tie a new rig.</p>
                <RigStats useCase="Fast hook changes, versatile pop-up rig" lakebed="Most bottoms" hookbait="Pop-ups, Wafters" bestHookbaits="Pop-ups, Wafters" />
                 <RigTyingGuide 
                    components={["Coated Braid", "Wide Gape or Chod Hook", "Rig Ring", "Tungsten Putty"]}
                    steps={[
                        "Take a 10-inch length of coated braid. DO NOT STRIP IT.",
                        "Tie a large loop (about 1.5 inches long) using a Figure-of-Eight loop knot.",
                        "Take your hook and pass the point through the loop from the inside.",
                        "Slide a rig ring onto the loop.",
                        "Pass the loop over the hook point and settle it onto the hook's eye. You should have a 'D' shape.",
                        "Attach your pop-up to the rig ring with bait floss.",
                        "Add a small amount of tungsten putty to the coated braid near the hook to counterbalance the pop-up."
                    ]}
                />

                <SubHeading>The Chod Rig</SubHeading>
                <p>A short, stiff pop-up rig fished on a 'helicopter' lead system. The rig is free to slide up the leader, allowing it to settle perfectly on top of any debris like low-lying weed or silt.</p>
                <RigStats useCase="Fishing over weed, silt & debris" lakebed="Silt, Low Weed, Detritus" hookbait="Highly buoyant Pop-ups" bestHookbaits="High Buoyancy Pop-ups (Corkball)" />
                <ExpertTip>Always steam a pronounced curve into your chod filament. This helps the hook to turn and grab hold aggressively in the carp's mouth.</ExpertTip>
                <RigTyingGuide 
                    components={["Stiff Monofilament (e.g., Chod Filament)", "Chod Hook", "Size 11 Ring Swivel", "Lighter"]}
                    steps={[
                        "Cut a 4-inch section of chod filament.",
                        "Tie a chod hook on using a Knotless Knot (3-4 wraps is enough). Keep the tag end long.",
                        "Pass the tag end through the back of the hook's eye to create a 'D' shape.",
                        "Thread a ring swivel onto the 'D'.",
                        "Pass the tag end back through the hook eye and carefully blob it with a lighter to secure.",
                        "Steam the rig over a kettle to create the perfect aggressive curve.",
                        "Tie the other end to your helicopter leader."
                    ]}
                />
                
                <SubHeading>The Stiff Hinge Rig</SubHeading>
                <p>Considered by many to be the ultimate pop-up presentation. It's a combination of a stiff boom section and a flexible, curved hook section. This 'hinge' allows the pop-up to behave naturally.</p>
                <RigStats useCase="High-attract pop-ups for big, wary fish" lakebed="Most bottoms, including low weed" hookbait="Highly buoyant Pop-ups" bestHookbaits="Corkball Pop-ups, 16mm Pop-ups" />
                <RigTyingGuide 
                    components={["Stiff Boom Material", "Chod Filament", "Chod Hook", "Size 11 Ring Swivel", "Loop Swivel"]}
                    steps={[
                        "First, tie a short Chod Rig section as described above, but instead of a standard ring swivel, use a larger loop swivel.",
                        "Take your stiff boom material (e.g., 25lb fluorocarbon).",
                        "Tie the boom section to the large loop of the chod section's swivel using a 3-turn blood knot. This creates the 'hinge'.",
                        "The boom should be 5-7 inches long.",
                        "Tie a Figure-of-Eight loop knot at the other end of the boom to attach to your lead system."
                    ]}
                />

                <SubHeading>The 90 Degree Rig</SubHeading>
                <p>A highly aggressive pop-up rig where the hook sits at a perfect 90-degree angle to a stiff boom section. This ensures the hook point is always facing downwards.</p>
                <RigStats useCase="Aggressive pop-up rig for clean areas" lakebed="Clean, hard bottoms" hookbait="Pop-ups" bestHookbaits="Pop-ups" />
                <RigTyingGuide 
                    components={["Stiff Boom Material", "Hook with an in-turned eye", "Bait Screw or Swivel", "Shrink Tubing", "Lighter"]}
                    steps={[
                        "Take your stiff boom material and form a loop at one end using a Figure-of-Eight knot.",
                        "Pass this loop through the front of the hook's eye.",
                        "Loop it over the hook point and pull down tight against the eye.",
                        "Slide a small piece of shrink tubing over the hook eye and the boom material.",
                        "Carefully steam the shrink tube to lock the angle in place.",
                        "Mount a bait screw or micro ring swivel onto the hook shank before steaming."
                    ]}
                />

                <SubHeading>The Withy Pool Rig</SubHeading>
                <p>A classic aggressive pop-up presentation famous for its long, curved section of shrink tubing. This curve forces the hook to flip and grab hold in the carp's bottom lip instantly.</p>
                <RigStats useCase="Super-aggressive pop-up hooking" lakebed="Clean to lightly debris-strewn" hookbait="Pop-ups" bestHookbaits="Pop-ups" />
                <RigTyingGuide 
                    components={["Coated Braid or Supple Braid", "Curve Shank Hook", "Large piece of Shrink Tubing", "Putty", "Bait Floss"]}
                    steps={[
                        "Take a 10-inch length of braid and tie on your hook using a Knotless Knot, leaving a short hair.",
                        "Take a long (1-1.5 inch) piece of shrink tubing and slide it down the hooklink and over the hook's eye.",
                        "Steam the shrink tube over a kettle to form a smooth, aggressive curve away from the hook point.",
                        "Attach your pop-up to the hair loop using bait floss.",
                        "Add a small amount of tungsten putty to the braid just below the shrink tube."
                    ]}
                />

                <RigCategoryTitle>Specialist Rigs</RigCategoryTitle>

                <SubHeading>The Zig Rig</SubHeading>
                <p>Used to catch carp cruising in the mid to upper layers of the water. It involves presenting a small, buoyant hookbait on a very long hooklink.</p>
                <RigStats useCase="Intercepting cruising carp mid-water" lakebed="Any (targets upper water layers)" hookbait="Zig Foam, Small Pop-ups" bestHookbaits="Zig Foam (Black, Yellow), Small Cork Balls" />
                <RigTyingGuide 
                    components={["Low-diameter Monofilament (e.g., Zig Line)", "Small, sharp Wide Gape Hook", "Zig Aligna Sleeve", "Zig Foam"]}
                    steps={[
                        "Cut your desired length of zig line (anything from 2ft to 12ft).",
                        "Tie your hook on using a Grinner or Palomar knot.",
                        "Slide a Zig Aligna sleeve down the line and over the hook's eye.",
                        "Cut a small piece of zig foam and insert it into the loop on the back of the Zig Aligna sleeve.",
                        "Tie a Figure-of-Eight loop knot at the other end."
                    ]}
                />

                <SubHeading>Stalking Rigs</SubHeading>
                <p>Stalking is about travelling light and hunting for fish in the margins. Rigs need to be simple, strong, and subtle.</p>
                <RigStats useCase="Close-quarters margin fishing" lakebed="Margins, undergrowth, near snags" hookbait="Bread, Corn, Worms" bestHookbaits="Bread Crust, Worms, Prawns" />
                 <RigTyingGuide 
                    title="Essential Stalking Setups"
                    components={["Strong mainline (15lb+)", "Strong hook (Size 6-8)", "Split Shot or Small Lead"]}
                    steps={[
                        "Freeline Rig: Tie a hook directly to your mainline. Ultimate stealth.",
                        "Split Shot Rig: For when you need a little weight. Pinch split shot 6 inches from the hook.",
                        "Small Inline Lead Rig: Use a 1oz inline lead for a subtle bolt effect. Keep the hooklink short (3-4 inches)."
                    ]}
                />

                <SubHeading>Silt Fishing Rigs</SubHeading>
                <p>The challenge is presenting a bait without it getting buried in the soft bottom.</p>
                <RigStats useCase="Presenting baits on soft, silty bottoms" lakebed="Silt, 'Chod'" hookbait="Pop-ups, Wafters" bestHookbaits="High Buoyancy Pop-ups, Wafters" />
                <RigTyingGuide 
                    title="Safe & Effective Silt Setups"
                    components={["Leadcore or Lead-free Leader", "Helicopter setup components", "Chod Rig or Ronnie Rig"]}
                    steps={[
                        "The Helicopter Rig is king in silt. Set it up so the rig can slide up the leader.",
                        "Move the top bead further up (1-3ft) from the lead.",
                        "Use a buoyant hookbait like a pop-up on a Chod Rig or Ronnie Rig."
                    ]}
                />
                
                <SubHeading>Gravel Fishing Rigs</SubHeading>
                <p>Hard-bottomed areas are prime feeding spots. The challenge is protecting your hook point on impact.</p>
                <RigStats useCase="Presenting baits on hard, clean bottoms" lakebed="Clean Gravel, Sand, Clay" hookbait="Bottom baits, Wafters" bestHookbaits="Wafters, Hard Bottom Baits" />
                <RigTyingGuide 
                    title="Effective Gravel Setups"
                    components={["Inline Lead", "Fluorocarbon or Coated Braid", "PVA Foam"]}
                    steps={[
                        "The Inline Lead: Provides the most direct and efficient bolt effect on hard ground.",
                        "Abrasion-Resistant Hooklinks: A Combi Rig or Fluorocarbon boom is perfect.",
                        "Protect the Hook Point: Use a nugget of dissolving PVA foam over your hook point."
                    ]}
                />

                <SubHeading>Weed Fishing Rigs</SubHeading>
                <p>Carp love weed for safety. The key is fish safety—your setup MUST allow the lead to be ejected easily.</p>
                <RigStats useCase="Safely presenting in/around weed" lakebed="Weed beds" hookbait="Pop-ups, PVA bags" bestHookbaits="Pop-ups, Small PVA Bag of Pellets" />
                <RigTyingGuide 
                    title="Safe & Effective Weed Setups"
                    components={["Strong mainline & leader", "Lead Clip System", "Chod Rig or Solid PVA Bag"]}
                    steps={[
                        "Lead Clip System: Don't push the tail rubber on fully. Ensure the lead drops on the take.",
                        "Chod Rig on a Leader: Excellent for low-lying weed.",
                        "Solid PVA Bag: The ultimate weed-beater. Everything is contained within the bag."
                    ]}
                />

                <SubHeading>Snag Fishing Rigs</SubHeading>
                <p>This is for experienced anglers only. Fish safety is paramount. Setup MUST drop the lead instantly.</p>
                <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md">
                    <p className="font-bold">⚠️ WARNING: Never, ever attempt this unless you are 100% confident in your gear. Never leave your rods.</p>
                </div>
                <RigStats useCase="Extracting carp from near snags" lakebed="Near fallen trees, roots, etc." hookbait="High-attract single hookbaits" bestHookbaits="Hardened Hookbaits, Wafters" />
                <RigTyingGuide 
                    title="Safe Snag Fishing Setup"
                    components={["Strong Abrasion-Resistant Mainline (20lb+)", "Strong Hook (Size 4-6)", "Lead Clip System"]}
                    steps={[
                        "Use a Lead Clip system with the tail rubber barely pushed on.",
                        "Use a short, strong hooklink (e.g., 25lb coated braid).",
                        "Fish 'locked up'—clutch screwed down tight and sit next to your rods."
                    ]}
                />

                <SubHeading>Surface Fishing Rigs</SubHeading>
                <p>The most exciting way to fish. The key is stealth and confidence.</p>
                <RigStats useCase="Catching carp off the top" lakebed="Surface" hookbait="Dog Biscuits (Mixers), Bread, Cork" bestHookbaits="Trimmed Pop-ups, Mixers, Bread Crust" />
                <RigTyingGuide 
                    title="Effective Surface Setups"
                    components={["Floating Mainline", "Controller Float", "Small Hook (Size 10-8)"]}
                    steps={[
                        "Controller Float Setup: Standard setup with a 2-4ft hooklink of low-diameter line.",
                        "Freeling: Simply tie a hook to your floating mainline for ultimate stealth."
                    ]}
                />
            </RigSection>

             <RigSection title="Essential Knots">
                <p>Master these for a reliable connection in every situation.</p>

                <RigCategoryTitle>Attaching Terminal Tackle</RigCategoryTitle>
                <KnotTitle>The Palomar Knot</KnotTitle>
                <p>Strong and simple, perfect for braid and monofilament.</p>
                <KnotSteps steps={[
                    "Double over 6 inches of line to form a loop.",
                    "Pass the loop through the eye of the hook or swivel.",
                    "Tie a simple overhand knot with the loop.",
                    "Pass the hook or swivel through the loop.",
                    "Moisten and pull tight."
                ]}/>

                <KnotTitle>The Grinner Knot (Uni Knot)</KnotTitle>
                <p>Highly versatile and reliable for all line types.</p>
                <KnotSteps steps={[
                    "Pass the line through the eye and run it parallel to the mainline.",
                    "Form a loop with the tag end.",
                    "Wrap the tag end around the doubled line 5-8 times through the loop.",
                    "Moisten and slide the knot down to the eye."
                ]}/>

                <RigCategoryTitle>Creating Loops & Hairs</RigCategoryTitle>
                <KnotTitle>The Knotless Knot</KnotTitle>
                <p>The knot for the hair rig. Simple to tie and exceptionally strong.</p>
                <KnotSteps steps={[
                    "Pass the line through the BACK of the hook's eye.",
                    "Create your hair loop to the desired length.",
                    "Wrap the mainline down the shank 7-10 times, trapping the hair.",
                    "Pass the mainline back through the BACK of the eye."
                ]}/>

                <KnotTitle>The Figure-of-Eight Loop Knot</KnotTitle>
                <p>The best knot for creating a strong, reliable loop at the end of your hooklink.</p>
                 <KnotSteps steps={[
                    "Double over the end of your line to create a loop.",
                    "Twist the loop one full turn (360 degrees).",
                    "Take the end of the loop and pass it through the twist.",
                    "Moisten and pull tight."
                ]}/>
            </RigSection>

             <RigSection title="Rig Safety First: A Final Checklist">
                <p>Good angling is safe angling. The welfare of the fish is always the number one priority.</p>
                <ul className="list-disc list-inside space-y-3 pl-2">
                    <li><strong>Always Use a Safe Lead System:</strong> Lead MUST be able to eject if your mainline breaks.</li>
                    <li><strong>Check Your Hook Points:</strong> A blunt hook causes more damage. If in doubt, change it.</li>
                    <li><strong>Balance Your Tackle:</strong> Don't fish for big carp near snags with light line.</li>
                    <li><strong>Fish Care is Crucial:</strong> Always use a wet unhooking mat and keep the fish wet.</li>
                    <li><strong>Never Leave Your Rods Unattended:</strong> Always be in control of your rods.</li>
                </ul>
            </RigSection>
        </div>
    );
};

export default RigGuide;