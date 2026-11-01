// Static markup for the SOC Wall. Content lists are filled from src/data by the engine.
export const MARKUP = String.raw`<canvas id="bg" aria-hidden="true"></canvas>
<canvas id="trail" aria-hidden="true"></canvas>
<div id="veil" aria-hidden="true">
  <div class="px" id="px"></div>
  <div class="bootui" id="bootui">
    <div class="bt-top"><span><b>ASHDEX</b> // SECURE BOOT</span><span>session <b id="sess">--------</b></span><span>Gurugram node · IST</span></div>
    <div class="bt-mid">
      <div class="bt-count"><div class="hex num" id="hex">0x00</div><div class="bits" id="bits"></div></div>
      <pre class="dump" id="dump"></pre>
      <div><pre class="art" id="art"></pre><span class="cap2">session key · drunken-bishop randomart</span></div>
    </div>
    <div class="bt-fp"><span>SHA256</span><b id="fp"></b></div>
    <pre class="bt-log" id="log"></pre>
    <div class="bt-skip">Press any key to skip</div>
  </div>
</div>

<header class="bar">
  <a class="mark" href="#" data-go="home">Ashdex <span>/ Jayesh Choudhary</span></a>
  <span class="where" id="where"><b>01</b> / WHOAMI</span>
  <span class="sp"></span>
  <span class="clock">Gurugram <b class="num" id="clock">--:--</b> IST</span>
  <button class="idx-btn" id="idxBtn" type="button" aria-controls="index">Index <kbd>⌘K</kbd></button>
  <a class="cta" href="#comms" data-go="comms">Request a briefing</a>
</header>
<nav class="tabs" id="tabs" aria-label="Pages"><div class="track" id="tabTrack"><i class="ind" id="tabInd"></i></div></nav>
<div class="index" id="index" hidden role="dialog" aria-label="Page index"><ol></ol><div class="hint"><span>Press 1–9, 0 to jump</span><span>Esc to close</span></div></div>

<div class="page">
<!-- ═════════ WALL ═════════ -->
<main class="view" id="home">
  <div class="wall">
    <section class="mon dossier" aria-labelledby="who">
      <h2>Analyst on shift <small>Lead Security Engineer · Payatu</small></h2>
      <div class="scr">
        <h1 id="who">Jayesh<br>Choudhary</h1>
        <div class="role">Seven years across the whole defensive stack</div>
        <p class="pitch">SOC operations, incident response, insider threat, cloud IR and data security. I build security programs end to end: <b>a full SOC and IR program in four weeks</b> after a SWIFT fraud, <b>Purview DLP across ~400 endpoints</b>, and 60+ ATT&amp;CK-mapped detections in production.</p>
        <div class="targets">Open to <span>Security Architect</span><span>Principal D&amp;R Engineer</span><span>Security Consultant / vCISO</span></div>
        <div class="ctas">
          <a class="btn p" href="#comms" data-go="comms">Request a briefing <svg viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg></a>
          <a class="btn" href="#">Download CV <svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg></a>
        </div>
        <div class="creds"><b>CISSP · CISM · CISA · SC-100 · CCSK · AZ-500</b> and 10 more · CRISC and AAISM in progress</div>
      </div>
    </section>
    <section class="mon radar" aria-labelledby="rt">
      <h2 id="rt">Engagements <small>height is severity</small></h2>
      <div class="scr" id="radarScr"><canvas class="gl" id="radar" aria-label="3D radar of eight engagements"></canvas><div class="labels" id="radarLabels"></div><div class="cap"><span id="radarCap">Hover a marker to read the case</span><span>5 critical · 3 high</span></div></div>
    </section>
    <section class="mon stream" aria-labelledby="st">
      <h2 id="st">Record <small>2019 → now</small></h2>
      <div class="scr"><div class="head"><span id="streamCount">0 entries</span><button class="pause" id="pause" type="button">Pause feed</button></div><ol id="feed"></ol></div>
    </section>
    <section class="mon matrix" aria-labelledby="mt">
      <h2 id="mt">ATT&amp;CK coverage <small>from real cases</small></h2>
      <div class="scr" id="matrixScr"><canvas class="gl" id="matrix" aria-label="3D ATT&amp;CK coverage matrix"></canvas><div class="labels" id="matrixLabels"></div><div class="cap"><span id="matrixCap">Solid blocks are techniques I have detected; outlines are adjacent ones</span></div></div>
    </section>
    <section class="mon ledger" aria-labelledby="lt">
      <h2 id="lt">Measured results <small>before → after</small></h2>
      <div class="scr"><table id="ledger"></table></div>
    </section>
  </div>

  <!-- escalation -->
  <section class="esc" id="esc" aria-label="Engagements by severity">
    <div class="stick">
      <div class="card" id="escCard"><canvas class="gl" id="escGL" aria-label="Full-screen radar of eight engagements"></canvas></div>
      <div class="words"><span class="c" id="wA">5 Critical</span><span class="h" id="wB">3 High</span></div>
      <p class="meta" id="escMeta"><b>8 engagements</b> · banks, fintechs and cloud-native teams<br>SWIFT BEC · SilverFox C2 · cross-cloud pivot · MSRPC abuse · DGA takedown</p>
    </div>
  </section>

  <section class="contact" id="contact">
    <div class="sh" style="padding:0"><h2 class="dec" data-dec>Brief me on<br>your SOC</h2></div>
    <div class="row"><a class="btn p" href="#comms" data-go="comms">Open comms <svg viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg></a><span>LinkedIn · GitHub · FreeIntelhub</span><span>CISSP · CISM · CISA · SC-100</span></div>
  </section>
</main>

<!-- ═════════ 02 TIMELINE ═════════ -->
<main class="view" id="timeline" hidden>
  <div class="pg-head"><h1 class="dec" data-dec>Timeline</h1><p>From DLP policy engineering to leading incident response and building security programs. Every figure is measured.</p><div class="meta"><span><b>6</b> roles</span><span><b>2019 → now</b></span><span>Gurugram · Mumbai</span></div></div>
  <div class="pg-body" id="tlBody"></div>
</main>
<!-- ═════════ 03 INCIDENT FILES ═════════ -->
<main class="view" id="incidents" hidden>
  <div class="pg-head"><h1 class="dec" data-dec>Incident files</h1><p>Eight engagements, each with the scenario, how I investigated it, what I did, the measured impact and a detection I wrote for it.</p><div class="meta" id="cfMeta"></div></div>
  <div class="pg-body" id="cfBody"></div>
</main>
<!-- ═════════ 04 ATT&CK ═════════ -->
<main class="view" id="attack" hidden>
  <div class="pg-head"><h1 class="dec" data-dec>ATT&amp;CK</h1><p>Techniques I have detected in real engagements, mapped to MITRE ATT&amp;CK. Scroll through the kill chain, then read the full matrix.</p><div class="meta" id="mxMeta"></div></div>
  <!-- kill chain -->
  <section class="chain" id="chain" aria-labelledby="kc">
    <div class="stage">
      <div class="left">
        <div>
          <h2 id="kc" class="dec" data-dec>Where I break
the chain</h2>
        </div>
        <p>Scroll to follow an intrusion stage by stage. At each one is a detection I have shipped in a real engagement.</p>
        <ol class="steps" id="steps"></ol>
      </div>
      <div class="view3d" id="chainView"><canvas class="gl" id="chainGL" aria-label="3D kill chain path through eight ATT&amp;CK stages"></canvas><div class="readout"><span id="chainNow">Stage 0 of 8</span><span><b id="chainPct">0%</b> of the chain covered</span></div></div>
    </div>
  </section>
  <div class="pg-body"><div class="mx-wrap"><div class="mx-grid" id="mxGrid"></div></div></div>
</main>
<!-- ═════════ 05 CAPABILITY ═════════ -->
<main class="view" id="capability" hidden>
  <div class="pg-head"><h1 class="dec" data-dec>Capability</h1><p>Frameworks, domains and the tooling I work in day to day.</p><div class="meta" id="capMeta"></div></div>
  <div class="pg-body"><div class="cap-grid" id="capGrid"></div></div>
</main>
<!-- ═════════ 06 DEPLOYED ═════════ -->
<main class="view" id="deployed" hidden>
  <div class="pg-head"><h1 class="dec" data-dec>Deployed</h1><p>Systems I designed and shipped, each framed as the problem, the approach and the measured outcome.</p><div class="meta"><span><b>6</b> projects in production</span></div></div>
  <div class="pg-body" id="pjBody"></div>
</main>
<!-- ═════════ 07 CREDENTIALS ═════════ -->
<main class="view" id="credentials" hidden>
  <div class="pg-head"><h1 class="dec" data-dec>Credentials</h1><p>Management, architecture, offensive and cloud certifications held.</p><div class="meta" id="crMeta"></div></div>
  <div class="pg-body"><div class="cr-grid" id="crGrid"></div></div>
</main>
<!-- ═════════ 08 IN PROGRESS ═════════ -->
<main class="view" id="inprogress" hidden>
  <div class="pg-head"><h1 class="dec" data-dec>In progress</h1><p>Certifications I am working toward now, in risk governance and AI security management.</p></div>
  <div class="pg-body"><div class="pursue" id="puGrid"></div></div>
</main>
<!-- ═════════ 09 OPEN SOURCE ═════════ -->
<main class="view" id="opensource" hidden>
  <div class="pg-head"><h1 class="dec" data-dec>Open source</h1><p>Public repositories: threat-intel tooling, detection rules and automation.</p><div class="meta"><span><b>6</b> repositories</span><span>github.com/ASHDEX</span></div></div>
  <div class="pg-body rows" id="osBody"></div>
</main>
<!-- ═════════ 10 COMMS ═════════ -->
<main class="view" id="comms" hidden>
  <div class="pg-head"><h1 class="dec" data-dec>Brief me on your SOC</h1><p>Hiring for a security architect, principal detection and response engineer, or a vCISO? Reach me on any channel below.</p></div>
  <div class="pg-body rows comms" id="cmBody"></div>
</main>

</div>
`;
