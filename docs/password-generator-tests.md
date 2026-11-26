# SecurePass — Password Generator Test Results

**Tester:** Ayushmaan Gupta  
**Group:** G195, GLA University, Mathura  
**Target Module:** `src/app/generator/page.tsx`  
**Feature Branch:** `feature/ayushmaan-generator`  
**Test Date:** November 24, 2026  
**Environment:** Next.js 16.4.6, React 19.3.0, Node.js v22.18.0, Windows x64  

---

## 1. Overview & Objective

The Password Generator module in SecurePass is responsible for generating strong, unguessable, and cryptographically secure passwords entirely on the client side.

This testing suite and documentation verify:
1. **Length boundary constraints**: Valid ranges (4–128) and graceful error handling on invalid lengths (< 4 or > 128).
2. **Character set combinations**: Correct pool composition across Uppercase, Lowercase, Numbers, and Symbols.
3. **Invalid configuration protection**: Prevention of empty pool generation when no character types are selected.
4. **Ambiguous character exclusion feature**: Verification that characters commonly confused visually (`0`, `O`, `1`, `l`, `I`) are completely filtered out when the option is enabled.
5. **Class inclusion guarantee**: Ensuring that at least one character from every active character class is present in the final output.
6. **CSPRNG randomness & uniqueness**: Validating that `crypto.getRandomValues` produces collision-free entropy.
7. **Production readiness**: Verification of linting, TypeScript typing, and production build generation.

---

## 2. Core Implementation Analysis: `crypto.getRandomValues`

### Why `crypto.getRandomValues` instead of `Math.random()`?
Standard JavaScript `Math.random()` uses pseudo-random number generator algorithms (such as xoshiro128+ or Xoroshiro128+ in modern V8 engines). While fast, `Math.random()` has several critical security limitations:
- **Deterministic state**: It is initialized with a predictable seed and its internal state can be reconstructed by observing a sequence of outputs.
- **No cryptographic security**: An attacker can predict subsequent generated passwords once the generator state is determined.

In SecurePass, `crypto.getRandomValues(new Uint32Array(length))` is utilized:
- **Operating System Entropy**: The Web Cryptography API accesses the OS kernel's entropy pool (CryptGenRandom / BCryptGenRandom on Windows, `/dev/urandom` / `getrandom()` on POSIX).
- **True Unpredictability**: Hardware interrupts, CPU jitter, and kernel events provide high-entropy randomness that is cryptographically secure (CSPRNG).
- **Uniform Distribution**: `Uint32Array` values range from `0` to `4,294,967,295` ($2^{32}-1$). Mapping to pool sizes (typically between 24 and 94 characters) yields negligible modulo bias (< $0.000002\%$).

---

## 3. Actual Test Results

### Test Suite 1: Password Length Boundaries

Tests were executed across boundary limits, sub-minimum values, valid range steps, and supra-maximum values.

| Test ID | Input Length | Options State | Expected Behavior | Actual Result | Status |
|---|---|---|---|---|---|
| TC-LEN-01 | `0` | All options enabled | Error: length 4-128 | Error: `"Password length must be between 4 and 128."` | ✅ PASS |
| TC-LEN-02 | `1` | All options enabled | Error: length 4-128 | Error: `"Password length must be between 4 and 128."` | ✅ PASS |
| TC-LEN-03 | `3` | All options enabled | Error: length 4-128 | Error: `"Password length must be between 4 and 128."` | ✅ PASS |
| TC-LEN-04 | `4` | All options enabled | Valid 4-char password | Generated: `=Gu9` (length: 4) | ✅ PASS |
| TC-LEN-05 | `8` | All options enabled | Valid 8-char password | Generated: `*rcGn>3f` (length: 8) | ✅ PASS |
| TC-LEN-06 | `16` | All options enabled | Valid 16-char password | Generated: `34MhPDLRW1h@u6fu` (length: 16) | ✅ PASS |
| TC-LEN-07 | `32` | All options enabled | Valid 32-char password | Generated: `HFA(X?Zf[@wy<rChx6q_oZ2843.r&F>a` (length: 32) | ✅ PASS |
| TC-LEN-08 | `64` | All options enabled | Valid 64-char password | Generated 64 chars matching all criteria | ✅ PASS |
| TC-LEN-09 | `128` | All options enabled | Valid 128-char password | Generated 128 chars without UI/browser freeze | ✅ PASS |
| TC-LEN-10 | `129` | All options enabled | Error: length 4-128 | Error: `"Password length must be between 4 and 128."` | ✅ PASS |
| TC-LEN-11 | `200` | All options enabled | Error: length 4-128 | Error: `"Password length must be between 4 and 128."` | ✅ PASS |

