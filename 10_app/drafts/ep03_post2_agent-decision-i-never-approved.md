---
title: "My Agent Made a Smart Call I Never Approved"
subtitle: "A five-hour rate limit burned in an hour, and the real lesson about delegating decisions you can't verify."
status: draft - unreviewed
target_word_count: 1700
series: "Managing Agents, Part 2 of 2 (continues from Post 1, 'Fluency vs. Substance')"
excerpt_chapter: "Episode 3 excerpt, Chapter 2, 38:13–44:22"
pull_quotes:
  - "Two more things, like at the very end of every bit of work, it would say, and two more things."
  - "I was running through my five hour window in like an hour."
  - "It's not micromanaging if you do it one time to coach. It's micromanaging if you... override when it's perfectly good already."
---

Jeremy's agent made a decision on its own a few weeks back. Building out a spec file mid-project, it wrote in its own rule, right there in the document that was supposed to describe what to build next: don't spawn a new subagent, reuse the existing one, so you can reuse the context it already has. Nobody asked it to add that line. "Don't, don't use new subagents, reuse the existing subagent so you can reuse the context that it already had," is how Jeremy described finding it. <!-- Jeremy 40:26.882 --> On paper, that's good engineering. Don't reload what should already be cached. In practice, it meant reloading something like seven hundred thousand tokens of context, repeatedly, every time the agent needed to do something as small as diff over a single file.

Jeremy didn't catch it right away. He just noticed he was burning through usage faster than made sense. "I was running through, I was building two projects at the same time, and I was just running through my five hour window in like an hour," he told me. <!-- Jeremy 41:15.095 --> He runs two separate subscriptions, one per business, and both were hitting the same wall at the same time. The pattern, once he found it, was almost funny: five hours of allowance gone in about one, then a forced four-hour wait, then the exact same heavy payload reloaded again the moment the clock reset, across five or six subagents all doing roughly the same thing. <!-- Jeremy 41:39.567 -->

Here's the part I want to pull apart, because the token number isn't actually the interesting half of this story. The interesting half is what the agent's decision reveals about a problem a lot wider than one spec file.

**Locally smart, globally expensive**

Reusing a cached subagent instead of spawning a fresh one is, in isolation, a reasonable move. The idea itself wasn't the problem. Nobody checked whether the premise behind it, that the context was actually still cached, held up a day later. "If you do it like literally the next day after the cache is reset, maybe now you're sort of exposed," I said when Jeremy described it to me. <!-- Turner 40:52.839 --> That's exactly what happened. The agent's shortcut was only clever under conditions that had already stopped being true, and nothing in the system was positioned to notice.

That's the general shape of the problem, and it shows up well beyond token budgets. An agent, or honestly a person, can make a call that's completely sound from where they're standing and still be wrong once you zoom out to the whole system. Locally smart. Globally expensive. You don't fix this by cutting the agent's autonomy. You fix it by making sure someone, or something, is positioned to catch a decision like that before the bill arrives instead of after.

Jeremy connected it to a precedent worth knowing about if you don't already: Gastown, a software factory that got shut down because it only ever worked inside its own narrow ecosystem, and started breaking the moment a newer model version shipped. "They actually shut down Gastown because it was only successful working on its own ecosystem," Jeremy said. <!-- Jeremy 38:35.620 --> Part of what broke it was a quirk some newer models developed, where they'd compulsively tack "and two more things" onto the end of every finished task, generating extra work nobody asked for. "Two more things, like at the very end of every bit of work, it would say, and two more things," Jeremy explained. <!-- Jeremy 39:5.333 --> My reaction at the time was pretty blunt: "That's a loose cannon. Play ad libs with more work to charge us tokens for. That's kind of ridiculous." <!-- Turner 39:20.751 --> Jeremy's own read on it was just as unimpressed: "We can't keep that ball going." <!-- Jeremy 39:29.715 -->

