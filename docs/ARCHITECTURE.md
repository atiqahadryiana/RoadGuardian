# Architecture and safety boundary

## Implemented demonstration

```text
Scenario controls / automatic demo timer
                 |
                 v
       Client-side synthetic event engine
          |             |             |
     junction view   summary state   incident queue / CSV
                 |
       localStorage (demo records only)
```

The application uses semantic HTML, vanilla CSS, and browser JavaScript. It has no runtime dependencies, API keys, authentication, remote APIs, analytics, camera access, geolocation, or network transmission. The optional Python server serves only `app/` and applies a Content Security Policy with `connect-src 'none'`.

## Conceptual future architecture — not implemented

```text
Permissioned roadside sensors
  -> privacy-preserving edge inference
  -> multi-sensor corroboration and safety rules
  -> secured gateway (5G where independently justified)
  -> event broker and audit trail
  -> human operator review
  -> authorised, non-distracting information channel
```

## Why 5G could matter

Dense device connectivity, edge processing, and fast distribution of corroborated metadata may make 5G useful in some roadside environments. Coverage, quality of service, reliability, cost, latency, and safety outcomes must be measured on real networks and compared with 4G and wired alternatives. 5G alone guarantees none of these outcomes.

## Privacy and security principles for a future pilot

- Minimise collection and prefer non-identifying event metadata over raw video.
- Avoid face and plate recognition; apply on-device anonymisation where imagery is authorised.
- Encrypt and authenticate device links; separate read-only observation from any future controls.
- Use minimal retention, auditable access, adversarial testing, drift monitoring, and fail-safe defaults.
- Complete Malaysian privacy, telecommunications, road-authority, and safety review before field collection.

## Failure boundary

The prototype must never replace traffic rules, ask drivers to monitor a phone, trigger signals, or contact responders. A real system would require human oversight and safe degradation when sensing or connectivity is uncertain.