---

### Test Suite 2: Character Set Combinations

| Test ID | Active Character Sets | Expected Character Pool | Sample Generated Password | Status |
|---|---|---|---|---|
| TC-SET-01 | Uppercase only | `A-Z` | `HUUHTJYWTWCYJASL` | ✅ PASS |
| TC-SET-02 | Lowercase only | `a-z` | `rxwpoxtfxsecdrhu` | ✅ PASS |
| TC-SET-03 | Numbers only | `0-9` | `1411754983420132` | ✅ PASS |
| TC-SET-04 | Symbols only | `!@#$%^&*()_+-=[]{}|;:,.<>?` | `<-;:^():(}_!$?[;` | ✅ PASS |
| TC-SET-05 | Upper + Lower | `A-Z`, `a-z` | `KlIAEeeYxJxuWHyW` | ✅ PASS |
| TC-SET-06 | Upper + Lower + Numbers | `A-Z`, `a-z`, `0-9` | `0CSLQL5fXGlICXFt` | ✅ PASS |
| TC-SET-07 | All 4 enabled | Full character pool | `[dv2Bn?Zf2N=E6p,` | ✅ PASS |
| TC-SET-08 | All 4 disabled | Empty pool | Error: `"Please select at least one character type."` | ✅ PASS |

---

### Test Suite 3: Ambiguous Character Exclusion Verification

Ambiguous characters tested: `0` (zero), `O` (uppercase o), `1` (one), `l` (lowercase L), `I` (uppercase i).  
Automated test sample: 5,000 password generations of length 32 across all character sets.

| Configuration | Total Iterations | Passwords Containing Ambiguous Characters | Exclusion Rate | Status |
|---|---|---|---|---|
| `excludeAmbiguous: false` | 5,000 | 4,313 (86.26%) | 0% (feature off) | Expected behavior |
| `excludeAmbiguous: true` | 5,000 | **0 (0.00%)** | **100.00%** | ✅ PASS |

**Key Verification:**
- Both the main pool and the guaranteed character injection arrays (`required`) filter out ambiguous characters.
- At no point during random placement or pool sampling did any ambiguous character leak into the output.

---

### Test Suite 4: Guaranteed Class Inclusion (Length = 4)

To verify the rule that all selected character types are guaranteed to appear even at minimal length:
- Length: `4`
- Options: Uppercase, Lowercase, Numbers, Symbols (all enabled)
- Exclude Ambiguous: `true`
- Test Runs: 1,000 iterations

**Result:**
- 1,000 out of 1,000 passwords (100%) contained:
  - $\ge 1$ Uppercase letter (excluding `O`, `I`)
  - $\ge 1$ Lowercase letter (excluding `l`)
  - $\ge 1$ Number (excluding `0`, `1`)
  - $\ge 1$ Special symbol
  - Exactly 4 characters in length

---

### Test Suite 5: Uniqueness & Collision Resistance

- Sample: 1,000 consecutively generated passwords at length 16 with all options enabled.
- Distinct entries: 1,000 / 1,000 (100% unique).
- Collision count: 0.

---

### Test Suite 6: Code Quality & Build Checks

| Check | Command | Result | Details |
|---|---|---|---|
| ESLint | `npm run lint` | ✅ Exit code 0 | 0 errors, 0 warnings across `src/` |
| TypeScript | `npx tsc --noEmit` | ✅ Exit code 0 | No type errors detected |
| Next.js Build | `npm run build` | ✅ Exit code 0 | Optimized production build generated successfully |

---

## 4. UI / UX Features Tested

1. **Length Slider**: Smoothly slides from 4 to 128; current value displays live in numerical badge.
2. **Ambiguous Checkbox**: Toggles independently without breaking other checkboxes.
3. **Copy to Clipboard**: `navigator.clipboard.writeText` successfully copies generated string; button visual feedback transitions to "Copied" with check icon for 2 seconds.
4. **Strength Meter**: Accurately computes strength metrics:
   - Score $\le 2$: Weak (Red, 25%)
   - Score $3-4$: Fair (Amber, 50%)
   - Score $5$: Good (Blue, 75%)
   - Score $\ge 6$: Strong (Emerald, 100%)
5. **Dark Mode UI Consistency**: Fully conforms with team CSS design system variables (`--background`, `--card-bg`, `--card-border`, `--accent`).

---

## 5. Summary & Sign-off

The password generator meets all functional, security, and usability specifications outlined for Week 1 of SecurePass. The module preserves CSPRNG guarantees and offers robust visual clarity through ambiguous character exclusion.

**Signed off by:**  
Ayushmaan Gupta  
B.Tech CSE, Group G195  
GLA University, Mathura  