The caching mechanics underneath all of this keep shifting on their own, which is part of why nobody caught the subagent rule before it did damage. Jeremy mentioned, almost as an aside, that his sessions have started auto-compacting on their own if a terminal sits idle for close to an hour, specifically to save cached tokens. "I don't know what the trigger currently is, I need to research it," he admitted, "but I've seen it where it will auto-compact if you've been idle just under an hour." <!-- Jeremy 42:3.905 --> That's not a criticism of the behavior itself. It's the same lesson wearing a smaller hat: the rules governing what gets cached, reused, or reloaded are not fixed, they're decided somewhere upstream of you, and they change without an announcement. An agent deciding on its own how to handle that shifting ground is exactly the kind of decision that needs a second set of eyes, not fewer of them.

**You can't delegate what you can't verify**

This is the real thesis, and it's the second half of a question Jeremy and I have been circling for a while: when does a repeated instruction graduate from something you say once to a formal rule you write down, and when does writing it down actually matter?

Jeremy's instinct lately has been toward role-scoped system prompts, giving an agent a specific persona, architect or builder, with its own constraints, instead of starting every session from one generic baseline. "Rather than just starting out with a generic Claude, dangerously skip permissions, now I can say, hey, start out with this architect archetype or persona," he told me. <!-- Jeremy 39:41.649 --> That's a real improvement, and it would have caught the subagent-reuse rule before it ever got written into a spec file unsupervised, because an architect persona built around auditable decisions doesn't get to quietly invent its own caching policy.

My instinct runs a little differently, and I think the two views actually fit together rather than compete. I don't formalize most things into skill files. When I notice a pattern I want fixed, I just tell the agent, remember this, and let it figure out on its own whether that belongs as a rule in a project file or something more durable. I don't even love the word "trained" for what that process actually is, because most of the time it isn't some elaborate setup, it's just telling the thing once and trusting it to carry the instruction forward correctly. The place I draw the line isn't frequency. It's whether I can still tell, a week later, whether the rule I set is still true. "It's not micromanaging if you do it one time to coach," I said about this exact question. "It's micromanaging if you... override when it's perfectly good already." <!-- Turner 43:37.413 --> Quality control isn't micromanagement either, which is worth saying plainly, because the two get confused constantly. Checking an agent's work against a standard you already set is just QA. Rewriting the standard every time you look at it is something else entirely, and it's that second thing that erodes an agent's ability to ever get ahead of you.

Put those two instincts together and you get something like an actual rule here: coach once, specifically, to set a boundary. Then build in a way to notice when the world underneath that boundary has changed. The subagent-reuse decision failed both tests at once. Nobody coached it in on purpose, and nothing was watching for the moment its premise stopped being true.

So, practically, here's what this changes about how I'd set up anything that's allowed to make its own calls:

- Treat any decision an agent makes about its own efficiency as a hypothesis, not a fact, until something checks it against reality at least once.
- Name your precedents. Gastown and the token bug are the same failure mode wearing different clothes: a decision that worked in a narrow lane broke the moment it left that lane.
- Use role-scoped personas to box in where an agent is allowed to get clever in the first place, rather than trying to catch every bad decision after it's made.
- Draw the micromanaging line at verifiability, not frequency. Coaching once to set a boundary isn't micromanagement. Letting a boundary go unchecked while conditions change underneath it is absence wearing a nicer name.
- If you can't say, right now, how you'd know whether a given delegated decision is still correct next week, you haven't actually delegated it. You've just stopped watching it.

That last bullet is the whole post, honestly. Delegating something doesn't mean you stop looking at it. The agent that rewrote its own rule wasn't malicious or even wrong, exactly. It made a locally smart call that nobody was positioned to verify until the bill came due. You can't delegate what you can't verify, and most of the token horror stories going around right now, including this one, are really just that sentence, learned the expensive way.

This is the second of two posts Jeremy and I are writing about managing agents instead of just running them. The first one, "Fluency vs. Substance," was about knowing in detail what you're willing to accept before you hand something off. This one is about what happens once you've handed it off and the agent decides something on your behalf that you never got the chance to weigh in on. Read together, they're basically the same argument from both ends: know what you want before you delegate, and keep a way to check what you got after.
