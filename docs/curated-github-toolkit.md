# Curated GitHub Toolkit

This file tracks repositories that are worth keeping, studying, or testing for the Prompt Engineering Workbench and the broader OmniSpark direction.

## Decision labels

- **Acquire now**: low-risk reference material or a focused skill with immediate value.
- **Pilot later**: potentially useful software that should be tested with sample data and low-privilege credentials.
- **Bookmark**: useful catalog or future-project reference; no installation needed now.
- **Skip for now**: technically valid, but not aligned with the current project stage.

## Acquire now

### google-labs-code/design.md

Repository: https://github.com/google-labs-code/design.md

Use: Create a persistent `DESIGN.md` specification so coding agents understand visual identity, component rules, accessibility constraints, spacing, typography, and design rationale.

Why it fits: The workbench needs stable design instructions that survive across coding sessions and different agents.

Acquisition mode: Reference the specification and create a project-specific `DESIGN.md`; do not copy the entire repository into this project.

### openai/plugins

Repository: https://github.com/openai/plugins

Use: Official OpenAI examples and reusable Codex plugin workflows.

Why it fits: This is the most directly compatible source in the collection for Codex-assisted work, including web, iOS/macOS, Notion, Figma, Slides, Expo, Netlify, and media workflows.

Acquisition mode: Install only the individual plugins needed for a current task.

### Leonxlnx/taste-skill

Repository: https://github.com/Leonxlnx/taste-skill

Use: Improve interface quality and reduce generic AI-generated visual design.

Why it fits: It complements `DESIGN.md` by giving coding agents practical aesthetic guidance.

Acquisition mode: Review the skill instructions, then install it in the active coding-agent environment.

### mvanhorn/last30days-skill

Repository: https://github.com/mvanhorn/last30days-skill

Use: Research recent discussions and developments across Reddit, YouTube, Hacker News, GitHub, X, Polymarket, and the web.

Why it fits: It matches the user's evidence-oriented investigation workflow and can become an OmniSpark research module.

Acquisition mode: Install after reviewing its data sources and optional credential requirements.

### vsouza/awesome-ios

Repository: https://github.com/vsouza/awesome-ios

Use: Curated directory of iOS and Swift libraries, tools, architecture patterns, testing resources, UI components, and development references.

Why it fits: Useful whenever the workbench or OmniSpark expands into native iPhone or iPad development.

Acquisition mode: Bookmark and search as needed; no local installation required.

### vinta/awesome-python

Repository: https://github.com/vinta/awesome-python

Use: Curated directory of Python libraries and frameworks.

Why it fits: Useful for future automation, document processing, crawling, analysis, and local tooling.

Acquisition mode: Bookmark and select individual libraries only when a concrete need exists.

## Pilot later

### supermemoryai/supermemory

Repository: https://github.com/supermemoryai/supermemory

Potential use: Long-term memory and context retrieval for AI applications.

Why it may fit: Its purpose overlaps strongly with OmniSpark's long-term knowledge and context goals.

Pilot rule: Use synthetic or non-sensitive documents first. Do not connect the full personal archive until storage, deletion, export, access control, and contradiction-handling behavior are verified.

### mnfst/manifest

Repository: https://github.com/mnfst/manifest

Potential use: Route one application across multiple AI providers through an OpenAI-compatible endpoint, with fallback and provider management.

Why it may fit: Could later let OmniSpark choose among local, free, and paid models without rewriting every integration.

Pilot rule: Delay until there is a real multi-provider requirement. Test with low-value provider keys.

### scrapy/scrapy

Repository: https://github.com/scrapy/scrapy

Potential use: Structured website crawling and extraction.

Why it may fit: Could power a future Website Explorer or research-ingestion module.

Pilot rule: Start with one permitted public website and a narrow extraction target. Respect site terms, robots rules, rate limits, and copyright.

### appsmithorg/appsmith

Repository: https://github.com/appsmithorg/appsmith

Potential use: Build dashboards, internal tools, and database/API interfaces with less hand-written UI code.

Why it may fit: Could become an OmniSpark control panel.

Pilot rule: Test locally or in an isolated workspace before connecting real accounts, databases, or personal records.

### Panniantong/Agent-Reach

Repository: https://github.com/Panniantong/Agent-Reach

Potential use: Give command-line agents access to search and read several web platforms.

Why it may fit: Relevant to cross-platform research.

Pilot rule: Treat login cookies and unofficial scraping integrations as sensitive. Use test accounts and review every installed dependency and command.

### tashfeenahmed/freellmapi

Repository: https://github.com/tashfeenahmed/freellmapi

Potential use: Pool free allowances from multiple LLM providers behind one OpenAI-compatible endpoint.

Why it may fit: Could reduce experimentation cost.

Pilot rule: Treat advertised capacity as an unverified project claim. Use separate low-privilege API keys and never import the primary credentials for important accounts during the first tests.

## Bookmark for future projects

### awesome-selfhosted/awesome-selfhosted

Repository: https://github.com/awesome-selfhosted/awesome-selfhosted

Use: Discover software that can run on privately controlled servers.

### sindresorhus/awesome

Repository: https://github.com/sindresorhus/awesome

Use: Master catalog of curated topic-specific lists.

### 521xueweihan/HelloGitHub

Repository: https://github.com/521xueweihan/HelloGitHub

Use: Discover interesting and approachable open-source projects.

### harry0703/MoneyPrinterTurbo

Repository: https://github.com/harry0703/MoneyPrinterTurbo

Use: Future automated short-video experiments.

### calesthio/OpenMontage

Repository: https://github.com/calesthio/OpenMontage

Use: Future agentic video-production experiments; larger and more complex than MoneyPrinterTurbo.

### mukul975/Anthropic-Cybersecurity-Skills

Repository: https://github.com/mukul975/Anthropic-Cybersecurity-Skills

Use: Defensive security reference material and selected checklists.

Caution: This is a community project, not an official Anthropic repository. Install only narrowly selected defensive skills rather than importing the entire collection.

## Skip for now

- https://github.com/boostercloud/booster — enterprise backend architecture is unnecessary at the current stage.
- https://github.com/bitfield/script — only useful when actively building a Go program that needs shell-style pipelines.
- https://github.com/avelino/awesome-go — useful only after choosing Go for a project.
- https://github.com/opsdroid/opsdroid — relevant mainly for a dedicated chat-platform bot.
- https://github.com/botpress/botpress — overlaps with existing agent and chatbot options and is not a current priority.
- https://github.com/videojs/video.js — only needed for a web product that requires a custom video player.
- https://github.com/esengine/DeepSeek-Reasonix — overlaps with existing coding agents; test only for a specific DeepSeek-focused requirement.

## Safe acquisition protocol

1. Never bulk-install all repositories.
2. Keep reference catalogs as links rather than copying their contents.
3. Review the README, license, install scripts, dependency files, open security issues, and recent maintenance activity before execution.
4. Use sample data, test accounts, and low-privilege API keys during pilots.
5. Record the exact commit or release tested.
6. Keep every installation reversible and document removal steps.
7. Do not connect personal archives, primary account cookies, or high-value credentials until the pilot passes review.

## Recommended implementation order

1. Create a project-specific `DESIGN.md` using `google-labs-code/design.md`.
2. Select only the needed official OpenAI Codex plugins.
3. Add `taste-skill` to the design workflow.
4. Test `last30days-skill` as a research module.
5. Keep `awesome-ios` and `awesome-python` as reference catalogs.
6. Pilot Supermemory with synthetic documents.
7. Evaluate Manifest only after a genuine multi-provider requirement appears.
