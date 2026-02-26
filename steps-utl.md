[**STEPS URL NOTION**](https://shaded-season-2f0.notion.site/Idea-Live-App-Workflow-System-30c3ad7d4673804a8b09f61bc78a604d?utm_source=sp_auto_dm&utm_referrer=sp_auto_dm)
---
## PRD Prompt

```text
You are a senior product manager.

Here is my raw app idea:

[PASTE IDEA]

Create a detailed Product Requirement Document including:- Problem statement- Target user- Core user flows- Feature list (MVP vs Future)- Edge cases- Non-goals- Success metrics

Do not add unnecessary features.
Keep it focused on usable V1.
```
---
## TRD (Technical Requirement Document) Prompt

```text
You are a senior backend architect.

Using this PRD:

[PASTE PRD]

Create a Technical Requirement Document including:- System architecture overview- Frontend responsibilities- Backend responsibilities- Database schema proposal- API structure- Authentication strategy- Third-party dependencies- Scalability considerations

Optimize for long-term stability.
Avoid overengineering.
```
---
## Figma Design Direction Prompt

```text
You are a senior UX designer.

Given this PRD:

[PASTE PRD]

Design a complete screen breakdown including:- Screen list- Layout hierarchy per screen- Component breakdown- Interaction logic- Empty states- Error states

Keep UI minimal, clean, and scalable.
Prioritize usability over decoration.
```
---
## Figma-to-Code Conversion Prompt

```text
You are a React Native expert.

Convert this screen design into:- Clean, reusable components- Proper file separation- Type-safe structure (if TypeScript)- Scalable folder structure- No inline styling chaos

Follow best practices.
Do not include backend logic.
```
---
## Implementation Plan Prompt (Codebase Scan)

```text
You are a senior software architect.

Scan this codebasestructure:

[DESCRIBE FOLDERSTRUCTUREOR PASTE FILE TREE]Using this PRDand TRD:

[PASTE BOTH]

Create astep-by-step implementation roadmap including:

- Backend wiringorder
- State management plan
- Data flow mapping
- Risk areas
- Dependencyorder

Optimizefor controlled execution.
```
---
## Refactor Prompt (Before Backend)

```text
You are a senior code reviewer.

Analyze this frontend code:

[PASTE FILE OR STRUCTURE]

Identify:- Reusability issues- Naming inconsistencies- Component coupling- Performance risks- Technical debt

Suggest structural improvements.
Do not rewrite everything.
Be precise.
```
---
## Backend Wiring Prompt

```text
You are a backend integration specialist.Given:

Frontendstructure:
[DESCRIBESTRUCTURE]

Backend stack:
[DESCRIBE STACK]PRD:
[PASTE PRD]TRD:
[PASTE TRD]Create:

- API connectionstructure
- Service layer pattern
-Error handling strategy
- Loading state logic
- Security enforcement rules

Avoid quick hacks.
Designfor stability.
```
---
## Pre-Deployment Stability Check Prompt

```text
You are a senior systems architect.

Given this application architecture:

[DESCRIBE SYSTEM]

Simulate:- 1,000 users- 10,000 users

Identify:- Performance bottlenecks- Cost risk areas- Data consistency issues- Security gaps

Be critical.
Assume growth.
```
---
## 🧠 How To Use This System

1. Never merge prompts.
2. Run one → refine → confirm clarity.
3. Convert final outputs into markdown files.
4. Use them as source-of-truth context for all AI sessions.
5. Revisit TRD before writing backend.

---

## 🏗 The Rule

If your PRD is weak,

your TRD will be confused.

If your TRD is weak,

your backend will suffer.

If your structure is weak,

AI will amplify the chaos.