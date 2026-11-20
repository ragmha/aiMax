{
  const pick = (code, takeaway, insight, why) => ({ code, takeaway, insight, why });
  window.SESSION_WATCHLISTS = [
    { id: "leaders", audience: "Engineering leaders", title: "Decide what helps your team", topics: ["people", "evals"],
      chapters: [
        { title: "Choose an outcome worth measuring", picks: [
          pick("LDR1797D", "Pull-request data offers a way to compare AI usage with engineering outcomes.", "More activity need not mean better delivery.", "Pick one outcome to track alongside usage in your next pilot."),
          pick("aie-Ve2bAarPA2I", "In the study described, a model switch barely changed how many pull requests engineers merged.", "Throughput alone cannot tell you whether the model, workflow or team made the difference.", "Use this before choosing between a model upgrade and coaching."),
          pick("aie-_fHTqOs5wQA", "A workshop tests a product idea by asking people how they handled the problem last time.", "An existing workaround tells you more about a need than a hypothetical yes.", "Find a pilot problem important enough that people already spend time solving it."),
          pick("BLD1886M", "The talk weighs a project's usefulness and upkeep against how quickly it can be built.", "A cheap prototype can create a long maintenance commitment.", "Ask what you would stop maintaining to make room for the next idea."),
        ] },
        { title: "Redesign the team's workflow", picks: [
          pick("BLD1908M", "People set delivery outcomes while agents take on work across the development lifecycle.", "Delegating a task does not transfer accountability for its result.", "Name the person who decides when an agent's work is ready."),
          pick("aie-21tuT-e4NVo", "The speakers compare shorter development cycles, smaller teams and shared skills across AI-assisted workflows.", "Faster coding can move a queue into requirements or release rather than remove it.", "Identify where work now waits before asking people to code faster."),
          pick("LDR1341H", "A team puts prioritization criteria and assumptions under version control.", "A disagreement about a score can reveal a more important disagreement about the criteria.", "Try reviewing one disputed assumption before reordering a backlog."),
          pick("BLD1460H", "Shared configuration grew into an internal catalog of tools that colleagues could reuse.", "Repeat use tells you which shared tools deserve care; catalog size cannot.", "Choose one team practice to support for a second team, with a named owner."),
        ] },
        { title: "Decide what to scale", picks: [
          pick("aie-rWtbOgl5FTU", "On some benchmark tasks, a lower-priced model used enough extra tokens to cost more.", "Price per token and cost per successful task answer different questions.", "Compare two options on a sample of work your team actually does."),
          pick("aie-Emo5FGGY-wM", "The speaker describes updating browser-agent evaluations around failures users encountered.", "A stable benchmark can miss a newly important use case.", "Ask which recent user failure belongs in the next release check."),
          pick("aie--a2oTS9J67U", "An illustrative pilot separates technical accuracy, business value and the authority to act.", "Fewer human overrides can mean weaker oversight rather than better performance.", "Decide what evidence would justify moving from drafts to autonomous actions."),
          pick("LDR1161H", "A team moved governance from documents into pull-request checks and shares what went wrong.", "An enforced rule needs an owner when it blocks legitimate work.", "Before expanding a pilot, decide who can revise a rule and how teams can challenge it."),
        ] },
      ] },
    { id: "developers", audience: "Developers", title: "Build a tool and test whether it helps", topics: ["tools", "evals", "coding"],
      chapters: [
        { title: "Build one useful tool", picks: [
          pick("BLD1332H", "A musical pixel dog shows how an MCP server lets an agent operate tools in an application.", "A visible response makes it easier to tell whether a tool call did what you intended.", "Start with one action in your app whose result you can see."),
          pick("BLD1489H", "CLI hooks connect events in an agent's lifecycle to a physical lamp.", "An event signal can show that work started without proving it succeeded.", "Choose a hook that tells you when to look at the result."),
          pick("aie-DrfyORO8RqA", "The speaker compares keeping tool output outside the prompt, selecting excerpts, compressing it and isolating tasks.", "Returning more text is not the same as giving the agent better evidence.", "Use this when one tool response swamps the rest of the conversation."),
          pick("BLD1353D", "An iteratively developed CLI skill produces a database health report that people can review.", "A reusable report needs verifiable observations, not just a consistent format.", "Turn one repeated diagnostic into a skill whose output you can check."),
        ] },
        { title: "Test it on real work", picks: [
          pick("BLD1398H", "The session treats a specification as a hypothesis that can be tested across model runs.", "A single successful run demonstrates possibility, not consistency.", "Choose a behavior that should survive a change of prompt or model."),
          pick("aie-gv4w23xYj-0", "A workshop turns agent traces into examples with explicit pass or fail criteria.", "Writing the criterion often exposes an ambiguity in the original task.", "Turn one trace you understand into your first evaluation case."),
          pick("aie-T3SS931wU0I", "Two search methods reached the same accuracy at different costs on the coding tasks in this experiment.", "Passing the same tests can hide differences in how much work an agent does.", "Use a past bug fix to compare approaches before changing your search strategy."),
          pick("LDR1434D", "Reproducible evaluations compare coding agents across models, clients and configurations.", "A changed client can confound what looks like a model improvement.", "Record the setup you will need when you repeat the comparison."),
        ] },
        { title: "Get the change through review", picks: [
          pick("BLD1485D", "Stacked pull requests divide a large change into smaller dependent reviews.", "A reviewer can reason about one decision more easily when its prerequisites are clear.", "Split a large agent-generated change at a boundary you can explain."),
          pick("LDR1662D", "Recurring pull-request comments can become custom instructions for code review.", "Review history contains examples of what generic guidance misses.", "Turn one repeated comment into an instruction and check it on the next change."),
          pick("aie--AKPRSYccJc", "A workshop follows a small feature from a written plan through checks, review findings and fixes.", "A passing local run and a resolved review finding are different pieces of evidence.", "Decide what your pull request must demonstrate before it can merge."),
          pick("BLD1819H", "The talk brings agent assistance into reproducible CI workflows while retaining human review.", "A useful automated suggestion should still be independently checkable.", "Finish by making a teammate able to reproduce your last verification step."),
        ] },
      ] },
    { id: "enterprise", audience: "Enterprise teams", title: "Make changes across teams safely", topics: ["context", "security", "platform"],
      chapters: [
        { title: "Find the owners and dependencies", picks: [
          pick("aie-k2ClBT4aqAg", "A team mapped API relationships across 115 microservices so coding agents could reason beyond one repository.", "A stale map can mislead an agent precisely when another team is affected.", "Start here if nobody can say which services an API change will touch."),
          pick("aie-3ZlQk4-knWM", "A hypothetical document assistant surfaces questions about data owners, approvals and error handling.", "A working demo does not identify who is authorized to approve its use.", "Find the people who need to evaluate the workflow before widening its scope."),
          pick("BLD1810D", "Repository ownership and service criticality can guide policy as a prototype becomes important.", "A useful control changes with a service's responsibilities, not just its age.", "Identify when a prototype needs stronger protections."),
          pick("LDR1594H", "An MCP workflow uses live infrastructure context and updates documentation as work completes.", "Documentation is more useful across teams when changes have a route back into it.", "Choose one shared operational fact that goes stale today and identify its source."),
        ] },
        { title: "Set boundaries teams can reuse", picks: [
          pick("LDR1358D", "Organization settings can be managed as reviewed configuration changes using Terraform.", "Other teams can question a proposed setting before it becomes their default.", "Choose a shared setting that should have a named reviewer and a change history."),
          pick("TRU1322H", "Fine-grained authorization lets a hosted MCP tool propose a change without granting it permission to merge.", "Preparing a change and approving it need not share an identity or permission.", "Find a workflow where those two decisions should be separated."),
          pick("aie-tZycGA_Fbfo", "An internal deployment path provisions agent identity, tracing, evaluation and access to reviewed tools.", "Shared defaults reduce what each team has to assemble, but the controls still need testing.", "Specify the minimum resources a new team should receive on day one."),
          pick("BLD1638D", "Database branches isolate experimental changes from production data.", "Permission to propose a schema change need not include permission to alter the live database.", "Give teams a place to validate a change before its effects cross a service boundary."),
        ] },
        { title: "Verify releases and rehearse recovery", picks: [
          pick("aie-obfPzbapMIM", "A workshop turns expert feedback into test cases and checks prompt changes in CI.", "Domain reviewers can name costly mistakes that a general quality score overlooks.", "Choose a failure your release process should catch before a prompt change ships."),
          pick("TRU1324H", "Runtime monitoring reveals how AI-generated workloads behave after deployment.", "Approval records show what was intended; runtime evidence shows what happened.", "Agree on one signal the owning team will inspect after rollout."),
          pick("aie-mJ7q8CuVmbw", "A payout demonstration resumes after a worker stops without repeating completed actions.", "Restarting a worker is not the same as recovering a workflow safely.", "Rehearse an interruption and check that completed side effects do not happen twice."),
          pick("BLD1795D", "The session connects governed deployment with diagnosis and recovery after a failure.", "A rollout plan is incomplete if nobody knows who makes the recovery decision.", "Finish with a rehearsal that includes both the releasing team and the on-call owner."),
        ] },
      ] },
  ];
}
