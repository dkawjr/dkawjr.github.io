(() => {
  'use strict';

  const one = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  let toastTimer;
  function notify(message) {
    const toast = one('#toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  const residentTemplate = `
    <aside class="role-context"><span class="role-label">Resident view</span><h3>Ask clearly. Know what happened.</h3><p>Submit a real demo request, track its status, and connect an approved schedule to a calendar.</p><ul class="role-list"><li>Balances update with the request</li><li>Priority and private note stay visible</li><li>Only approved schedules sync</li></ul></aside>
    <div class="role-screen">
      <div class="screen-top"><div><h3>Your next request round</h3><p>Requests close August 6 at 5:00 PM</p></div><span class="status" id="residentPriorityStatus">2 priorities remaining</span></div>
      <div class="resident-screen">
        <div class="leave-strip" aria-label="Time away balance"><div class="leave-strip-head"><strong>2026–27 time away</strong><span>Updated Aug 25</span></div><div class="leave-strip-account"><span>Vacation</span><strong id="vacationAvailable">13 days</strong><small id="vacationBreakdown">20 granted · 5 approved · 2 pending</small></div><div class="leave-strip-account"><span>Sick leave</span><strong id="sickAvailable">6 days</strong><small id="sickBreakdown">6 granted · no recorded use</small></div></div>
        <div class="request-card">
          <div class="card-head"><strong>Request time away</strong><span>Try the full request flow. This demo resets when the page reloads.</span></div>
          <form class="request-body" id="residentDemoForm">
            <div class="field"><label for="shareRequestType">Request type</label><select id="shareRequestType"><option value="vacation">Vacation</option><option value="sick">Sick leave / call-out</option><option value="preference">Schedule preference · no leave used</option></select></div>
            <div class="field"><label for="shareRequestDate">Date or range</label><input id="shareRequestDate" type="text" value="Sep 19–20"></div>
            <div class="field"><label>How important is this?</label><div class="priorities" role="group" aria-label="Request priority"><button class="priority" type="button" data-priority="Must have">Must have</button><button class="priority active" type="button" data-priority="Important">Important</button><button class="priority" type="button" data-priority="Nice to have">Nice to have</button></div></div>
            <div class="field"><label for="shareRequestNote">Private note · optional</label><textarea id="shareRequestNote" placeholder="Only the schedule maker and PD can see this."></textarea></div>
            <div class="action-row"><button class="mini-button" type="submit">Send request</button></div>
            <div class="request-state" id="residentRequestState" aria-live="polite"><div class="request-empty">No request submitted yet.</div></div>
          </form>
        </div>
        <div class="calendar-card"><div class="card-head"><strong>Approved schedule</strong><span>Drafts never appear here.</span></div><div class="schedule-release"><strong id="residentScheduleTitle">No new approved version</strong><span id="residentScheduleDetail">The current draft is still private to program leadership.</span></div><div class="calendar-list"><div class="calendar-item"><div><strong>Apple Calendar</strong><span>Private subscription</span></div><button class="connect connected" type="button" data-calendar="apple">Connected</button></div><div class="calendar-item"><div><strong>Google Calendar</strong><span>One-click connection</span></div><button class="connect" type="button" data-calendar="google">Connect</button></div><div class="calendar-item"><div><strong>Outlook</strong><span>Microsoft connection</span></div><button class="connect" type="button" data-calendar="outlook">Connect</button></div></div></div>
      </div>
    </div>`;

  const chiefTemplate = `
    <aside class="role-context"><span class="role-label">Chief resident view</span><h3>Edit with the consequences in view.</h3><p>Click outlined schedule cells, try another assignment, and watch Rulebook checks update before sending the draft.</p><ul class="role-list"><li>Live hard stops and review flags</li><li>Resident request arrives here</li><li>PD comments return to this draft</li></ul></aside>
    <div class="role-screen">
      <div class="screen-top"><div><h3>Block 3 · Draft 07</h3><p id="chiefDraftSubtitle">Rulebook v3.4 · private draft</p></div><button class="mini-button" id="sendApprovalBtn" type="button">Send for approval</button></div>
      <div class="return-note" id="chiefReturnNote"></div>
      <div class="metric-line"><div class="metric"><strong id="hardStopCount">0</strong><span>hard stops</span></div><div class="metric"><strong id="reviewFlagCount">2</strong><span>review flags</span></div><div class="metric"><strong id="requestFitCount">94%</strong><span>requests met</span></div><div class="metric"><strong id="editCount">0</strong><span>draft edits</span></div></div>
      <div class="chief-grid">
        <div class="schedule-card schedule-grid">
          <div class="sched-row head"><div>Resident</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div></div>
          <div class="sched-row"><div>Maya · PGY-1</div><div>ICU D</div><div>ICU D</div><div class="off">Didactics</div><button class="sched-cell night" type="button" data-cell="mayaThu">ICU night</button><button class="sched-cell off" type="button" data-cell="mayaFri">Recovery</button></div>
          <div class="sched-row"><div>Noah · PGY-3</div><div>ICU Sr</div><div>Consult</div><div class="off">Didactics</div><button class="sched-cell night" type="button" data-cell="noahThu">ICU senior night</button><div class="off">Recovery</div></div>
          <div class="sched-row"><div>Leila · PGY-2</div><div>Consult</div><div>Consult</div><div class="off">Didactics</div><div>Consult</div><div>Consult</div></div>
          <div class="sched-row"><div>Ari · PGY-4</div><div>Cardiac</div><div>Cardiac</div><div class="off">Didactics</div><div>Cardiac</div><button class="sched-cell call" type="button" data-cell="ariFri">24h call</button></div>
        </div>
        <aside class="review-card editor-card"><div class="card-head"><strong id="selectedAssignmentTitle">Maya · Thursday</strong><span>Click an outlined cell to inspect it.</span></div><div class="editor-body"><p id="selectedAssignmentDetail"></p><div class="assignment-options" id="assignmentOptions"></div><div class="rule-effect" id="cellRuleEffect"></div></div></aside>
      </div>
    </div>`;

  const pdTemplate = `
    <aside class="role-context"><span class="role-label">Program director view</span><h3>Review decisions, then sign one version.</h3><p>The approval button stays locked until the chief sends a feasible draft and review flags are acknowledged.</p><ul class="role-list"><li>One-page change brief</li><li>Rulebook failures block approval</li><li>Approval releases resident calendars</li></ul></aside>
    <div class="role-screen">
      <div class="screen-top"><div><h3>Block 3 · Approval brief</h3><p id="pdDraftSubtitle">Waiting for Draft 07 from the chief</p></div><button class="mini-button" id="approveDraftBtn" type="button" disabled>Approve version 07</button></div>
      <div class="review-card"><div class="review-summary"><div><strong id="pdHardStops">0</strong><span>unresolved hard stops</span></div><div><strong id="pdReviewFlags">2</strong><span>review flags</span></div><div><strong id="pdChanges">3</strong><span>changes since version 06</span></div></div><div class="diff-list"><div class="diff"><span class="diff-kind">Assignment</span><div><strong>Maya Chen · Thursday</strong><span id="pdMayaDiff">ICU day → ICU night; senior paired; recovery added.</span></div><span class="pass" id="pdMayaState">Rules pass</span></div><div class="diff"><span class="diff-kind">Request</span><div><strong>Resident request round</strong><span id="pdRequestDiff">No new resident request has been submitted in this demo.</span></div><span class="pass" id="pdRequestState">No change</span></div><div id="pdRuleDiffs"></div><div class="diff"><span class="diff-kind">Review</span><div><strong>Outstanding review flags</strong><span id="pdReviewDetail">Acknowledge the visible transitions before approval.</span></div><button class="mini-button warn" id="acknowledgeReviewBtn" type="button">Acknowledge</button></div></div></div>
      <div class="pd-actions"><input id="pdComment" type="text" placeholder="Comment for the chief · optional"><button class="mini-button ghost" id="returnDraftBtn" type="button">Return with comment</button></div><div class="approval-lock" id="approvalLock">The chief has not sent this draft yet.</div>
    </div>`;

  const rulebookTemplate = `
    <div class="role-screen rulebook-screen">
      <div class="screen-top"><div><h3>Try your program's rule</h3><p>Change any blue phrase. The same draft is checked again immediately.</p></div><span class="status" id="rulebookStatus">3 pass &middot; 0 stop &middot; 2 review</span></div>
      <div class="rulebook-stage">
        <div class="rulebook-stage-grid">
          <div class="rule-lab-main">
            <div class="rule-lab-bar"><strong>Your program's Rulebook</strong><span>Version 3.4 &middot; live sandbox</span></div>
            <form class="rule-builder-body" id="ruleBuilderForm">
              <div class="rule-composer">
                <div class="rule-composer-label">One rule, written the way your program says it</div>
                <div class="rule-sentence-editor">If <select class="rule-token subject" id="ruleSubject" aria-label="Rule subject"><option value="pgy1">a PGY-1</option><option value="pgy3">a PGY-3</option><option value="any">any resident</option></select> <select class="rule-token trigger" id="ruleTrigger" aria-label="Rule condition"><option value="icu-night">works overnight ICU</option><option value="call">finishes 24-hour call</option><option value="didactics">attends protected didactics</option><option value="time-off">has approved time away</option></select>, then require <select class="rule-token requirement" id="ruleRequirement" aria-label="Rule requirement"><option value="senior">a qualified senior</option><option value="recovery">the next day protected</option><option value="no-night">no night assignment</option><option value="off">the resident stays off</option></select> <select class="rule-token scope" id="ruleScope" aria-label="Rule scope"><option value="same-site">at the same site</option><option value="recovery">for recovery</option><option value="window">inside the recovery window</option><option value="published">on the published schedule</option></select>.</div>
              </div>
              <div class="rule-lab-meta">
                <div class="rule-meta-cell"><label for="ruleSeverity">Severity</label><select id="ruleSeverity"><option value="hard">Hard stop</option><option value="review">Review flag</option><option value="fair">Fairness signal</option></select></div>
                <div class="rule-meta-cell"><label for="ruleOrigin">Owner</label><select id="ruleOrigin"><option value="program">Program</option><option value="institution">Institution</option><option value="specialty">Specialty</option><option value="acgme">ACGME</option></select></div>
                <div class="rule-meta-cell"><span>Test schedule</span><strong>Block 3 &middot; Draft 07</strong></div>
                <div class="rule-meta-cell"><span>Live check</span><strong id="ruleMetaResult">Passes this draft</strong></div>
              </div>
            </form>
          </div>
          <aside class="rule-lab-result">
            <span class="rule-verdict" id="ruleVerdictPill">Rule satisfied</span>
            <h3 id="ruleVerdictTitle">This assignment can explain itself.</h3>
            <p id="ruleVerdictCopy">The subject, triggering assignment, and required protection are all visible in the current draft.</p>
            <div class="rule-dependencies" id="ruleDependencies"></div>
            <div class="rule-test-result pass-result" id="ruleTestResult" role="status">Passes the current draft.</div>
            <div class="rule-lab-actions"><button class="mini-button ghost" id="testRuleBtn" type="button">Run this check</button><button class="mini-button" id="addRuleBtn" type="button">Add to Rulebook</button></div>
          </aside>
        </div>
        <div class="rule-saved"><div class="rule-saved-head"><strong>Rules currently checking this draft</strong><span id="ruleListSummary">5 configured rules</span></div><div class="rule-list" id="ruleList"></div></div>
      </div>
    </div>`;

  one('#view-resident .role-layout').innerHTML = residentTemplate;
  one('#view-chief .role-layout').innerHTML = chiefTemplate;
  one('#view-pd .role-layout').innerHTML = pdTemplate;
  one('#view-rulebook .role-layout').innerHTML = rulebookTemplate;

  const makeState = () => ({
    activeView: 'resident',
    priority: 'Important',
    request: null,
    calendars: { apple: true, google: false, outlook: false },
    schedule: { mayaThu: 'ICU night', mayaFri: 'Recovery', noahThu: 'ICU senior night', ariFri: '24h call' },
    selectedCell: 'mayaThu',
    edits: 0,
    draftSent: false,
    approved: false,
    acknowledged: false,
    returnedComment: '',
    customRules: []
  });
  let state = makeState();

  const cellConfig = {
    mayaThu: { title: 'Maya Chen · Thursday', detail: 'PGY-1 ICU coverage. The Rulebook checks senior pairing and the following recovery day.', options: ['ICU night', 'ICU day', 'Off'] },
    mayaFri: { title: 'Maya Chen · Friday', detail: 'The day after Maya’s overnight assignment. Removing recovery can create a hard stop.', options: ['Recovery', 'Clinic', 'Off'] },
    noahThu: { title: 'Noah Patel · Thursday', detail: 'Senior ICU coverage paired to Maya’s overnight assignment at the same site.', options: ['ICU senior night', 'Consult', 'Off'] },
    ariFri: { title: 'Ari Morgan · Friday', detail: 'A high-burden 24-hour call assignment that contributes to a review flag.', options: ['24h call', 'Cardiac', 'Off'] }
  };

  const baseRules = [
    { id: 'supervision', text: 'When a PGY-1 works overnight ICU, require a qualified senior at the same site.', severity: 'hard', origin: 'program', evaluate: (s) => s.schedule.mayaThu !== 'ICU night' || s.schedule.noahThu === 'ICU senior night' },
    { id: 'night-recovery', text: 'After an overnight ICU shift, protect the next day for recovery.', severity: 'hard', origin: 'program', evaluate: (s) => s.schedule.mayaThu !== 'ICU night' || s.schedule.mayaFri === 'Recovery' },
    { id: 'call-recovery', text: 'After 24-hour call, require at least 14 hours free of assigned work.', severity: 'hard', origin: 'acgme', evaluate: () => true },
    { id: 'didactics-transition', text: 'Review a protected-didactics to overnight-ICU transition.', severity: 'review', origin: 'program', evaluate: (s) => s.schedule.mayaThu !== 'ICU night' && s.schedule.noahThu !== 'ICU senior night' },
    { id: 'weekend-burden', text: 'Review a third high-burden weekend or 24-hour call.', severity: 'review', origin: 'program', evaluate: (s) => s.schedule.ariFri !== '24h call' }
  ];

  const typeLabels = { vacation: 'Vacation', sick: 'Sick leave / call-out', preference: 'Schedule preference' };
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const selectText = (id) => { const input = one(id); return input.options[input.selectedIndex].text; };

  function customRulePasses(rule) {
    const mayaNight = state.schedule.mayaThu === 'ICU night';
    const noahNight = state.schedule.noahThu === 'ICU senior night';
    const triggerActive = rule.trigger === 'icu-night'
      ? (rule.subject === 'pgy1' ? mayaNight : rule.subject === 'pgy3' ? noahNight : mayaNight || noahNight)
      : rule.trigger === 'call'
        ? state.schedule.ariFri === '24h call'
        : rule.trigger === 'didactics' ? true : Boolean(state.request);
    if (!triggerActive) return true;
    if (rule.requirement === 'senior') return !mayaNight || noahNight;
    if (rule.requirement === 'recovery') return state.schedule.mayaFri === 'Recovery';
    if (rule.requirement === 'no-night') return !mayaNight && !noahNight;
    if (rule.requirement === 'off') return rule.trigger === 'time-off' ? state.approved : state.schedule.mayaThu === 'Off' || state.schedule.ariFri === 'Off';
    return true;
  }

  function allRuleChecks() {
    return [
      ...baseRules.map((rule) => ({ ...rule, passed: rule.evaluate(state), removable: false })),
      ...state.customRules.map((rule) => ({ ...rule, passed: customRulePasses(rule), removable: true }))
    ];
  }

  function ruleCounts() {
    const checks = allRuleChecks();
    return {
      checks,
      passed: checks.filter((rule) => rule.passed).length,
      hardStops: checks.filter((rule) => !rule.passed && rule.severity === 'hard').length,
      reviewFlags: checks.filter((rule) => !rule.passed && rule.severity !== 'hard').length
    };
  }

  function invalidateApproval() {
    state.draftSent = false;
    state.approved = false;
    state.acknowledged = false;
  }

  function switchView(view) {
    const tab = one(`.view-tab[data-view="${view}"]`);
    if (tab) tab.click();
  }

  function assignmentClass(value) {
    if (/night/i.test(value)) return 'night';
    if (/recovery|off/i.test(value)) return 'off';
    if (/24h/i.test(value)) return 'call';
    return '';
  }

  function currentBuilderRule() {
    const text = `If ${selectText('#ruleSubject')} ${selectText('#ruleTrigger')}, then require ${selectText('#ruleRequirement')} ${selectText('#ruleScope')}.`;
    return {
      id: `custom-${Date.now()}`,
      subject: one('#ruleSubject').value,
      trigger: one('#ruleTrigger').value,
      requirement: one('#ruleRequirement').value,
      scope: one('#ruleScope').value,
      severity: one('#ruleSeverity').value,
      origin: one('#ruleOrigin').value,
      text
    };
  }

  function ruleTestDetails(rule) {
    const passed = customRulePasses(rule);
    const mode = passed ? 'pass' : rule.severity === 'hard' ? 'fail' : 'review';
    const resident = rule.subject === 'pgy1'
      ? { title: 'Maya Chen · PGY-1', detail: `Thursday · ${state.schedule.mayaThu}` }
      : rule.subject === 'pgy3'
        ? { title: 'Noah Patel · PGY-3', detail: `Thursday · ${state.schedule.noahThu}` }
        : { title: 'Current resident cohort', detail: `Maya: ${state.schedule.mayaThu} · Noah: ${state.schedule.noahThu}` };
    const trigger = {
      'icu-night': { title: 'Overnight ICU condition', detail: resident.detail },
      call: { title: '24-hour call condition', detail: `Ari Morgan · Friday · ${state.schedule.ariFri}` },
      didactics: { title: 'Protected didactics', detail: 'Wednesday · protected for this cohort' },
      'time-off': { title: 'Approved time away', detail: state.request ? `${typeLabels[state.request.type]} · ${state.request.date}` : 'No approved request is present in this draft' }
    }[rule.trigger];
    const requirement = {
      senior: { title: 'Qualified senior coverage', detail: state.schedule.noahThu === 'ICU senior night' ? 'Noah Patel · same-site senior is assigned' : 'No same-site senior is assigned' },
      recovery: { title: 'Following-day protection', detail: `Maya Friday · ${state.schedule.mayaFri}` },
      'no-night': { title: 'Recovery window', detail: `Maya: ${state.schedule.mayaThu} · Noah: ${state.schedule.noahThu}` },
      off: { title: 'Published schedule protection', detail: state.approved ? 'Approved version keeps the resident off' : 'The current draft does not yet prove this protection' }
    }[rule.requirement];
    return {
      passed,
      mode,
      pill: passed ? 'Rule satisfied' : mode === 'fail' ? 'Hard stop found' : 'Review required',
      title: passed ? 'This assignment can explain itself.' : mode === 'fail' ? 'This rule would stop the draft.' : 'This rule would flag the draft.',
      copy: passed
        ? 'The condition and required protection are both visible in the current schedule.'
        : mode === 'fail'
          ? 'The condition is present, but the required protection is missing. The chief cannot send this version.'
          : 'The condition needs a named human review before the program director can approve this version.',
      result: passed
        ? 'Passes Draft 07. Add it to keep checking future edits.'
        : mode === 'fail'
          ? 'Hard stop: change the rule or edit the schedule to continue.'
          : 'Review flag: the program director must acknowledge this condition.',
      dependencies: [resident, trigger, { ...requirement, failed: !passed }]
    };
  }

  function renderRulePreview(announce = false) {
    const rule = currentBuilderRule();
    const details = ruleTestDetails(rule);
    const verdict = one('#ruleVerdictPill');
    verdict.className = `rule-verdict${details.mode === 'pass' ? '' : ` ${details.mode}`}`;
    verdict.textContent = details.pill;
    one('#ruleVerdictTitle').textContent = details.title;
    one('#ruleVerdictCopy').textContent = details.copy;
    one('#ruleMetaResult').textContent = details.passed ? 'Passes this draft' : details.mode === 'fail' ? 'Blocks this draft' : 'Needs review';
    one('#ruleDependencies').innerHTML = details.dependencies.map((item) => `<div class="rule-dependency"><i class="${item.failed ? 'fail' : ''}"></i><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.detail)}</span></div></div>`).join('');
    const result = one('#ruleTestResult');
    result.className = `rule-test-result ${details.mode === 'pass' ? 'pass-result' : details.mode === 'review' ? 'review-result' : 'fail-result'}`;
    result.textContent = details.result;
    if (announce) notify(details.result);
    return details;
  }
  function setProgress(button, status, mode) {
    button.className = 'demo-step' + (mode ? ` ${mode}` : '');
    button.querySelector('strong').textContent = status;
  }

  function renderProgress() {
    const counts = ruleCounts();
    const steps = Object.fromEntries(all('.demo-step').map((button) => [button.dataset.jumpView, button]));
    setProgress(steps.resident, state.request ? 'Request received' : 'Not submitted', state.activeView === 'resident' ? 'active' : state.request ? 'done' : '');
    setProgress(steps.rulebook, `${counts.passed} pass · ${counts.hardStops} stop · ${counts.reviewFlags} review`, state.activeView === 'rulebook' ? 'active' : counts.hardStops ? 'blocked' : 'done');
    setProgress(steps.chief, state.approved ? 'Version 07 approved' : state.draftSent ? 'Sent to PD' : 'Private draft', state.activeView === 'chief' ? 'active' : state.draftSent || state.approved ? 'done' : '');
    setProgress(steps.pd, state.approved ? 'Approved and released' : state.draftSent ? 'Ready for review' : 'Not sent', state.activeView === 'pd' ? 'active' : state.approved ? 'done' : state.draftSent ? 'active' : '');
    one('#demoHeadline').textContent = state.approved
      ? 'Version 07 is approved. Return to the resident view to see the release.'
      : state.draftSent
        ? 'The same draft is now waiting in the program director view.'
        : state.request
          ? 'The resident request is now visible to the chief and Rulebook.'
          : 'Start as a resident, then follow the same schedule through review.';
  }

  function renderResident() {
    const usesVacation = state.request?.type === 'vacation';
    const usesSick = state.request?.type === 'sick';
    one('#vacationAvailable').textContent = `${13 - (usesVacation ? 2 : 0)} days`;
    one('#vacationBreakdown').textContent = `20 granted · 5 approved · ${2 + (usesVacation ? 2 : 0)} pending`;
    one('#sickAvailable').textContent = `${6 - (usesSick ? 2 : 0)} days`;
    one('#sickBreakdown').textContent = usesSick ? '6 granted · 2 pending in this demo' : '6 granted · no recorded use';
    one('#residentPriorityStatus').textContent = state.request ? '1 priority remaining' : '2 priorities remaining';
    const requestState = one('#residentRequestState');
    if (state.request) {
      requestState.innerHTML = `<div class="request-receipt"><strong>${escapeHtml(typeLabels[state.request.type])} · ${escapeHtml(state.request.date)}</strong><span>${escapeHtml(state.request.priority)} priority · ${state.approved ? 'Approved in version 07' : state.draftSent ? 'Under PD review' : 'Received by the schedule maker'}${state.request.note ? ' · private note attached' : ''}</span><button type="button" id="withdrawRequest">Withdraw request</button></div>`;
      one('#withdrawRequest').addEventListener('click', () => {
        state.request = null;
        invalidateApproval();
        renderAll();
        notify('Request withdrawn. Leave balances restored.');
      });
    } else {
      requestState.innerHTML = '<div class="request-empty">No request submitted yet.</div>';
    }
    one('#residentScheduleTitle').textContent = state.approved ? 'Version 07 · approved' : 'No new approved version';
    one('#residentScheduleDetail').textContent = state.approved ? 'Approved assignments are ready for connected calendars.' : 'The current draft is still private to program leadership.';
    all('[data-calendar]').forEach((button) => {
      const connected = state.calendars[button.dataset.calendar];
      button.classList.toggle('connected', connected);
      button.textContent = connected ? 'Connected' : 'Connect';
    });
  }

  function renderChief() {
    const counts = ruleCounts();
    all('[data-cell]').forEach((button) => {
      const value = state.schedule[button.dataset.cell];
      button.textContent = value;
      button.className = `sched-cell ${assignmentClass(value)}${state.selectedCell === button.dataset.cell ? ' selected' : ''}`;
    });
    one('#hardStopCount').textContent = counts.hardStops;
    one('#reviewFlagCount').textContent = counts.reviewFlags;
    one('#requestFitCount').textContent = state.request ? '97%' : '94%';
    one('#editCount').textContent = state.edits;
    one('#chiefDraftSubtitle').textContent = state.approved ? 'Version 07 · approved and published' : state.draftSent ? 'Version 07 · waiting for PD review' : 'Rulebook v3.4 · private draft';
    const sendButton = one('#sendApprovalBtn');
    sendButton.disabled = counts.hardStops > 0 || state.approved || state.draftSent;
    sendButton.textContent = state.approved ? 'Approved' : state.draftSent ? 'Sent to PD' : state.returnedComment ? 'Resend for approval' : 'Send for approval';
    const returnNote = one('#chiefReturnNote');
    returnNote.style.display = state.returnedComment ? 'block' : 'none';
    returnNote.textContent = state.returnedComment ? `PD comment: ${state.returnedComment}` : '';
    const config = cellConfig[state.selectedCell];
    one('#selectedAssignmentTitle').textContent = config.title;
    one('#selectedAssignmentDetail').textContent = config.detail;
    one('#assignmentOptions').innerHTML = config.options.map((option) => `<button class="option-button${state.schedule[state.selectedCell] === option ? ' active' : ''}" type="button" data-assignment-choice="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join('');
    all('[data-assignment-choice]').forEach((button) => button.addEventListener('click', () => {
      state.schedule[state.selectedCell] = button.dataset.assignmentChoice;
      state.edits += 1;
      state.returnedComment = '';
      invalidateApproval();
      renderAll();
      notify(`${config.title} changed to ${button.dataset.assignmentChoice}. Rulebook checks updated.`);
    }));
    one('#cellRuleEffect').textContent = counts.hardStops
      ? `${counts.hardStops} hard stop${counts.hardStops === 1 ? '' : 's'} currently lock approval. Open the Rulebook to see which rule failed.`
      : `${counts.passed} rules pass. ${counts.reviewFlags} review flag${counts.reviewFlags === 1 ? '' : 's'} remain visible to the PD.`;
  }

  function renderPd() {
    const counts = ruleCounts();
    const canApprove = state.draftSent && counts.hardStops === 0 && (counts.reviewFlags === 0 || state.acknowledged) && !state.approved;
    one('#pdHardStops').textContent = counts.hardStops;
    one('#pdReviewFlags').textContent = counts.reviewFlags;
    one('#pdChanges').textContent = 3 + state.edits + state.customRules.length + (state.request ? 1 : 0);
    one('#pdDraftSubtitle').textContent = state.approved ? 'Version 07 signed and released' : state.draftSent ? 'Draft 07 compared with approved version 06' : 'Waiting for Draft 07 from the chief';
    one('#pdMayaDiff').textContent = `Maya Thursday: ${state.schedule.mayaThu}; Friday: ${state.schedule.mayaFri}.`;
    one('#pdMayaState').textContent = counts.hardStops ? 'Blocked' : 'Rules pass';
    one('#pdMayaState').style.background = counts.hardStops ? 'var(--rose)' : 'var(--mint)';
    one('#pdMayaState').style.color = counts.hardStops ? 'var(--rose-ink)' : 'var(--mint-ink)';
    one('#pdRequestDiff').textContent = state.request ? `${typeLabels[state.request.type]} · ${state.request.date} · ${state.request.priority} priority.` : 'No new resident request has been submitted in this demo.';
    one('#pdRequestState').textContent = state.request ? 'Received' : 'No change';
    one('#pdRuleDiffs').innerHTML = state.customRules.map((rule) => {
      const passed = customRulePasses(rule);
      return `<div class="diff"><span class="diff-kind">Rulebook</span><div><strong>${escapeHtml(rule.text)}</strong><span>${escapeHtml(rule.origin)} · ${escapeHtml(rule.severity)} · added in this demo</span></div><span class="pass" style="background:${passed ? 'var(--mint)' : 'var(--rose)'};color:${passed ? 'var(--mint-ink)' : 'var(--rose-ink)'}">${passed ? 'Pass' : 'Fails'}</span></div>`;
    }).join('');
    one('#pdReviewDetail').textContent = counts.reviewFlags ? `${counts.reviewFlags} visible review flag${counts.reviewFlags === 1 ? '' : 's'} require acknowledgment.` : 'No review flags remain.';
    const ackButton = one('#acknowledgeReviewBtn');
    ackButton.disabled = !state.draftSent || counts.reviewFlags === 0 || state.acknowledged;
    ackButton.textContent = state.acknowledged ? 'Acknowledged' : counts.reviewFlags ? 'Acknowledge' : 'None open';
    const approveButton = one('#approveDraftBtn');
    approveButton.disabled = !canApprove;
    approveButton.textContent = state.approved ? 'Version 07 approved' : 'Approve version 07';
    one('#returnDraftBtn').disabled = !state.draftSent || state.approved;
    one('#approvalLock').textContent = state.approved
      ? 'Signed by the program director. Only this approved version can reach resident calendars.'
      : !state.draftSent
        ? 'The chief has not sent this draft yet.'
        : counts.hardStops
          ? `${counts.hardStops} hard stop${counts.hardStops === 1 ? '' : 's'} must be resolved by the chief.`
          : counts.reviewFlags && !state.acknowledged
            ? 'Acknowledge the review flags to unlock approval.'
            : 'All approval conditions are satisfied.';
  }

  function renderRulebook() {
    const counts = ruleCounts();
    one('#rulebookStatus').textContent = `${counts.passed} pass · ${counts.hardStops} stop · ${counts.reviewFlags} review`;
    one('#ruleListSummary').textContent = `${counts.checks.length} configured rules`;
    one('#ruleList').innerHTML = counts.checks.map((rule) => `<div class="rule-entry"><i class="${rule.passed ? '' : rule.severity === 'hard' ? 'fail' : 'review'}"></i><div><strong>${escapeHtml(rule.text)}</strong><span>${escapeHtml(rule.origin)} · ${escapeHtml(rule.severity)} · ${rule.passed ? 'passes current draft' : 'fails current draft'}</span></div>${rule.removable ? `<button type="button" data-remove-rule="${rule.id}">Remove</button>` : '<span></span>'}</div>`).join('');
    all('[data-remove-rule]').forEach((button) => button.addEventListener('click', () => {
      state.customRules = state.customRules.filter((rule) => rule.id !== button.dataset.removeRule);
      state.edits += 1;
      invalidateApproval();
      renderAll();
      notify('Custom rule removed. Draft checks updated.');
    }));
    renderRulePreview();
  }

  function renderAll() {
    renderResident();
    renderChief();
    renderPd();
    renderRulebook();
    renderProgress();
    all('.view-tab').forEach((tab) => tab.classList.toggle('has-update',
      (tab.dataset.view === 'resident' && state.approved) ||
      (tab.dataset.view === 'pd' && state.draftSent) ||
      (tab.dataset.view === 'chief' && Boolean(state.returnedComment))
    ));
  }
  all('.view-tab').forEach((tab) => tab.addEventListener('click', () => {
    state.activeView = tab.dataset.view;
    renderProgress();
  }));

  all('[data-jump-view]').forEach((button) => button.addEventListener('click', () => switchView(button.dataset.jumpView)));

  all('[data-priority]').forEach((button) => button.addEventListener('click', () => {
    state.priority = button.dataset.priority;
    all('[data-priority]').forEach((item) => item.classList.toggle('active', item === button));
  }));

  one('#residentDemoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const type = one('#shareRequestType').value;
    const date = one('#shareRequestDate').value.trim() || 'Sep 19–20';
    const note = one('#shareRequestNote').value.trim();
    state.request = { type, date, note, priority: state.priority };
    invalidateApproval();
    renderAll();
    notify(`${typeLabels[type]} request received. Switch to the chief view to see it enter the draft.`);
  });

  all('[data-calendar]').forEach((button) => button.addEventListener('click', () => {
    const key = button.dataset.calendar;
    state.calendars[key] = !state.calendars[key];
    renderResident();
    notify(`${key[0].toUpperCase() + key.slice(1)} Calendar ${state.calendars[key] ? 'connected' : 'disconnected'}.`);
  }));

  all('[data-cell]').forEach((button) => button.addEventListener('click', () => {
    state.selectedCell = button.dataset.cell;
    renderChief();
  }));

  one('#sendApprovalBtn').addEventListener('click', () => {
    const counts = ruleCounts();
    if (counts.hardStops) {
      notify('Resolve the hard stops before sending this draft.');
      return;
    }
    state.draftSent = true;
    state.approved = false;
    state.acknowledged = false;
    state.returnedComment = '';
    renderAll();
    notify('Draft 07 sent with its requests, Rulebook checks, and change summary.');
    switchView('pd');
  });

  one('#acknowledgeReviewBtn').addEventListener('click', () => {
    state.acknowledged = true;
    renderAll();
    notify('Review flags acknowledged. Approval is now available if no hard stops remain.');
  });

  one('#returnDraftBtn').addEventListener('click', () => {
    if (!state.draftSent) return;
    state.returnedComment = one('#pdComment').value.trim() || 'Please review the highlighted transition before resubmitting.';
    state.draftSent = false;
    state.acknowledged = false;
    renderAll();
    notify('Draft returned to the chief. No resident calendars changed.');
    switchView('chief');
  });

  one('#approveDraftBtn').addEventListener('click', () => {
    const counts = ruleCounts();
    if (!state.draftSent || counts.hardStops || (counts.reviewFlags && !state.acknowledged)) return;
    state.approved = true;
    renderAll();
    notify('Version 07 approved. The resident now sees the released schedule.');
    switchView('resident');
  });

  all('#ruleBuilderForm select').forEach((input) => input.addEventListener('input', () => {
    renderRulePreview();
  }));

  one('#testRuleBtn').addEventListener('click', () => {
    renderRulePreview(true);
  });

  one('#addRuleBtn').addEventListener('click', () => {
    const rule = currentBuilderRule();
    state.customRules.push(rule);
    state.edits += 1;
    invalidateApproval();
    renderAll();
    notify(`Rule added. It ${customRulePasses(rule) ? 'passes' : 'fails'} the current draft.`);
  });

  one('#resetDemo').addEventListener('click', () => {
    state = makeState();
    one('#residentDemoForm').reset();
    one('#ruleBuilderForm').reset();
    all('[data-priority]').forEach((button) => button.classList.toggle('active', button.dataset.priority === 'Important'));

    renderAll();
    switchView('resident');
    notify('Demo reset to the original private draft.');
  });

  renderAll();
})();

