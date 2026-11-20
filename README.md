# Session explorer

Find talks that interest you across **GitHub Universe 2026** and **AI Engineer**. Shared learning topics connect the sources without treating them as one event or assigning GitHub products and tracks to unrelated talks.

Learning topics open by default. Filter by source, known event/publication year, public recordings or mappings needing review. Search includes original titles, topic labels, publisher playlist names and Universe takeaways. Search for an older event such as `Summit 2023` even when its videos' publication dates are unavailable.

Selecting a topic narrows the list; its matrix shows exact **source x format** intersections. Within the Universe source, the original catalog topics, products, themes, audiences and track matrices remain available. **All sessions** clears the chart selection while keeping source, year, search and recording filters.

Results initially show 150 sessions, with **Show more** for the rest. Recorded talks from both sources are interleaved when browsing all sources. Smaller topics that cannot fit a readable proportional tile appear in a visible topic index beneath the chart.

**Knowledge graph** opens at `index.html#view=graph`. One connected network draws the 18 named learning topics as circles sized by talk count, with small subtopic dots around them. A line means at least one distinct session carries both topic tags; thicker lines mean more shared sessions, not that one concept requires another. Four colors group related topics for browsing; color does not imply a relationship. Positions come from a deterministic layout of the whole catalog, so they stay put while filters change only sizes and counts. Unclassified sessions remain in the overview list but do not form nodes; tentative assignments are identified. Hovering or selecting a topic lights its neighbors and subtopics in place, and **Related topic** lists every nonzero overlap.

The graph is zoomable and interactive. Scroll or pinch to zoom at the pointer, or use the toolbar, double-click (Shift to zoom out), or `+`, `−`, `0` and arrow keys after focusing a topic. Scrolling down from the fully zoomed-out map continues scrolling the page, and one finger on touch screens scrolls vertically. Drag the background to pan. Dragging a topic pulls its connected topics along on springs; the dropped topic stays pinned there, and **Restore layout** springs every node back to the shared deterministic position. On narrow screens with a mouse, the graph sits in a fixed-height viewport: 100% fills its width, and **Fit** shows the whole map. Selecting the line between two topics, or a neighbor, shows exactly the sessions behind its count. The side panel shows the current topic's first six ordered sessions with in-app playback, its connected topics and its subtopics. Without a selection it lists the strongest connections. Lines are hidden from assistive technology; the panel and selects provide the same choices. Reduced-motion settings skip the spring animation.

**Subtopic** narrows a learning topic by a small, explicit vocabulary (`graph.js`). Matches use the talk title before a speaker credit, Universe catalog tags/products, or stored AI Engineer description terms for that topic. These are not transcript summaries or inferred playlist subjects. Sessions without a match stay in the parent topic; subtopic counts can overlap. Selecting a subtopic shows its matching words and source on each row. For example, `index.html#view=graph&topic=retrieval&subtopic=graphs` opens **Search, RAG & knowledge → Knowledge graphs**. Add `with=<topic-id>` to inspect a co-tagged subset. Map counts use the same source, year, search, recording, review and optional watched-history filters as the results. Graph links retain these selections except private watch history.

**Audience watchlists** are expandable sections above the catalog filters and topic chart. Engineering leaders, developers and enterprise teams each get 12 public recordings in three chapters of four. Expand a chapter to see its ordered picks, short takeaways, editorial insights and reasons to watch. The chapter heading shows its approximate runtime. These are editorial selections, not exhaustive audience classifications or official event recommendations. The source and search filters apply to the catalog, not the fixed watchlists. Related-topic links open the full matching catalog. `index.html#path=leaders`, `#path=developers` and `#path=enterprise` open the corresponding section inline.

To curate another path, add an entry to `watchlists.js`: choose a reader's question, organize `chapters` around decisions or tasks, and add ordered `pick(code, takeaway, insight, why)` entries using recorded sessions. Link existing shared topic IDs for further exploration. Titles, sources, durations, playback and watch history come from the same records as the catalog.

## Run

Open `index.html` in a browser, or serve the folder from a static host. No build step or package dependencies. All browsing data is bundled locally; choosing a recording loads YouTube's player in an in-page dialog. No videos, captions or thumbnails are bundled.

Source, year, topic and matrix selections are encoded in the URL hash, for example `index.html#src=ai-engineer&d=learning&v=tools`. Existing `d=topic`, `d=product`, `d=play` and `d=audience` links retain their original Universe-only semantics.

## Data

`data.js` holds the Universe catalog snapshot (2026-11-19): 126 content sessions, including 53 public recording links. `insights.js` contains concise editorial takeaways derived from catalog descriptions, **not recording transcripts**. Original catalog tags remain unchanged.

`ai-engineer.js` and `ai-engineer-part-2.js`, loaded in that order, together hold the AI Engineer snapshot (2026-11-20), shared taxonomy, Universe-to-shared-topic mapping, publisher playlist references and a coverage/exclusion ledger. Keep both files beside `index.html`. The public listing contained 1,519 uploads and 38 streams. It includes 1,512 talks/workshops and excludes seven promotional, welcome/closing or non-talk uploads plus 38 multi-session/partial event streams. Shorts were deliberately outside collection scope. Hidden/private playlist entries are unavailable and not counted as public talks.

All 98 publisher playlists were fetched. Per-video requests were rate-limited with HTTP 429: only 306 included videos have fetched descriptions. The remaining records retain their original links, titles, durations and available playlist evidence. Missing publication dates stay unknown, not inferred from event names; they can be filtered with **Publication date unknown**. Playlist membership is linked as evidence, not asserted as an exact event date.

Each talk has a primary topic and up to three secondary topics. Mapping is deterministic and editorial, using description terms and topic-specific publisher playlists; title terms help prioritize matches. **Title-only suggestions are always marked for review.** Weak matches are also flagged, and subjects without adequate clues remain in **Unclassified topics**. The **Needs topic review** filter includes both provisional assignments and unclassified talks. A metadata-supported match does not mean a human watched or verified the recording.

AI Engineer entries expose their mapping evidence rather than fabricated takeaways. These mappings are not transcripts, endorsements or official event categories. Names and titles are preserved as source metadata; no third-party imagery or extended description text is republished.

## Access and watch history

Universe sessions without a public recording require attendee access to view their portal details. Those rows explicitly say **No public recording - attendee sign-in required**. The secondary details links on recorded Universe sessions are also labelled as sign-in links. The [attendee login](https://reg.githubuniverse.com/flow/github/universe26/attendee-portal/login) remains on the original site; this explorer never asks for a password or PAT and does not implement unverified token-based access.

Select a recording to play it in the page, or follow its original YouTube link. Video watch history is saved in this browser when at least half the recording has played; sessions can also be marked watched manually. No history is sent to a server. Universe watch-history keys are preserved; AI Engineer records use `aie-<YouTube video ID>` identities. **Watch history** respects the source/year filters.

Larger tiles mean more sessions, **not importance, quality or recommendations**. Topic tags overlap; a talk is counted once per matching topic. Matrix cells count sessions matching both row and column, without double-counting within a cell. Smaller topics listed below the treemap are not represented to scale.

Before redistributing this project or publishing changes, review the exact contents, permissions and destination; metadata collection and local automated checks do not establish publication rights or announcement authority.
